import { cn } from "@/core/lib/utils";
import React, { useState } from "react";
import { TextInput, type TextInputProps, View, Text } from "react-native";

export interface InputProps extends TextInputProps {
  className?: string;
  error?: string;
  ref?: React.Ref<TextInput>;
}

export const Input = ({
  className,
  error,
  editable = true,
  ref,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full">
      <TextInput
        ref={ref}
        className={cn(
          "h-12 px-4 rounded-md border bg-white text-slate-900 text-base",
          isFocused ? "border-blue-500" : "border-slate-300",
          error && "border-red-500",
          !editable && "opacity-50 bg-slate-50 text-slate-500",
          className,
        )}
        placeholderTextColor="#94a3b8"
        editable={editable}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />

      {error && (
        <Text className="text-red-500 text-sm mt-1.5 ml-1 font-medium">
          {error}
        </Text>
      )}
    </View>
  );
};
