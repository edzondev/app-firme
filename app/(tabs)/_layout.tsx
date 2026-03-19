import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Clock, Home, Shield, User } from "lucide-react-native";
import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
  Icon: ComponentType<SvgProps & { color?: string }>;
}

export function TabBarIcon({ color, size, Icon }: TabBarIconProps) {
  return <Icon width={size} height={size} stroke={color} fill="none" />;
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: insets.bottom + 60,
          paddingTop: 10,
          //backgroundColor: COLORS.neutral.white,
        },
        // tabBarActiveTintColor: COLORS.primary.default,
        tabBarInactiveTintColor: "#9ca3af",
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              size={size}
              Icon={Home}
            />
          ),
          animation: "fade",
        }}
      />
      <Tabs.Screen
        name="travels"
        options={{
          title: "Viajes",
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              size={size}
              Icon={Clock}
            />
          ),
          animation: "fade",
        }}
      />
      <Tabs.Screen
        name="sos"
        options={{
          title: "SOS",
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              size={size}
              Icon={Shield}
            />
          ),
          animation: "fade",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              size={size}
              Icon={User}
            />
          ),
          animation: "fade",
        }}
      />
    </Tabs>
  );
}
