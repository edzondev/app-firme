import type { ComponentType } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import type { SvgProps } from "react-native-svg";

type Props = {
  Icon: ComponentType<SvgProps & { color?: string; size?: number }>;
  label: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  showDivider?: boolean;
};

export default function SettingsSegmentItem({
  Icon,
  label,
  options,
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
        <View
          className="flex-row rounded-lg overflow-hidden"
          style={{ borderWidth: 1, borderColor: "hsl(60, 4.17%, 85%)" }}
        >
          {options.map((option, index) => {
            const isSelected = value === option;
            return (
              <TouchableOpacity
                key={option}
                onPress={() => onValueChange(option)}
                className={`px-3 py-1.5 ${isSelected ? "" : "bg-card"}`}
                style={
                  isSelected
                    ? { backgroundColor: "hsl(164.84, 76%, 24.51%)" }
                    : index > 0
                      ? {
                          borderLeftWidth: 1,
                          borderLeftColor: "hsl(60, 4.17%, 85%)",
                        }
                      : undefined
                }
              >
                <Text
                  className={`text-xs font-semibold ${isSelected ? "text-white" : "text-secondary-foreground"}`}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {showDivider && <View className="h-px bg-border mx-4" />}
    </View>
  );
}
