import type { PropsWithChildren } from "react";
import { View } from "react-native";
import {
  type Edge,
  type SafeAreaViewProps,
  SafeAreaView,
} from "react-native-safe-area-context";
import { cn } from "../lib/utils";

type Props = PropsWithChildren<
  SafeAreaViewProps & {
    edges?: Edge[];
  }
>;

export default function MainLayout({
  children,
  edges = ["top", "bottom"],
  className,
  ...props
}: Props) {
  return (
    <SafeAreaView
      className={cn("flex-1 bg bg-background", className)}
      edges={edges}
      {...props}
    >
      <View className="flex-1">{children}</View>
    </SafeAreaView>
  );
}
