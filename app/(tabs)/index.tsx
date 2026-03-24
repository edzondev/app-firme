import BottomSheetComponent from "@/core/components/shared/bottom-sheet";
import TravelCard from "@/core/components/shared/travel-card";
import MainLayout from "@/core/layouts/main-layout";
import { useUserStore } from "@/core/stores/user-store";
import {
  capitalizeApp,
  formatDuration,
  formatTripDate,
  formatTripTime,
  mapTripStatus,
} from "@/core/utils/trip";
import { useApiContacts } from "@/modules/contacts/hooks/use-api-contacts";
import AddContactForm from "@/modules/dashboard/components/add-contact-form";
import { useTrips } from "@/modules/trips/hooks/use-trips";
import BottomSheet from "@gorhom/bottom-sheet";
import { Plus, Shield } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Home() {
  const userId = useUserStore((s) => s.id);
  const fullName = useUserStore((s) => s.fullName);
  const { data: contactsData, isLoading: isLoadingContacts } = useApiContacts();
  const { data: tripsData, isLoading: isLoadingTrips } = useTrips(userId ?? "");

  const [index, setIndex] = useState(-1);
  const snapPoints = ["50%", "85%"];
  const bottomSheetRef = useRef<BottomSheet>(null);
  const onChange = (index: number) => setIndex(index);

  if (isLoadingContacts && isLoadingTrips) {
    return (
      <MainLayout edges={["top", "bottom"]}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </MainLayout>
    );
  }

  return (
    <>
      <MainLayout edges={["top", "bottom"]}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 20 }}
          contentInsetAdjustmentBehavior="automatic"
          pinchGestureEnabled={false}
        >
          {/* Header */}
          <View className="flex-row justify-between items-start py-8 px-6">
            <View className="flex-col">
              <Text className="text-3xl font-semibold">¡Hola, {fullName}!</Text>
              <Text className="text-text-secondary secondary mt-1">
                ¿A dónde vas hoy?
              </Text>
            </View>
            <View className="bg-primary flex items-center justify-center rounded-full w-11 h-11">
              <Text className="text-base font-semibold text-white">MG</Text>
            </View>
          </View>

          <View className="py-4 flex-col gap-6 px-6">
            {/* Main CTA Card */}
            <Pressable className="bg-primary rounded-lg p-6 flex flex-row items-center justify-between gap-5 active:opacity-80">
              <View className="w-16 h-16 bg-white/20  rounded-full flex items-center justify-center">
                <Shield size={32} strokeWidth={1.5} color="white" />
              </View>
              <View className="flex-1 flex-col gap-2 ">
                <Text className="text-lg font-bold text-white">
                  Iniciar viaje seguro
                </Text>
                <Text className="text-sm text-white/80">
                  Activa tu protección antes de subir al taxi
                </Text>
                <View className="bg-white/20 rounded-lg px-4 py-2 self-start">
                  <Text className="text-sm font-semibold text-white">
                    Iniciar
                  </Text>
                </View>
              </View>
            </Pressable>

            {/* Emergency Contacts */}
            <View>
              <View className="flex flex-row justify-between items-center mb-3">
                <Text className="text-base font-semibold">
                  Mis contactos de emergencia
                </Text>
                <Pressable className="active:opacity-70">
                  <Text className="text-sm font-semibold text-green-700">
                    Ver todos
                  </Text>
                </Pressable>
              </View>

              <View className="flex flex-row gap-3 items-start">
                {contactsData?.map((c) => (
                  <View key={c.id} className="flex flex-col items-center gap-1">
                    <View className="w-14 h-14 rounded-full flex items-center justify-center bg-primary">
                      <Text className="text-base font-semibold text-white">
                        {c.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <Text className="text-xs text-text-secondary">
                      {c.name}
                    </Text>
                  </View>
                ))}
                <Pressable
                  className="w-14 h-14 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center active:opacity-70"
                  onPress={() => bottomSheetRef.current?.snapToIndex(0)}
                >
                  <Plus size={20} color="#B0B0B0" />
                </Pressable>
              </View>
            </View>

            {/* Recent Trips */}
            <View>
              <View className="flex flex-row justify-between items-center mb-3">
                <Text className="text-base font-semibold">Últimos viajes</Text>
                <Pressable className="active:opacity-70">
                  <Text className="text-sm font-semibold text-green-700">
                    Ver todos
                  </Text>
                </Pressable>
              </View>

              <View className="flex flex-col gap-4">
                {tripsData?.trips
                  .filter((t) => t.status !== "active")
                  .map((trip) => (
                    <TravelCard
                      key={trip.id}
                      date={formatTripDate(trip.startedAt ?? "")}
                      time={formatTripTime(trip.startedAt ?? "")}
                      status={mapTripStatus(trip.status)}
                      app={capitalizeApp(trip.externalApp)}
                      duration={formatDuration(
                        trip.durationSeconds,
                        trip.startedAt ?? "",
                        trip.endedAt,
                      )}
                    />
                  ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </MainLayout>

      <BottomSheetComponent
        bottomSheetRef={bottomSheetRef}
        onChange={onChange}
        index={index}
        snapPoints={snapPoints}
      >
        <AddContactForm />
      </BottomSheetComponent>
    </>
  );
}
