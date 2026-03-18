import type { PropsWithChildren } from "react";
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
  edges,
  className,
  ...props
}: Props) {
  return (
    <SafeAreaView
      className={cn("flex-1 bg-background", className)}
      edges={edges}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
}
