import { cn } from "@/core/lib/utils";
import { Text, type TextProps } from "react-native";

export interface LabelProps extends TextProps {
  children: React.ReactNode;
  isRequired?: boolean;
}

function Label({
  className,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  disabled,
  children,
  isRequired,
  ...props
}: LabelProps) {
  return (
    <Text
      className={cn(
        "flex select-none flex-row items-center gap-2 text-foreground text-sm font-medium",
        disabled && "opacity-50",
        className,
      )}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
      {...props}
    >
      {children}
      {isRequired && <Text className="text-red-500 ml-1">*</Text>}
    </Text>
  );
}

export { Label };
