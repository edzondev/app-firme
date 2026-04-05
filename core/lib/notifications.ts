import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function registerPushToken(): Promise<string | null> {
  if (!Device.isDevice) return null;

  try {
    // async-parallel: channel setup y permission request son independientes
    const [{ status }] = await Promise.all([
      Notifications.requestPermissionsAsync(),
      Platform.OS === "android"
        ? Promise.all([
            Notifications.setNotificationChannelAsync("default", {
              name: "default",
              importance: Notifications.AndroidImportance.MAX,
            }),
            Notifications.setNotificationChannelAsync("sos", {
              name: "SOS Alertas",
              importance: Notifications.AndroidImportance.MAX,
              vibrationPattern: [0, 250, 250, 250],
              lightColor: "#FF0000",
              lockscreenVisibility:
                Notifications.AndroidNotificationVisibility.PUBLIC,
              bypassDnd: true,
            }),
          ])
        : Promise.resolve(null),
    ]);

    if (status !== "granted") return null;

    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      "d5cf4faa-e9d6-4697-9c81-1521291e2087";
    if (!projectId) throw new Error("Missing EAS projectId in expoConfig");

    const { data: token } = await Notifications.getExpoPushTokenAsync({
      projectId,
    });
    return token;
  } catch (err) {
    console.error("Failed to register push token:", err);
    return null;
  }
}
