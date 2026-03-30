import { TripHistory } from "@/core/types/recent-trips";
import {
  capitalizeApp,
  formatDuration,
  formatTripDate,
  formatTripTime,
} from "@/core/utils/trip";
import { Car } from "lucide-react-native";
import { memo } from "react";
import { Text, View } from "react-native";

type Props = {} & TripHistory;

const appColors: Record<string, string> = {
  uber: "#000000",
  indrive: "#2BC44F",
  didi: "#FF7A28",
  cabify: "#7B61FF",
};

export default memo(function TravelCard({
  status,
  externalApp,
  durationSeconds,
  driverPlate,
  startedAt,
  endedAt,
}: Props) {
  return (
    <View className="flex flex-row items-center gap-3.5 px-2 py-5">
      <View
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: `${appColors[externalApp.toLowerCase()] || "#666"}12`,
        }}
      >
        <Car size={20} color={appColors[externalApp.toLowerCase()] || "#666"} />
      </View>
      <View className="flex-1 flex-col gap-2.5">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-semibold text-base">
            {formatTripDate(startedAt)}
          </Text>
          <View
            className={`px-2 py-1 rounded flex-row items-center ${status === "sos_triggered" ? "bg-red-100" : status === "completed" ? "bg-green-100" : "bg-gray-100"}`}
          >
            <Text
              className={`text-xs font-medium ${status === "sos_triggered" ? "text-red-700" : status === "completed" ? "text-green-700" : "text-gray-500"}`}
            >
              {status === "sos_triggered"
                ? "SOS activado"
                : status === "completed"
                  ? "Completado"
                  : "Cancelado"}
            </Text>
          </View>
        </View>
        <View className="flex flex-row gap-2">
          <Text className="text-xs text-foreground">
            {formatTripTime(startedAt)}
          </Text>
          <Text className="text-xs text-foreground">|</Text>
          <Text
            className="text-xs font-semibold px-2 py-[1px] rounded"
            style={{
              color: appColors[externalApp.toLowerCase()] || "#666",
              backgroundColor: `${appColors[externalApp.toLowerCase()] || "#666"}12`,
            }}
          >
            {capitalizeApp(externalApp)}
          </Text>
          {driverPlate && (
            <>
              <Text className="text-xs text-foreground">|</Text>
              <Text className="text-xs text-foreground">{driverPlate}</Text>
            </>
          )}
          <Text className="text-xs text-foreground">|</Text>
          <Text className="text-xs text-foreground">
            {formatDuration(durationSeconds, startedAt, endedAt)}
          </Text>
        </View>
      </View>
    </View>
  );
});
