import type { PropsWithChildren } from "react";
import { Text, View } from "react-native";

type Props = PropsWithChildren<{
  title: string;
}>;

export default function SettingsSection({ title, children }: Props) {
  return (
    <View className="mx-4 gap-1">
      <Text className="text-xs font-semibold text-secondary-foreground tracking-widest uppercase px-1 mb-1">
        {title}
      </Text>
      <View className="bg-card rounded-2xl overflow-hidden">{children}</View>
    </View>
  );
}
