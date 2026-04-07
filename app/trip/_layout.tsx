import { TripAudioContext } from "@/core/contexts/trip-audio-context";
import { useTripAudioRecorder } from "@/core/hooks/use-audio";
import { Stack } from "expo-router";

export default function TripLayout() {
  const { start, stop, triggerSOS } = useTripAudioRecorder();

  return (
    <TripAudioContext.Provider value={{ start, stop, triggerSOS }}>
      <Stack screenOptions={{ headerShown: false }} />
    </TripAudioContext.Provider>
  );
}
