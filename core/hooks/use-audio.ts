import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { useCallback, useEffect, useRef, useState } from "react";

type AudioPermissionStatus = "idle" | "granted" | "denied" | "error";

interface UseAudioReturn {
  recorderState: ReturnType<typeof useAudioRecorderState>;
  permissionStatus: AudioPermissionStatus;
  error: Error | null;
  record: () => Promise<void>;
  stopRecording: () => Promise<string | null>; // retorna la URI
}

export default function useAudio(): UseAudioReturn {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  const [permissionStatus, setPermissionStatus] =
    useState<AudioPermissionStatus>("idle");
  const [error, setError] = useState<Error | null>(null);

  // advanced-init-once: evita doble init en StrictMode
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    // async-parallel: ambas operaciones son independientes, corren en paralelo
    (async () => {
      try {
        const [permissionResult] = await Promise.all([
          AudioModule.requestRecordingPermissionsAsync(),
          setAudioModeAsync({
            playsInSilentMode: true,
            allowsRecording: true,
            allowsBackgroundRecording: true,
          }),
        ]);

        setPermissionStatus(permissionResult.granted ? "granted" : "denied");
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Audio initialization failed"),
        );
        setPermissionStatus("error");
      }
    })();

    // cleanup: detiene la grabación si el componente se desmonta
    return () => {
      if (audioRecorder.isRecording) {
        audioRecorder.stop();
      }
    };
  }, [audioRecorder]);

  // useCallback: referencias estables, no se recrean en cada render
  const record = useCallback(async () => {
    try {
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to start recording"),
      );
    }
  }, [audioRecorder]);

  const stopRecording = useCallback(async (): Promise<string | null> => {
    try {
      await audioRecorder.stop();
      return audioRecorder.uri ?? null; // URI disponible post-stop
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to stop recording"),
      );
      return null;
    }
  }, [audioRecorder]);

  return { recorderState, permissionStatus, error, record, stopRecording };
}
