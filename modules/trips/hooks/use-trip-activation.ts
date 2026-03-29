import { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import useSocket from "@/core/hooks/use-socket";
import useBackgroundTracking from "@/core/hooks/use-background-tracking";
import { storage } from "@/core/storage/storage";
import { StorageKeys } from "@/core/storage/keys";
import type { CreateTripResponse } from "@/core/types/trip";
import type { JoinTripPayload } from "@/core/types/tracking";
import type { ActiveTripMMKV } from "@/core/types/trip";

type ActivationStatus = "idle" | "activating" | "success" | "error";

interface UseTripActivationReturn {
  status: ActivationStatus;
  error: string | null;
  activate: (
    tripResponse: CreateTripResponse,
    formData: { externalApp: string; driverPlate: string; driverName?: string; audioEnabled: boolean },
  ) => Promise<void>;
}

export function useTripActivation(): UseTripActivationReturn {
  const router = useRouter();
  const socketHook = useSocket();
  const trackingHook = useBackgroundTracking();
  const [status, setStatus] = useState<ActivationStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const activate = useCallback(
    async (
      tripResponse: CreateTripResponse,
      formData: { externalApp: string; driverPlate: string; driverName?: string; audioEnabled: boolean },
    ) => {
      setStatus("activating");
      setError(null);

      try {
        const tripMMKV: ActiveTripMMKV = {
          tripId: tripResponse.tripId,
          shareToken: tripResponse.shareToken,
          startedAt: tripResponse.startedAt,
          externalApp: formData.externalApp as ActiveTripMMKV["externalApp"],
          driverPlate: formData.driverPlate,
          driverName: formData.driverName ?? null,
          audioEnabled: formData.audioEnabled,
        };
        storage.set(StorageKeys.ACTIVE_TRIP, JSON.stringify(tripMMKV));

        const connectedSocket = await socketHook.connect();

        const joinPayload: JoinTripPayload = {
          tripId: tripResponse.tripId,
          shareToken: tripResponse.shareToken,
        };
        connectedSocket.emit("join_trip", joinPayload);

        const trackingStarted = await trackingHook.startTracking(
          tripResponse.tripId,
          tripResponse.shareToken,
          connectedSocket,
        );

        if (!trackingStarted) {
          storage.remove(StorageKeys.ACTIVE_TRIP);
          throw new Error(
            "No se pudo activar el rastreo GPS. Verifica los permisos de ubicación en la configuración del dispositivo.",
          );
        }

        setStatus("success");
        router.replace("/trip/active");
      } catch (err) {
        setStatus("error");
        setError(
          err instanceof Error ? err.message : "Error al activar protección",
        );
      }
    },
    [socketHook, trackingHook, router],
  );

  return {
    status,
    error,
    activate,
  };
}
