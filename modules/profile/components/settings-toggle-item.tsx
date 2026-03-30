import type { ComponentType } from "react";
import { Switch, Text, View } from "react-native";
import type { SvgProps } from "react-native-svg";

type Props = {
  Icon: ComponentType<SvgProps & { color?: string; size?: number }>;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  showDivider?: boolean;
};

export default function SettingsToggleItem({
  Icon,
  label,
  value,
  onValueChange,
  showDivider = true,
}: Props) {
  return (
    <View>
      <View className="flex-row items-center px-4 py-3.5 gap-3">
        <Icon size={20} color="hsl(164.84, 76%, 24.51%)" />
        <Text className="flex-1 text-sm font-medium text-secondary-foreground">
          {label}
        </Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{
            false: "hsl(60, 4.17%, 85%)",
            true: "hsl(164.84, 76%, 24.51%)",
          }}
          thumbColor="white"
        />
      </View>
      {showDivider && <View className="h-px bg-border mx-4" />}
    </View>
  );
}
