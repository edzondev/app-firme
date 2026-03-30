import { cn } from "@/core/lib/utils";
import { View } from "react-native";

const COLOR_FILLED = "#7664e5";
const COLOR_EMPTY = "#E0E0D8";

type Props = {
  className?: string;
  currentStep: number;
  totalSteps?: number;
};

export function StepIndicator({
  currentStep,
  totalSteps = 2,
  className,
}: Props) {
  return (
    <View className={cn("flex-row gap-1.5", className)}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <View
          key={i}
          className="flex-1 h-1 rounded-full"
          style={{
            backgroundColor: i < currentStep ? COLOR_FILLED : COLOR_EMPTY,
          }}
        />
      ))}
    </View>
  );
}
