import { Camera } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  initials: string;
  size?: number;
  onPressCamera?: () => void;
};

export default function ProfileAvatar({
  initials,
  size = 80,
  onPressCamera,
}: Props) {
  return (
    <View style={{ width: size, height: size }}>
      <View
        className="rounded-full items-center justify-center"
        style={{
          width: size,
          height: size,
          backgroundColor: "hsl(164.84, 76%, 24.51%)",
        }}
      >
        <Text
          className="text-white font-bold"
          style={{ fontSize: size * 0.3 }}
        >
          {initials}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onPressCamera}
        className="absolute bottom-0 right-0 bg-white rounded-full items-center justify-center"
        style={{
          width: size * 0.3,
          height: size * 0.3,
          shadowColor: "#000",
          shadowOpacity: 0.12,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 3,
        }}
      >
        <Camera size={size * 0.14} color="#555" />
      </TouchableOpacity>
    </View>
  );
}
