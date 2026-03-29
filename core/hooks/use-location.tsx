import { useCallback, useEffect, useRef, useState } from "react";
import * as Location from "expo-location";

type LocationStatus = "idle" | "loading" | "granted" | "denied" | "error";

interface UseLocationReturn {
  location: Location.LocationObject | null;
  status: LocationStatus;
  error: Error | null;
  refetch: () => Promise<void>;
}

export default function useLocation(): UseLocationReturn {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [error, setError] = useState<Error | null>(null);

  const didInit = useRef(false);

  const getCurrentLocation = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      const { status: permissionStatus } =
        await Location.requestForegroundPermissionsAsync();

      if (permissionStatus !== "granted") {
        setStatus("denied");
        return;
      }

      const result = await Location.getCurrentPositionAsync({});
      setLocation(result);
      setStatus("granted");
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to get location"),
      );
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    getCurrentLocation();
  }, [getCurrentLocation]);

  return { location, status, error, refetch: getCurrentLocation };
}
