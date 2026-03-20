import TravelCard from "@/core/components/shared/travel-card";
import MainLayout from "@/core/layouts/main-layout";
import { getCachedProfile } from "@/core/storage/helpers";
import { Plus, Shield } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

const recentTrips = [
  {
    date: "14 Mar 2026",
    time: "19:45",
    app: "Uber",
    duration: "28 min",
    status: "ok",
  },
  {
    date: "13 Mar 2026",
    time: "08:15",
    app: "inDrive",
    duration: "35 min",
    status: "ok",
  },
  {
    date: "10 Mar 2026",
    time: "22:10",
    app: "DiDi",
    duration: "42 min",
    status: "sos",
  },
];

const contacts = [
  { name: "Mamá", initials: "MG", color: "#0F6E56" },
  { name: "Carlos", initials: "CA", color: "#1D9E75" },
  { name: "Ana", initials: "AL", color: "#BA7517" },
];

export default function Home() {
  const profile = getCachedProfile();

  console.log("Cached profile:", profile);

  return (
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
            <Text className="text-3xl font-semibold">¡Hola, Mariana!</Text>
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
              {contacts.map((c, i) => (
                <View key={i} className="flex flex-col items-center gap-1">
                  <View
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: c.color,
                    }}
                  >
                    <Text className="text-base font-semibold text-white">
                      {c.initials}
                    </Text>
                  </View>
                  <Text className="text-xs text-text-secondary">{c.name}</Text>
                </View>
              ))}
              <Pressable className="w-14 h-14 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center active:opacity-70">
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
              {recentTrips.map((trip, i) => (
                <TravelCard
                  key={i}
                  date={trip.date}
                  status={trip.status}
                  time={trip.time}
                  app={trip.app}
                  duration={trip.duration}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
}
