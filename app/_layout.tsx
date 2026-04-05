import QueryProvider from "@/core/components/providers/query-provider";
import { useNotificationListeners } from "@/core/hooks/use-notifications";
import { useRegisterPushToken } from "@/core/hooks/use-register-push-token";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import * as Sentry from "@sentry/react-native";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PostHogProvider } from "posthog-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import "./global.css";
export { ErrorBoundary } from "expo-router";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

Sentry.init({
  dsn: "https://aba1725772356c16433e0fbb1c0c26df@o4508739047325696.ingest.us.sentry.io/4511061555150848",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

function AppNavigation() {
  const { isAuthenticated, initializing } = useAuth();
  useNotificationListeners();
  useRegisterPushToken();

  if (initializing) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="trip" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

const AppLayout = Sentry.wrap(function AppLayout() {
  return <AppNavigation />;
});

export default function RootLayout() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PostHogProvider
          apiKey={process.env.EXPO_PUBLIC_POSTHOG_KEY!}
          options={{ host: process.env.EXPO_PUBLIC_POSTHOG_HOST }}
        >
          <QueryProvider>
            <AppLayout />
            <StatusBar style="dark" />
          </QueryProvider>
        </PostHogProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
