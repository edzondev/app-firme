import { apiFetch } from "@/core/lib/api";
import { registerPushToken } from "@/core/lib/notifications";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { useEffect } from "react";

export function useRegisterPushToken() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    registerPushToken().then((token) => {
      if (!token) return;

      apiFetch("/notifications/token", {
        method: "POST",
        body: JSON.stringify({ token }),
      }).catch(() => {
        // silently ignore — token registration is best-effort
      });
    });
  }, [isAuthenticated]);
}
