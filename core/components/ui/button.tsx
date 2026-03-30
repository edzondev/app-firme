import { cn } from "@/core/lib/utils";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import { Pressable, Text, type PressableProps } from "react-native";

type ButtonVariant = "primary" | "outline" | "destructive";
type ButtonSize = "sm" | "default" | "lg";

export interface ButtonProps extends PressableProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  textClassName?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  iconClassName?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary",
  outline: "bg-transparent border border-slate-300",
  destructive: "bg-red-500",
};

const textVariantStyles: Record<ButtonVariant, string> = {
  primary: "text-white",
  outline: "text-slate-800",
  destructive: "text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3",
  default: "h-11 px-4",
  lg: "h-14 px-6",
};

const textSizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm",
  default: "text-base",
  lg: "text-lg",
};

export const Button = ({
  title,
  variant = "primary",
  size = "default",
  className,
  textClassName,
  disabled,
  icon: Icon,
  iconPosition = "left",
  iconClassName,
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      className={cn(
        "flex-row h-14 items-center justify-center rounded-2xl active:opacity-80 gap-2",
        className,
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-50",
      )}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === "left" && (
        <Icon
          size={18}
          color={"#FFFFFF"}
          className={cn("mr-2", iconClassName)}
        />
      )}
      <Text
        className={cn(
          "font-medium text-center",
          textVariantStyles[variant],
          textSizeStyles[size],
          textClassName,
        )}
      >
        {title}
      </Text>
      {Icon && iconPosition === "right" && (
        <Icon
          size={18}
          color={"#FFFFFF"}
          className={cn("ml-2", iconClassName)}
        />
      )}
    </Pressable>
  );
};
