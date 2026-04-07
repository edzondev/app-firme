import { useMutation } from "@tanstack/react-query";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder as useExpoRecorder,
} from "expo-audio";
import { Directory, File, Paths } from "expo-file-system";
import { useCallback, useEffect, useRef } from "react";
import {
  confirmR2Upload,
  deleteRecordings,
  getPresignedUploadUrl,
} from "../services/audio/audio";

const CHUNK_DURATION_MS = 5 * 1000; // 5 segundos por chunk
//const CHUNK_DURATION_MS = 60 * 1000; // 1 minuto por chunk
const MAX_LOCAL_CHUNKS = 3;

const tempDir = new Directory(Paths.cache, "firme-audio");

type ConfirmUploadDto = {
  tripId: string;
  key: string;
  chunkNumber: number;
  durationSeconds: number;
  fileSizeBytes: number;
};

export function useTripAudioRecorder() {
  const recorder = useExpoRecorder(RecordingPresets.HIGH_QUALITY);

  const localChunksRef = useRef<string[]>([]);
  const chunkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null); // ← setTimeout
  const chunkNumberRef = useRef(0);
  const sosTriggeredRef = useRef(false);
  const tripIdRef = useRef<string | null>(null);

  const { mutateAsync: getPresignedUrl } = useMutation({
    mutationFn: (data: { tripId: string; chunkNumber: number }) =>
      getPresignedUploadUrl(data.tripId, data.chunkNumber),
    onError: (err) =>
      console.error(
        `[audio/getPresignedUrl] Error al obtener presigned URL del backend: ${err instanceof Error ? err.message : String(err)}`,
        err,
      ),
  });

  const { mutateAsync: confirmUpload } = useMutation({
    mutationFn: (data: ConfirmUploadDto) => confirmR2Upload(data),
    onError: (err) =>
      console.error(
        `[audio/confirmUpload] Error al confirmar upload en backend: ${err instanceof Error ? err.message : String(err)}`,
        err,
      ),
  });

  // ─── helpers privados ───────────────────────────────────────────

  const _cleanTempDir = () => {
    if (tempDir.exists) tempDir.delete();
    tempDir.create();
  };

  const _startChunk = async () => {
    console.log("[AUDIO] Preparando chunk...");
    await recorder.prepareToRecordAsync({
      ...RecordingPresets.HIGH_QUALITY,
      extension: ".m4a",
    });
    console.log("[AUDIO] Iniciando grabación...");
    recorder.record();
    console.log(
      "[AUDIO] Grabación iniciada. isRecording:",
      recorder.isRecording,
    );
  };

  const _stopChunkAndGetUri = async (): Promise<string | null> => {
    console.log("[AUDIO] Deteniendo chunk...");
    await recorder.stop();
    console.log("[AUDIO] URI del chunk:", recorder.uri);
    return recorder.uri ?? null;
  };

  const _uploadChunk = async (localUri: string, chunkNumber: number) => {
    if (!tripIdRef.current) return;

    const tripId = tripIdRef.current;
    console.log(
      `[audio/upload] Iniciando subida — tripId=${tripId} chunk=${chunkNumber} uri=${localUri}`,
    );

    let uploadUrl: string;
    let key: string;

    try {
      const result = await getPresignedUrl({ tripId, chunkNumber });
      uploadUrl = result.uploadUrl;
      key = result.key;
      console.log(
        `[audio/upload] Presigned URL obtenida — chunk=${chunkNumber} key=${key}`,
      );
    } catch (err) {
      console.error(
        `[audio/upload] Error al obtener presigned URL — tripId=${tripId} chunk=${chunkNumber}: ${err instanceof Error ? err.message : String(err)}`,
        err,
      );
      return;
    }

    const audioFile = new File(localUri);
    console.log(
      `[audio/upload] chunk=${chunkNumber} exists=${audioFile.exists} size=${audioFile.size}B`,
    );

    if (!audioFile.exists || audioFile.size === 0) {
      console.error(`[audio/upload] Archivo vacío o inexistente: ${localUri}`);
      return;
    }

    try {
      const bytes = await audioFile.bytes();
      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: bytes,
        headers: {
          "Content-Type": "audio/mp4", // ← correcto para .m4a
          "Content-Length": String(audioFile.size),
        },
      });

      if (!response.ok) {
        const body = await response.text().catch(() => "(sin cuerpo)");
        console.error(
          `[audio/upload] R2 rechazó la subida — chunk=${chunkNumber} key=${key} status=${response.status} body=${body}`,
        );
        return;
      }

      console.log(
        `[audio/upload] Subida a R2 exitosa — chunk=${chunkNumber} key=${key} status=${response.status}`,
      );
    } catch (err) {
      console.error(
        `[audio/upload] Error de red al subir a R2 — chunk=${chunkNumber} key=${key}: ${err instanceof Error ? err.message : String(err)}`,
        err,
      );
      return;
    }

    try {
      await confirmUpload({
        tripId,
        key,
        chunkNumber,
        durationSeconds: CHUNK_DURATION_MS / 1000,
        fileSizeBytes: audioFile.size,
      });
      console.log(
        `[audio/upload] Confirmación registrada en backend — chunk=${chunkNumber} key=${key}`,
      );
    } catch (err) {
      console.error(
        `[audio/upload] Error al confirmar upload en backend — chunk=${chunkNumber} key=${key}: ${err instanceof Error ? err.message : String(err)}`,
        err,
      );
    }

    audioFile.delete();
  };

  // advanced-use-latest: refs actualizadas en cada render → siempre tienen
  // el closure más fresco sin stale closures ni deps arrays frágiles
  const rotateChunkRef = useRef<() => Promise<void>>(async () => {});
  const scheduleNextRotationRef = useRef<() => void>(() => {});

  rotateChunkRef.current = async () => {
    const uri = await _stopChunkAndGetUri();
    if (!uri) {
      console.warn(
        `[audio/rotate] chunk=${chunkNumberRef.current} — recorder.uri vacío, se omite rotación`,
      );
      return;
    }

    if (sosTriggeredRef.current) {
      const toUpload = [...localChunksRef.current, uri];
      localChunksRef.current = [];

      console.log(
        `[audio/rotate] SOS activo — subiendo ${toUpload.length} chunks acumulados + actual`,
      );

      for (const chunkUri of toUpload) {
        const num = chunkNumberRef.current++;
        _uploadChunk(chunkUri, num).catch((err) =>
          console.error(
            `[audio/rotate] Error inesperado en _uploadChunk chunk=${num}: ${err instanceof Error ? err.message : String(err)}`,
            err,
          ),
        );
      }
    } else {
      localChunksRef.current.push(uri);
      console.log(
        `[audio/rotate] Chunk guardado localmente — uri=${uri} buffered=${localChunksRef.current.length}/${MAX_LOCAL_CHUNKS}`,
      );

      if (localChunksRef.current.length > MAX_LOCAL_CHUNKS) {
        const oldest = localChunksRef.current.shift()!;
        console.log(
          `[audio/rotate] Descartando chunk más antiguo — uri=${oldest}`,
        );
        const oldFile = new File(oldest);
        if (oldFile.exists) oldFile.delete();
      }
    }

    await _startChunk();
  };

  // setTimeout recursivo — fix race condition:
  // el siguiente chunk solo arranca cuando el anterior completó
  scheduleNextRotationRef.current = () => {
    chunkTimerRef.current = setTimeout(async () => {
      await rotateChunkRef.current();
      scheduleNextRotationRef.current();
    }, CHUNK_DURATION_MS);
  };

  // Cleanup en unmount — evita timer y recorder huérfanos
  useEffect(() => {
    return () => {
      if (chunkTimerRef.current) clearTimeout(chunkTimerRef.current);
      recorder.stop().catch(() => {});
      sosTriggeredRef.current = false;
    };
  }, [recorder]);

  // ─── API pública ─────────────────────────────────────────────────

  const start = useCallback(async (tripId: string) => {
    const { granted } = await AudioModule.requestRecordingPermissionsAsync();
    if (!granted) {
      console.warn(
        `[audio/start] Permiso de micrófono denegado — tripId=${tripId}`,
      );
      return;
    }

    console.log(`[audio/start] Iniciando grabación — tripId=${tripId}`);

    tripIdRef.current = tripId;
    chunkNumberRef.current = 0;
    sosTriggeredRef.current = false;
    localChunksRef.current = [];

    _cleanTempDir();

    await setAudioModeAsync({
      allowsRecording: true,
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      allowsBackgroundRecording: true,
      interruptionMode: "duckOthers",
    });

    await _startChunk();
    scheduleNextRotationRef.current();

    console.log(
      `[audio/start] Grabación activa — tripId=${tripId} chunkDuration=${CHUNK_DURATION_MS}ms maxLocalChunks=${MAX_LOCAL_CHUNKS}`,
    );
  }, []); // solo refs y APIs estables — eslint-disable-line react-hooks/exhaustive-deps

  const triggerSOS = useCallback(() => {
    console.log(`[audio/sos] SOS disparado — tripId=${tripIdRef.current}`);
    sosTriggeredRef.current = true;
  }, []);

  const stop = useCallback(async () => {
    console.log(
      `[audio/stop] Deteniendo grabación — tripId=${tripIdRef.current} sosActive=${sosTriggeredRef.current}`,
    );

    if (chunkTimerRef.current) {
      clearTimeout(chunkTimerRef.current);
      chunkTimerRef.current = null;
    }

    if (sosTriggeredRef.current) {
      const uri = await _stopChunkAndGetUri();
      if (uri) {
        console.log(
          `[audio/stop] Subiendo último chunk post-SOS — chunk=${chunkNumberRef.current} uri=${uri}`,
        );
        await _uploadChunk(uri, chunkNumberRef.current);
      }
    } else {
      await recorder.stop();

      const currentTripId = tripIdRef.current;
      if (currentTripId) {
        try {
          await deleteRecordings(currentTripId);
        } catch (err) {
          console.warn(
            `[audio/stop] Error al limpiar chunks residuales — tripId=${currentTripId}: ${err instanceof Error ? err.message : String(err)}`,
          );
        }
      }
    }

    _cleanTempDir();
    localChunksRef.current = [];
    tripIdRef.current = null;

    console.log(`[audio/stop] Grabación finalizada`);
  }, []); // solo refs y APIs estables — eslint-disable-line react-hooks/exhaustive-deps

  return { start, triggerSOS, stop, isRecording: recorder.isRecording };
}
