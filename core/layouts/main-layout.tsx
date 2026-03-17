import type { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainLayout({ children }: PropsWithChildren) {
  return <SafeAreaView className="flex-1">{children}</SafeAreaView>;
}
