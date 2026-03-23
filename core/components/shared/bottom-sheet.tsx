import { type PropsWithChildren, type RefObject } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

type BottomSheetProps = PropsWithChildren<{
  bottomSheetRef: RefObject<BottomSheetMethods | null>;
  onChange: (index: number) => void;
  index: number;
  snapPoints?: string[];
}>;

export default function BottomSheetComponent({
  bottomSheetRef,
  onChange,
  index,
  snapPoints,
  children,
}: BottomSheetProps) {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={onChange}
      index={index}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      enablePanDownToClose
    >
      <BottomSheetView className="px-4">{children}</BottomSheetView>
    </BottomSheet>
  );
}
