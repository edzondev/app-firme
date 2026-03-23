import { cn } from "@/core/lib/utils";
import React, { useMemo } from "react";
import { View, Text, type ViewProps, type TextProps } from "react-native";

export function FieldSet({ className, ...props }: ViewProps) {
  return <View className={cn("flex-col gap-4 w-full", className)} {...props} />;
}

export function FieldGroup({ className, ...props }: ViewProps) {
  return <View className={cn("flex-col gap-5 w-full", className)} {...props} />;
}

type FieldOrientation = "vertical" | "horizontal";

const fieldOrientationStyles: Record<FieldOrientation, string> = {
  vertical: "flex-col gap-1.5 w-full",
  horizontal: "flex-row items-center justify-between gap-2 w-full",
};

export interface FieldProps extends ViewProps {
  orientation?: FieldOrientation;
}

export function Field({
  className,
  orientation = "vertical",
  ...props
}: FieldProps) {
  return (
    <View
      className={cn(fieldOrientationStyles[orientation], className)}
      {...props}
    />
  );
}

export function FieldContent({ className, ...props }: ViewProps) {
  return <View className={cn("flex-col flex-1 gap-1", className)} {...props} />;
}

export function FieldLegend({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn("text-lg font-semibold text-slate-900 mb-2", className)}
      {...props}
    />
  );
}

export interface FieldLabelProps extends TextProps {
  isRequired?: boolean;
}

export function FieldLabel({
  className,
  children,
  isRequired,
  ...props
}: FieldLabelProps) {
  return (
    <Text
      className={cn("text-sm font-medium text-slate-700", className)}
      {...props}
    >
      {children}
      {isRequired && <Text className="text-red-500 ml-1"> *</Text>}
    </Text>
  );
}

export function FieldDescription({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn("text-sm text-slate-500 mt-1 leading-tight", className)}
      {...props}
    />
  );
}

export function FieldSeparator({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn("h-[1px] bg-slate-200 w-full my-4", className)}
      {...props}
    />
  );
}

export interface FieldErrorProps extends ViewProps {
  error?: string | { message?: string };
  errors?: Array<{ message?: string } | undefined>;
  textClassName?: string;
}

export function FieldError({
  className,
  textClassName,
  error,
  errors,
  children,
  ...props
}: FieldErrorProps) {
  const content = useMemo(() => {
    if (children) return children;

    if (error) {
      const msg = typeof error === "string" ? error : error.message;
      return msg ? (
        <Text className={cn("text-red-500 text-sm font-medium", textClassName)}>
          {msg}
        </Text>
      ) : null;
    }

    if (errors?.length) {
      const validErrors = errors.filter((e) => e?.message);
      if (validErrors.length === 0) return null;
      if (validErrors.length === 1) {
        return (
          <Text
            className={cn("text-red-500 text-sm font-medium", textClassName)}
          >
            {validErrors[0]!.message}
          </Text>
        );
      }
      return (
        <View className="flex-col gap-1 mt-1">
          {validErrors.map((e, idx) => (
            <Text
              key={idx}
              className={cn("text-red-500 text-sm font-medium", textClassName)}
            >
              • {e!.message}
            </Text>
          ))}
        </View>
      );
    }

    return null;
  }, [children, error, errors, textClassName]);

  if (!content) return null;

  return (
    <View className={cn("mt-1", className)} {...props}>
      {content}
    </View>
  );
}
