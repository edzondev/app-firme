import { APP_LABELS } from "@/modules/trips/constants/trip.constants";
import type { ActiveTrip } from "@/core/types/trip";
import { useRouter } from "expo-router";
import { ChevronRight, Radio } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface ActiveTripAlertProps {
  trip: ActiveTrip;
}

export function ActiveTripAlert({ trip }: ActiveTripAlertProps) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push("/trip/active")}>
      <View className="bg-green-50 border-2 border-green-600 rounded-2xl p-4 flex-row items-center gap-3">
        <View className="w-10 h-10 rounded-full bg-green-600 items-center justify-center">
          <Radio size={20} color="white" />
        </View>
        <View className="flex-1">
          <Text className="text-base font-bold text-green-800">
            Viaje en curso
          </Text>
          <Text className="text-sm text-green-700">
            {APP_LABELS[trip.externalApp] ?? trip.externalApp}
            {trip.driverPlate ? ` · ${trip.driverPlate}` : ""}
          </Text>
        </View>
        <ChevronRight size={20} color="#15803d" />
      </View>
    </Pressable>
  );
}
