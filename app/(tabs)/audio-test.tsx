// app/(dev)/audio-test.tsx
import { apiFetch } from "@/core/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useAudioPlayer } from "expo-audio";
import { File, Paths } from "expo-file-system";
import { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

type Recording = {
  id: string;
  chunkNumber: number;
  durationSeconds: number;
  fileSizeBytes: number;
  downloadUrl: string;
};

function ChunkPlayer({ recording }: { recording: Recording }) {
  const [localUri, setLocalUri] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Player solo se crea cuando ya hay URI local
  const player = useAudioPlayer(localUri ? { uri: localUri } : null);

  async function download() {
    setDownloading(true);
    setError(null);
    try {
      console.log("[test] downloadUrl recibida:", recording.downloadUrl);
      console.log("[test] Iniciando fetch...");

      const response = await fetch(recording.downloadUrl);

      console.log("[test] Response status:", response.status);
      console.log("[test] Content-Type:", response.headers.get("content-type"));

      if (!response.ok) {
        const body = await response.text();
        console.error("[test] Error body:", body);
        throw new Error(`HTTP ${response.status}: ${body.slice(0, 200)}`);
      }

      const buffer = await response.arrayBuffer();
      console.log("[test] Buffer size:", buffer.byteLength, "bytes");

      if (buffer.byteLength === 0) {
        throw new Error("El archivo descargado está vacío");
      }

      const dest = new File(Paths.cache, `chunk-${recording.chunkNumber}.m4a`);
      if (dest.exists) dest.delete();
      dest.write(new Uint8Array(buffer));

      console.log("[test] Guardado en:", dest.uri, "| size:", dest.size);
      setLocalUri(dest.uri);
    } catch (e) {
      setError(String(e));
      console.error("[test] Error completo:", e);
    } finally {
      setDownloading(false);
    }
  }

  function play() {
    player.seekTo(0);
    player.play();
  }

  function pause() {
    player.pause();
  }

  return (
    <View style={styles.chunk}>
      <Text style={styles.chunkTitle}>Chunk #{recording.chunkNumber}</Text>
      <Text style={styles.chunkMeta}>
        {recording.durationSeconds}s ·{" "}
        {(recording.fileSizeBytes / 1024).toFixed(1)} KB
      </Text>

      {error && <Text style={styles.error}>{error}</Text>}

      {!localUri ? (
        <Pressable style={styles.btn} onPress={download} disabled={downloading}>
          <Text style={styles.btnText}>
            {downloading ? "Descargando..." : "⬇️ Descargar"}
          </Text>
        </Pressable>
      ) : (
        <View style={styles.controls}>
          <Pressable style={styles.btn} onPress={play}>
            <Text style={styles.btnText}>▶️ Play</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.btnSecondary]} onPress={pause}>
            <Text style={styles.btnText}>⏸ Pause</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default function AudioTestScreen() {
  const TRIP_ID = "23fe20ab-7489-4e3d-96e2-5dd3cf7e45c5";

  const {
    data: recordings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recordings-test", TRIP_ID],
    queryFn: () => apiFetch<Recording[]>(`/recordings/${TRIP_ID}/recordings`),
    staleTime: 0, // siempre considera los datos stale
    gcTime: 0, // no cachea entre renders
    refetchOnMount: true,
  });

  if (isLoading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  if (error) return <Text style={{ margin: 20 }}>Error: {String(error)}</Text>;
  if (!recordings?.length)
    return <Text style={{ margin: 20 }}>Sin grabaciones.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎙 Test de grabaciones</Text>
      <Text style={styles.subtitle}>{recordings.length} chunks en R2</Text>
      <FlatList
        data={recordings}
        keyExtractor={(r) => r.id}
        renderItem={({ item }) => <ChunkPlayer recording={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 16 },
  chunk: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#0F6E56",
    gap: 8,
  },
  chunkTitle: { fontSize: 16, fontWeight: "600" },
  chunkMeta: { fontSize: 13, color: "#555" },
  controls: { flexDirection: "row", gap: 8 },
  btn: {
    backgroundColor: "#0F6E56",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  btnSecondary: { backgroundColor: "#555" },
  btnText: { color: "#fff", fontWeight: "600" },
  error: { color: "red", fontSize: 12 },
});
