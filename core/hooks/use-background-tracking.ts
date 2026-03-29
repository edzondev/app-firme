import { useCallback, useRef, useState } from "react";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import type { Socket } from "socket.io-client";
import type { GPSUpdatePayload } from "@/core/types/tracking";
import { storage } from "@/core/storage/storage";
import { StorageKeys } from "@/core/storage/keys";

const GPS_TASK_NAME = "firme-gps-tracking";

type TrackingStatus = "idle" | "requesting" | "active" | "denied" | "error";

interface UseBackgroundTrackingReturn {
  status: TrackingStatus;
  startTracking: (
    tripId: string,
    shareToken: string,
    socket: Socket | null,
  ) => Promise<boolean>;
  stopTracking: () => Promise<void>;
  flushOfflineQueue: (socket: Socket) => void;
}

let activeSocket: Socket | null = null;
let activeTripId: string | null = null;
let activeShareToken: string | null = null;

function enqueueOfflinePoint(point: GPSUpdatePayload): void {
  const raw = storage.getString(StorageKeys.GPS_OFFLINE_QUEUE);
  const queue: GPSUpdatePayload[] = raw ? JSON.parse(raw) : [];
  queue.push(point);
  storage.set(StorageKeys.GPS_OFFLINE_QUEUE, JSON.stringify(queue));
}

function drainOfflineQueue(): GPSUpdatePayload[] {
  const raw = storage.getString(StorageKeys.GPS_OFFLINE_QUEUE);
  if (!raw) return [];
  const queue: GPSUpdatePayload[] = JSON.parse(raw);
  storage.remove(StorageKeys.GPS_OFFLINE_QUEUE);
  return queue;
}

TaskManager.defineTask(GPS_TASK_NAME, async ({ data, error }) => {
  if (error) return;
  if (!data) return;

  const { locations } = data as { locations: Location.LocationObject[] };
  if (!locations?.length || !activeTripId || !activeShareToken) return;

  for (const loc of locations) {
    const payload: GPSUpdatePayload = {
      tripId: activeTripId,
      shareToken: activeShareToken,
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      accuracy: loc.coords.accuracy,
      speed: loc.coords.speed,
      heading: loc.coords.heading,
      altitude: loc.coords.altitude,
      timestamp: new Date(loc.timestamp).toISOString(),
    };

    if (activeSocket?.connected) {
      activeSocket.emit("gps_update", payload);
    } else {
      enqueueOfflinePoint(payload);
    }
  }
});

export default function useBackgroundTracking(): UseBackgroundTrackingReturn {
  const [status, setStatus] = useState<TrackingStatus>("idle");
  const isTrackingRef = useRef(false);

  const startTracking = useCallback(
    async (
      tripId: string,
      shareToken: string,
      socket: Socket | null,
    ): Promise<boolean> => {
      setStatus("requesting");

      const { status: fgStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (fgStatus !== "granted") {
        setStatus("denied");
        return false;
      }

      const { status: bgStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (bgStatus !== "granted") {
        setStatus("denied");
        return false;
      }

      activeTripId = tripId;
      activeShareToken = shareToken;
      activeSocket = socket;

      await Location.startLocationUpdatesAsync(GPS_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
        deferredUpdatesInterval: 5000,
        foregroundService: {
          notificationTitle: "Firme",
          notificationBody: "Firme está monitoreando tu viaje",
          killServiceOnDestroy: false,
        },
        showsBackgroundLocationIndicator: true,
      });

      isTrackingRef.current = true;
      setStatus("active");
      return true;
    },
    [],
  );

  const stopTracking = useCallback(async () => {
    const isRegistered =
      await TaskManager.isTaskRegisteredAsync(GPS_TASK_NAME);
    if (isRegistered) {
      await Location.stopLocationUpdatesAsync(GPS_TASK_NAME);
    }

    activeTripId = null;
    activeShareToken = null;
    activeSocket = null;
    isTrackingRef.current = false;
    setStatus("idle");
  }, []);

  const flushOfflineQueue = useCallback((socket: Socket) => {
    activeSocket = socket;
    const queue = drainOfflineQueue();
    for (const point of queue) {
      socket.emit("gps_update", point);
    }
  }, []);

  return {
    status,
    startTracking,
    stopTracking,
    flushOfflineQueue,
  };
}
