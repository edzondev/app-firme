import BottomSheet, { type BottomSheetProps, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { type PropsWithChildren, type RefObject } from "react";

type BottomSheetComponentProps = PropsWithChildren<{
  bottomSheetRef: RefObject<BottomSheetMethods | null>;
  onChange: (index: number) => void;
  index: number;
  snapPoints?: string[];
}> & Omit<BottomSheetProps, "ref" | "onChange" | "index" | "snapPoints" | "children">;

export default function BottomSheetComponent({
  bottomSheetRef,
  onChange,
  index,
  snapPoints,
  children,
  ...rest
}: BottomSheetComponentProps) {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={onChange}
      index={index}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      enablePanDownToClose
      {...rest}
    >
      <BottomSheetView className="px-4">{children}</BottomSheetView>
    </BottomSheet>
  );
}
