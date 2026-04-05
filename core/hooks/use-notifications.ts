import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export function useNotificationListeners() {
  const router = useRouter();

  //TODO: Add listener for when a notification is received while the app is in the foreground, to show an in-app banner or similar
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const { data } = response.notification.request.content;
        if (data?.type === "sos") {
          router.push("/trip/sos-active");
        }
      },
    );

    return () => subscription.remove();
  }, [router]);
}
