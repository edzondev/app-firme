import { Crown, Star } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  planName: string;
  description: string;
  onUpgrade?: () => void;
};

export default function PremiumBanner({
  planName,
  description,
  onUpgrade,
}: Props) {
  return (
    <View
      className="mx-4 rounded-2xl flex-row items-center gap-3 px-4 py-3.5"
      style={{ backgroundColor: "hsl(34.6, 77.99%, 95%)" }}
    >
      <View
        className="w-11 h-11 rounded-xl items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "hsl(34.6, 77.99%, 88%)" }}
      >
        <Crown size={22} color="hsl(34.6, 77.99%, 40.98%)" />
      </View>
      <View className="flex-1 gap-0.5">
        <Text
          className="font-bold text-sm"
          style={{ color: "hsl(34.6, 77.99%, 30%)" }}
        >
          {planName}
        </Text>
        <Text
          className="text-xs leading-4"
          style={{ color: "hsl(34.6, 77.99%, 42%)" }}
        >
          {description}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onUpgrade}
        className="flex-row items-center gap-1.5 rounded-xl px-3.5 py-2"
        style={{ backgroundColor: "hsl(34.6, 77.99%, 40.98%)" }}
      >
        <Star size={13} color="white" fill="white" />
        <Text className="text-white font-semibold text-sm">Premium</Text>
      </TouchableOpacity>
    </View>
  );
}
