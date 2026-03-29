import { Button } from "@/core/components/ui/button";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import type { ReactNode, RefObject } from "react";
import { Text, View } from "react-native";
import BottomSheetComponent from "./bottom-sheet";

interface ConfirmationSheetProps {
  sheetRef: RefObject<BottomSheetMethods | null>;
  isOpen: boolean;
  onClose: (index: number) => void;
  snapPoints?: string[];
  error?: string | null;
  onDismissError: () => void;
  confirmTitle?: string;
  confirmMessage?: string;
  confirmActions: ReactNode;
}

export function ConfirmationSheet({
  sheetRef,
  isOpen,
  onClose,
  snapPoints = ["35%"],
  error,
  onDismissError,
  confirmTitle,
  confirmMessage,
  confirmActions,
}: ConfirmationSheetProps) {
  return (
    <BottomSheetComponent
      bottomSheetRef={sheetRef}
      index={isOpen ? 0 : -1}
      snapPoints={snapPoints}
      onChange={onClose}
      backgroundStyle={{ borderRadius: 24 }}
      handleIndicatorStyle={{ backgroundColor: "#d1d5db", width: 40 }}
    >
      {error ? (
        <View className="gap-4 pt-4 pb-2">
          <Text className="text-lg font-bold text-text-primary">Error</Text>
          <Text className="text-text-secondary leading-5">{error}</Text>
          <Button title="Entendido" variant="primary" onPress={onDismissError} />
        </View>
      ) : (
        <View className="gap-4 pt-4 pb-2">
          {confirmTitle && (
            <Text className="text-lg font-bold text-text-primary">{confirmTitle}</Text>
          )}
          {confirmMessage && (
            <Text className="text-text-secondary leading-5">{confirmMessage}</Text>
          )}
          {confirmActions}
        </View>
      )}
    </BottomSheetComponent>
  );
}
