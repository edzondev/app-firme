import { Car } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export type AppId =
  | "indrive"
  | "uber"
  | "didi"
  | "yango"
  | "cabify"
  | "otro";

const APPS: { id: AppId; name: string; color: string }[] = [
  { id: "indrive", name: "inDrive", color: "#2BC44F" },
  { id: "uber", name: "Uber", color: "#000000" },
  { id: "didi", name: "DiDi", color: "#FF7A28" },
  { id: "yango", name: "Yango", color: "#FF3E3E" },
  { id: "cabify", name: "Cabify", color: "#7B61FF" },
  { id: "otro", name: "Otro", color: "#9CA3AF" },
];

type Props = {
  selected: AppId | null;
  onSelect: (id: AppId) => void;
  onContinue: () => void;
};

export function AppSelectorStep({ selected, onSelect, onContinue }: Props) {
  return (
    <View className="flex-1 px-6">
      <View className="mt-7 mb-8">
        <Text
          className="text-2xl font-bold text-text-primary"
          style={{ letterSpacing: -0.4 }}
        >
          ¿Qué app estás usando?
        </Text>
        <Text className="text-sm text-text-secondary mt-1.5 leading-5">
          Selecciona la app en la que pediste tu taxi
        </Text>
      </View>

      <View className="gap-3">
        <View className="flex-row gap-3">
          {APPS.slice(0, 3).map((app) => (
            <AppCard
              key={app.id}
              app={app}
              selected={selected === app.id}
              onSelect={() => onSelect(app.id)}
            />
          ))}
        </View>
        <View className="flex-row gap-3">
          {APPS.slice(3, 6).map((app) => (
            <AppCard
              key={app.id}
              app={app}
              selected={selected === app.id}
              onSelect={() => onSelect(app.id)}
            />
          ))}
        </View>
      </View>

      <View className="flex-1" />

      <Pressable
        onPress={onContinue}
        disabled={!selected}
        style={{ opacity: selected ? 1 : 0.45 }}
        className="mb-4"
      >
        <View
          className="h-14 rounded-2xl items-center justify-center"
          style={{ backgroundColor: "#107359" }}
        >
          <Text className="text-white font-semibold text-base">Continuar</Text>
        </View>
      </Pressable>
    </View>
  );
}

function AppCard({
  app,
  selected,
  onSelect,
}: {
  app: (typeof APPS)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Pressable onPress={onSelect} className="flex-1">
      <View
        style={{
          borderWidth: 2,
          borderRadius: 16,
          borderColor: selected ? "#107359" : "transparent",
          backgroundColor: "white",
          paddingVertical: 14,
          alignItems: "center",
          gap: 8,
        }}
      >
        <View
          style={{
            backgroundColor: `${app.color}18`,
            borderRadius: 12,
            padding: 10,
          }}
        >
          <Car size={22} color={app.color} />
        </View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: "#1A1A1A",
            textAlign: "center",
          }}
        >
          {app.name}
        </Text>
      </View>
    </Pressable>
  );
}
