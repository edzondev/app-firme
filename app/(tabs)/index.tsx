import MainLayout from "@/core/layouts/main-layout";
import { usePostHog } from "posthog-react-native";
import { Pressable, Text } from "react-native";

export default function TabOneScreen() {
  const posthog = usePostHog();

  const handlePress = () => {
    posthog.capture("button_pressed", {
      button_name: "signup",
    });
  };

  return (
    <MainLayout>
      <Text className="text-red-500">Tab One</Text>

      <Pressable
        onPress={handlePress}
        className="mt-4 bg-blue-500 px-4 py-2 rounded"
      >
        <Text className="text-blue-500">Press me</Text>
      </Pressable>
    </MainLayout>
  );
}
