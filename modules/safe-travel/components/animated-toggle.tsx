import { Switch } from "react-native";

const COLOR_ON = "#107359";
const COLOR_OFF = "#D1D5DB";

type Props = {
  value: boolean;
  onValueChange?: (v: boolean) => void;
  disabled?: boolean;
};

export function AnimatedToggle({ value, onValueChange, disabled }: Props) {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{ false: COLOR_OFF, true: COLOR_ON }}
      thumbColor="white"
    />
  );
}
