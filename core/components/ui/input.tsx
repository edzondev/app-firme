import { cn } from "@/core/lib/utils";
import React from "react";
import { TextInput, type TextInputProps, View } from "react-native";

export interface InputProps extends TextInputProps {
  className?: string;
  error?: boolean;
  ref?: React.Ref<TextInput>;
}

export const Input = ({
  className,
  error,
  editable = true,
  ref,
  onFocus,
  onBlur,
  ...props
}: InputProps) => {
  return (
    <View className="flex-col gap-1">
      <TextInput
        ref={ref}
        className={cn(
          "h-12 px-4 rounded-md border bg-white text-slate-900 text-base",
          error && "border-red-500",
          !editable && "opacity-50 bg-slate-50 text-slate-500",
          className,
        )}
        placeholderTextColor="#94a3b8"
        editable={editable}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
    </View>
  );
};
