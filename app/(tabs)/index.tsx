import TravelCard from "@/core/components/shared/travel-card";
import { Button } from "@/core/components/ui/button";
import MainLayout from "@/core/layouts/main-layout";
import { ActiveTrip } from "@/core/types/trip";
import { TrustContacts } from "@/modules/contacts/components/trust-contacts";
import { useGetContacts } from "@/modules/contacts/hooks/use-api-contacts";
import { ActiveTripAlert } from "@/modules/trips/components/active-trip-alert";
import { useActiveTrip, useTrips } from "@/modules/trips/hooks/use-trips";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { LogOut, Shield } from "lucide-react-native";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

const dummyTrip: ActiveTrip = {
  id: "trip123",
  userId: "user123",
  externalApp: "yango",
  driverPlate: "ABC-123",
  driverName: "Juan Pérez",
  vehicleColor: "Rojo",
  status: "active",
  audioEnabled: true,
  shareEnabled: true,
  routeDeviationEnabled: false,
  shareToken: "token123",
  startedAt: new Date().toISOString(),
  endedAt: null,
  durationSeconds: null,
  distanceMeters: null,
  locationPointsCount: 0,
  userRating: null,
  createdAt: new Date().toISOString(),
};

export default function HomePage() {
  const router = useRouter();

  const { data: activeTrip, isLoading } = useActiveTrip();
  const { data: contacts, isLoading: isContactsLoading } = useGetContacts();
  const { data: trips, isLoading: isTripsLoading } = useTrips();

  const handleStartTrip = () => {
    router.push("/trip/start");
  };

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading || isContactsLoading || isTripsLoading) {
    return (
      <MainLayout className="justify-center items-center">
        <ActivityIndicator size="large" color="#10b981" />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <View className="flex-1 px-6 pt-8 gap-6">
        <Text
          className="text-3xl font-bold text-secondary-foreground"
          style={{ letterSpacing: -0.3 }}
        >
          Hola 👋
        </Text>

        <Pressable onPress={handleLogout} className="active:opacity-70">
          <LogOut size={24} strokeWidth={2} color="#10b981" />
        </Pressable>

        {activeTrip && <ActiveTripAlert trip={activeTrip} />}

        {!activeTrip && !isLoading && !isContactsLoading && (
          <Button
            title="Iniciar viaje seguro"
            onPress={handleStartTrip}
            icon={Shield}
            iconPosition="right"
          />
        )}

        <TrustContacts contacts={contacts} isLoading={isContactsLoading} />

        <View className="gap-3 flex-1">
          <Text className="text-sm font-medium text-foreground uppercase">
            Últimos viajes
          </Text>
          <View className="bg-card flex-1 border border-border rounded-2xl p-4">
            <FlashList
              data={trips?.trips}
              keyExtractor={(trip) => trip.id.toString()}
              renderItem={({ item }) => <TravelCard {...item} />}
              contentContainerStyle={{ paddingBottom: 24 }}
              ItemSeparatorComponent={() => <View className="h-4" />}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </View>
      </View>
    </MainLayout>
  );
}
