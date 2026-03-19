import { Car, Check, Square, TriangleAlert } from "lucide-react-native";
import { memo } from "react";
import { Text, View } from "react-native";

type Props = {
  date: string;
  status: string;
  time: string;
  duration: string;
  app: string;
  plate?: string;
};

const appColors: Record<string, string> = {
  uber: "#000000",
  indrive: "#2BC44F",
  didi: "#FF7A28",
  cabify: "#7B61FF",
};

export default memo(function TravelCard({
  date,
  status,
  time,
  app,
  duration,
  plate,
}: Props) {
  return (
    <View className="bg-card rounded-2xl flex flex-row items-center gap-3.5 p-5 shadow-gray-200 shadow-sm active:bg-card/80">
      <View
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: `${appColors[app.toLowerCase()] || "#666"}12`,
        }}
      >
        <Car size={20} color={appColors[app.toLowerCase()] || "#666"} />
      </View>
      <View className="flex-1 flex-col gap-2.5">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-semibold text-base">{date}</Text>
          <View
            className={`px-2 py-1 rounded flex-row items-center gap-1.5 ${status === "sos" ? "bg-red-100" : status === "ok" ? "bg-green-100" : "bg-gray-100"}`}
          >
            {status === "sos" ? (
              <TriangleAlert size={12} color="#D14343" />
            ) : status === "ok" ? (
              <Check size={12} color="#107359" />
            ) : (
              <Square size={12} color="#666" fill="#666" />
            )}
            <Text
              className={`text-xs font-medium ${status === "sos" ? "text-red-700" : status === "ok" ? "text-green-700" : "text-gray-500"}`}
            >
              {status === "sos"
                ? "SOS activado"
                : status === "ok"
                  ? "Completado"
                  : "Cancelado"}
            </Text>
          </View>
        </View>
        <View className="flex flex-row gap-2">
          <Text className="text-xs text-text-secondary">{time}</Text>
          <Text className="text-xs text-text-secondary/25">|</Text>
          <Text
            className="text-xs font-semibold px-2 py-[1px] rounded"
            style={{
              color: appColors[app.toLowerCase()] || "#666",
              backgroundColor: `${appColors[app.toLowerCase()] || "#666"}12`,
            }}
          >
            {app}
          </Text>
          {plate && (
            <>
              <Text className="text-xs text-text-secondary/25">|</Text>
              <Text className="text-xs text-text-secondary">{plate}</Text>
            </>
          )}
          <Text className="text-xs text-text-secondary/25">|</Text>
          <Text className="text-xs text-text-secondary">{duration}</Text>
        </View>
      </View>
    </View>
  );
});
