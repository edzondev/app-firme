import { View } from "react-native";

const COLOR_FILLED = "#107359";
const COLOR_EMPTY = "#E0E0D8";

type Props = {
  currentStep: number;
  totalSteps?: number;
};

export function StepIndicator({ currentStep, totalSteps = 3 }: Props) {
  return (
    <View className="flex-row gap-1.5">
      {Array.from({ length: totalSteps }, (_, i) => (
        <View
          key={i}
          className="flex-1 h-1 rounded-full"
          style={{ backgroundColor: i < currentStep ? COLOR_FILLED : COLOR_EMPTY }}
        />
      ))}
    </View>
  );
}
