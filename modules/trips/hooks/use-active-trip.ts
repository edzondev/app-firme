import { queryKeys } from "@/core/constants/query-keys";
import useBackgroundTracking from "@/core/hooks/use-background-tracking";
import useSocket from "@/core/hooks/use-socket";
import { StorageKeys } from "@/core/storage/keys";
import { storage } from "@/core/storage/storage";
import type { EndTripPayload } from "@/core/types/tracking";
import type { ActiveTripMMKV } from "@/core/types/trip";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { endTrip as endTripApi } from "../api/trips";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

interface UseActiveTripReturn {
  tripData: ActiveTripMMKV | null;
  isEnding: boolean;
  isEndConfirmOpen: boolean;
  endTripError: string | null;
  requestEndTrip: () => void;
  confirmEndTrip: () => Promise<void>;
  dismissEndConfirm: () => void;
  dismissEndTripError: () => void;
  socketHook: ReturnType<typeof useSocket>;
}

export function useActiveTrip(): UseActiveTripReturn {
  const router = useRouter();
  const queryClient = useQueryClient();
  const socketHook = useSocket();
  const trackingHook = useBackgroundTracking();
  const [tripData, setTripData] = useState<ActiveTripMMKV | null>(null);
  const [isEnding, setIsEnding] = useState(false);
  const [isEndConfirmOpen, setIsEndConfirmOpen] = useState(false);
  const [endTripError, setEndTripError] = useState<string | null>(null);

  useEffect(() => {
    const raw = storage.getString(StorageKeys.ACTIVE_TRIP);
    if (raw) {
      const parsed = JSON.parse(raw) as ActiveTripMMKV;
      if (!UUID_REGEX.test(parsed.tripId)) {
        storage.remove(StorageKeys.ACTIVE_TRIP);
        storage.remove(StorageKeys.GPS_OFFLINE_QUEUE);
        return;
      }
      setTripData(parsed);
    }
  }, []);

  const { connect: socketConnect, isConnected: socketIsConnected } = socketHook;
  const { flushOfflineQueue } = trackingHook;

  useEffect(() => {
    if (!tripData || socketIsConnected) return;

    const reconnect = async () => {
      const connectedSocket = await socketConnect();
      connectedSocket.emit("join_trip", {
        tripId: tripData.tripId,
        shareToken: tripData.shareToken,
      });
      flushOfflineQueue(connectedSocket);
    };

    reconnect().catch(() => {
      // El hook mantiene estado "error"; se reintentará en próximos renders.
    });
  }, [tripData, socketIsConnected, socketConnect, flushOfflineQueue]);

  const performEndTrip = useCallback(async () => {
    if (!tripData) return;
    if (!UUID_REGEX.test(tripData.tripId)) {
      setEndTripError(
        "El viaje activo no es válido. Inicia un viaje nuevo para continuar.",
      );
      return;
    }

    setIsEnding(true);
    try {
      const endPayload: EndTripPayload = { tripId: tripData.tripId };
      socketHook.emit("end_trip", endPayload);

      await endTripApi(tripData.tripId);

      await trackingHook.stopTracking();
      socketHook.disconnect();
      storage.remove(StorageKeys.ACTIVE_TRIP);
      storage.remove(StorageKeys.GPS_OFFLINE_QUEUE);

      queryClient.invalidateQueries({ queryKey: queryKeys.activeTrip });
      queryClient.invalidateQueries({ queryKey: queryKeys.tripsHistory });

      router.replace("/(tabs)");
    } catch (err) {
      setEndTripError(
        err instanceof Error ? err.message : "No se pudo terminar el viaje",
      );
    } finally {
      setIsEnding(false);
    }
  }, [tripData, socketHook, trackingHook, queryClient, router]);

  const requestEndTrip = useCallback(() => {
    setIsEndConfirmOpen(true);
  }, []);

  const dismissEndConfirm = useCallback(() => {
    setIsEndConfirmOpen(false);
  }, []);

  const dismissEndTripError = useCallback(() => {
    setEndTripError(null);
  }, []);

  return {
    tripData,
    isEnding,
    isEndConfirmOpen,
    endTripError,
    requestEndTrip,
    confirmEndTrip: performEndTrip,
    dismissEndConfirm,
    dismissEndTripError,
    socketHook,
  };
}
