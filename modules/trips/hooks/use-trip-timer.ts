import { useEffect, useRef, useState } from "react";

function formatElapsed(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

interface UseTripTimerReturn {
  elapsed: string;
  elapsedSeconds: number;
}

export function useTripTimer(startedAt: string | null): UseTripTimerReturn {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!startedAt) return;

    const startTime = new Date(startedAt).getTime();

    const tick = () => {
      const now = Date.now();
      setElapsedSeconds(Math.floor((now - startTime) / 1000));
    };

    tick();
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startedAt]);

  return {
    elapsed: formatElapsed(elapsedSeconds),
    elapsedSeconds,
  };
}
