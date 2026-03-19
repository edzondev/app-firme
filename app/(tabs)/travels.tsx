import TravelCard from "@/core/components/shared/travel-card";
import MainLayout from "@/core/layouts/main-layout";
import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";

const trips = [
  {
    id: 1,
    date: "14 Mar 2026",
    time: "19:45",
    app: "Uber",
    appColor: "#000",
    plate: "ABC-123",
    duration: "28 min",
    status: "ok",
  },
  {
    id: 2,
    date: "13 Mar 2026",
    time: "08:15",
    app: "inDrive",
    appColor: "#2BC44F",
    plate: "XYZ-789",
    duration: "35 min",
    status: "ok",
  },
  {
    id: 3,
    date: "10 Mar 2026",
    time: "22:10",
    app: "DiDi",
    appColor: "#FF7A28",
    plate: "DEF-456",
    duration: "42 min",
    status: "sos",
  },
  {
    id: 4,
    date: "8 Mar 2026",
    time: "14:30",
    app: "Uber",
    appColor: "#000",
    plate: "GHI-012",
    duration: "18 min",
    status: "ok",
  },
  {
    id: 5,
    date: "5 Mar 2026",
    time: "20:00",
    app: "inDrive",
    appColor: "#2BC44F",
    plate: "JKL-345",
    duration: "25 min",
    status: "cancelled",
  },
  {
    id: 6,
    date: "2 Mar 2026",
    time: "09:00",
    app: "Cabify",
    appColor: "#7B61FF",
    plate: "MNO-678",
    duration: "30 min",
    status: "ok",
  },
  {
    id: 7,
    date: "2 Mar 2026",
    time: "09:00",
    app: "Cabify",
    appColor: "#7B61FF",
    plate: "MNO-678",
    duration: "30 min",
    status: "ok",
  },
  {
    id: 8,
    date: "2 Mar 2026",
    time: "09:00",
    app: "Cabify",
    appColor: "#7B61FF",
    plate: "MNO-678",
    duration: "30 min",
    status: "ok",
  },
  {
    id: 9,
    date: "2 Mar 2026",
    time: "09:00",
    app: "Cabify",
    appColor: "#7B61FF",
    plate: "MNO-678",
    duration: "30 min",
    status: "ok",
  },
  {
    id: 10,
    date: "2 Mar 2026",
    time: "09:00",
    app: "Cabify",
    appColor: "#7B61FF",
    plate: "MNO-678",
    duration: "30 min",
    status: "ok",
  },
];

export default function TravelPage() {
  return (
    <MainLayout edges={["top"]}>
      <View className="bg-white py-8 px-6">
        <Text className="text-3xl font-semibold">Historial de Viajes</Text>
      </View>

      <View className="px-6 mt-8 flex-1">
        <FlashList
          data={trips}
          keyExtractor={(trip) => trip.id.toString()}
          renderItem={({ item }) => <TravelCard {...item} />}
          contentContainerStyle={{ paddingBottom: 24 }}
          ItemSeparatorComponent={() => <View className="h-4" />}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </MainLayout>
  );
}
