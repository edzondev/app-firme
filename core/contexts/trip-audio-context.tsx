import { createContext, useContext } from "react";

type TripAudioContextValue = {
  start: (tripId: string) => Promise<void>;
  stop: () => Promise<void>;
  triggerSOS: () => void;
};

export const TripAudioContext = createContext<TripAudioContextValue | null>(
  null,
);

export function useTripAudio(): TripAudioContextValue {
  const ctx = useContext(TripAudioContext);
  if (!ctx) {
    throw new Error("useTripAudio must be used within TripAudioContext.Provider");
  }
  return ctx;
}
