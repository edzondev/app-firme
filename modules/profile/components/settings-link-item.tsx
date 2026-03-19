import { ChevronRight } from "lucide-react-native";
import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  Icon: ComponentType<SvgProps & { color?: string; size?: number }>;
  label: string;
  onPress?: () => void;
  showDivider?: boolean;
};

export default function SettingsLinkItem({
  Icon,
  label,
  onPress,
  showDivider = false,
}: Props) {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center px-4 py-3.5 gap-3 active:bg-muted"
      >
        <Icon size={20} color="hsl(164.84, 76%, 24.51%)" />
        <Text className="flex-1 text-sm font-medium text-text-primary">
          {label}
        </Text>
        <ChevronRight size={18} color="hsl(0, 0%, 65%)" />
      </TouchableOpacity>
      {showDivider && <View className="h-px bg-border mx-4" />}
    </View>
  );
}
