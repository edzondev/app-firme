import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
import { useSOSAlert } from "./use-sos-alert";
import { useSOSTrigger } from "./use-sos-trigger";

export function useSOSSession(socket: Socket | null) {
  const [sosAlertId, setSosAlertId] = useState<string | null>(null);
  const didTriggerRef = useRef(false);

  const { triggerSOS, isTriggering, error: triggerError } = useSOSTrigger();
  const sosAlertHook = useSOSAlert(sosAlertId);

  useEffect(() => {
    if (didTriggerRef.current) return;
    didTriggerRef.current = true;

    triggerSOS(socket).then((result) => {
      if (result?.sosAlertId) {
        setSosAlertId(result.sosAlertId);
      }
    });
  }, [triggerSOS, socket]);

  return {
    hasSosAlert: !!sosAlertId,
    isTriggering,
    triggerError,
    ...sosAlertHook,
  };
}
