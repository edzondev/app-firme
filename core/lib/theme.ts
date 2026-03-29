import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";

export const THEME = {
  light: {
    background: "hsl(0 0% 96%)",
    foreground: "hsl(0 0% 53%)",
    card: "hsl(0 0% 100%)",
    primary: "hsl(248.37, 71.27%, 64.51%)",
    primaryForeground: "hsl(0 0% 100%)",
    secondary: "hsl(173 100% 44%)",
    secondaryForeground: "hsl(0 0% 5%)",
    destructive: "hsl(15 68% 52%)",
    sos: "hsl(15, 64%, 50%)",
    border: "hsl(60 4.17% 90.59%)",
    input: "hsl(60 4.17% 90.59%)",
    ring: "hsl(0 0% 63%)",
  },
  dark: {
    background: "hsl(220 14% 12%)",
    foreground: "hsl(0 0% 83%)",
    card: "hsl(0 0% 10%)",
    primary: "hsl(257 100% 48%)",
    primaryForeground: "hsl(0 0% 100%)",
    secondary: "hsl(173 100% 44%)",
    secondaryForeground: "hsl(0 0% 5%)",
    destructive: "hsl(15 68% 52%)",
    border: "hsl(60 4.17% 90.59%)",
    input: "hsl(60 4.17% 90.59%)",
    ring: "hsl(0 0% 63%)",
  },
};

export const NAV_THEME: Record<"light" | "dark", Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};
