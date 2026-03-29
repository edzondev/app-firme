import { useCallback, useState } from "react";
import * as Location from "expo-location";
import { storage } from "@/core/storage/storage";
import { StorageKeys } from "@/core/storage/keys";
import { triggerSOS as triggerSOSApi } from "../api/sos";
import type { ActiveTripMMKV } from "@/core/types/trip";
import type { SOSTriggerResponse } from "@/core/types/sos";
import type { SOSTriggerWSPayload } from "@/core/types/sos";
import type { Socket } from "socket.io-client";

interface UseSOSTriggerReturn {
  triggerSOS: (socket: Socket | null) => Promise<SOSTriggerResponse | null>;
  isTriggering: boolean;
  error: string | null;
}

export function useSOSTrigger(): UseSOSTriggerReturn {
  const [isTriggering, setIsTriggering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerSOS = useCallback(
    async (socket: Socket | null): Promise<SOSTriggerResponse | null> => {
      setIsTriggering(true);
      setError(null);

      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        const raw = storage.getString(StorageKeys.ACTIVE_TRIP);
        const tripData: ActiveTripMMKV | null = raw ? JSON.parse(raw) : null;

        if (socket?.connected && tripData) {
          const wsPayload: SOSTriggerWSPayload = {
            tripId: tripData.tripId,
            shareToken: tripData.shareToken,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy,
          };

          return new Promise((resolve) => {
            socket.emit("sos_trigger", wsPayload, (response: SOSTriggerResponse) => {
              resolve(response);
            });

            setTimeout(() => {
              resolve(null);
            }, 5000);
          });
        }

        const response = await triggerSOSApi({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy ?? undefined,
          tripId: tripData?.tripId,
        });

        return response;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al activar SOS",
        );
        return null;
      } finally {
        setIsTriggering(false);
      }
    },
    [],
  );

  return {
    triggerSOS,
    isTriggering,
    error,
  };
}
