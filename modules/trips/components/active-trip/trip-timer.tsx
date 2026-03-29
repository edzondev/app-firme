import { Text, View } from "react-native";
import { useTripTimer } from "../../hooks/use-trip-timer";

interface TripTimerProps {
  startedAt: string | null;
}

export function TripTimer({ startedAt }: TripTimerProps) {
  const { elapsed } = useTripTimer(startedAt);

  return (
    <View className="flex-row items-center justify-between bg-white rounded-2xl py-2.5 px-6 w-full">
      <Text className="text-lg font-medium text-green-700">Viaje en curso</Text>
      <Text className="text-lg font-medium text-gray-800 tracking-widest text-center">
        {elapsed}
      </Text>
    </View>
  );
}
