import { Button } from "@/core/components/ui/button";
import { View } from "react-native";

interface ResolveSOSButtonProps {
  isResolving: boolean;
  onPress: () => void;
}

export function ResolveSOSButton({ isResolving, onPress }: ResolveSOSButtonProps) {
  return (
    <View className="gap-2">
      <Button
        title={isResolving ? "Cancelando..." : "Estoy bien, cancelar alerta"}
        variant="outline"
        textClassName="text-white"
        className="border border-white/40"
        onPress={onPress}
        disabled={isResolving}
      />
    </View>
  );
}
