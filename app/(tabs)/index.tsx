import { Button } from "@/core/components/ui/button";
import MainLayout from "@/core/layouts/main-layout";
import { ActiveTripAlert } from "@/modules/trips/components/active-trip-alert";
import { useActiveTrip } from "@/modules/trips/hooks/use-trips";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function HomePage() {
  const router = useRouter();
  const { data: activeTrip, isLoading } = useActiveTrip({ refetchOnMount: "always" });

  const handleStartTrip = () => {
    router.push("/trip/start");
  };

  return (
    <MainLayout>
      <View className="flex-1 px-6 pt-8 gap-6">
        <Text
          className="text-3xl font-bold text-text-primary"
          style={{ letterSpacing: -0.3 }}
        >
          Hola 👋
        </Text>

        {activeTrip && <ActiveTripAlert trip={activeTrip} />}

        {!activeTrip && !isLoading && (
          <Button title="Iniciar viaje seguro" onPress={handleStartTrip} />
        )}
      </View>
    </MainLayout>
  );
}
