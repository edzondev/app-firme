import { DefaultTheme, type Theme } from '@react-navigation/native';

export const THEME = {
  light: {
    background: 'hsl(60, 12.5%, 96.86%)',
    foreground: 'hsl(0 0% 3.9%)',
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(0 0% 3.9%)',
    primary: 'hsl(164.84, 76%, 24.51%)',
    primaryForeground: 'hsl(160.93, 68.98%, 36.67%)',
    textPrimary: 'hsl(0, 0%, 10.2%)',
    textSecondary: 'hsl(0, 0%, 41.96%)',
    secondary: 'hsl(0 0% 96.1%)',
    secondaryForeground: 'hsl(0 0% 9%)',
    muted: 'hsl(0 0% 96.1%)',
    mutedForeground: 'hsl(0 0% 45.1%)',
    accent: 'hsl(34.6, 77.99%, 40.98%)',
    accentForeground: 'hsl(0 0% 9%)',
    destructive: 'hsl(15, 68.29%, 51.76%)',
    border: 'hsl(60, 4.17%, 90.59%)',
    input: 'hsl(60, 4.17%, 90.59%)',
    ring: 'hsl(0 0% 63%)',
    radius: '0.625rem',
  },
};

export const NAV_THEME: Record<'light', Theme> = {
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
};
