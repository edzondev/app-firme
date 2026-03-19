import { cn } from "@/core/lib/utils";
import { MapPin, Shield, Users } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import type { AppId } from "./app-selector-step";
import type { TripData } from "./trip-data-step";

const APP_NAMES: Record<AppId, string> = {
  indrive: "inDrive",
  uber: "Uber",
  didi: "DiDi",
  yango: "Yango",
  cabify: "Cabify",
  otro: "Otro",
};

const VEHICLE_COLOR_NAMES: Record<string, string> = {
  blanco: "Blanco",
  negro: "Negro",
  gris: "Gris",
  rojo: "Rojo",
  azul: "Azul",
  plateado: "Plateado",
  amarillo: "Amarillo",
  verde: "Verde",
};

type Props = {
  selectedApp: AppId | null;
  data: TripData;
  onActivate: () => void;
  onBack: () => void;
};

export function TripConfirmStep({
  selectedApp,
  data,
  onActivate,
  onBack,
}: Props) {
  const appName = selectedApp ? APP_NAMES[selectedApp] : "—";
  const plateDisplay = data.plate.trim() || "—";
  const driverDisplay = data.driverName.trim() || "No especificado";
  const colorDisplay = data.vehicleColor
    ? (VEHICLE_COLOR_NAMES[data.vehicleColor] ?? "—")
    : "—";

  return (
    <View className="flex-1 px-6">
      <View className="mt-7 mb-7">
        <Text
          className="text-2xl font-bold text-text-primary"
          style={{ letterSpacing: -0.4 }}
        >
          Confirma tu viaje
        </Text>
        <Text className="text-sm text-text-secondary mt-1.5 leading-5">
          Revisa los datos antes de activar tu protección
        </Text>
      </View>

      {/* Summary card */}
      <View
        className="bg-white rounded-2xl overflow-hidden"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <SummaryRow label="App" value={appName} />
        <View className="h-px mx-4 bg-border" />
        <SummaryRow label="Placa" value={plateDisplay} />
        <View className="h-px mx-4 bg-border" />
        <SummaryRow label="Conductor" value={driverDisplay} />
        {data.vehicleColor && (
          <>
            <View className="h-px mx-4 bg-border" />
            <SummaryRow label="Color" value={colorDisplay} />
          </>
        )}

        {/* Badges */}
        <View className="flex-row gap-2 px-4 pb-4 pt-3">
          <StatusBadge
            icon={<MapPin size={12} color="#EF4444" />}
            label="GPS activo"
            bgColor="#FEF2F2"
            textColor="#B91C1C"
          />
          <StatusBadge
            icon={<Users size={12} color="#7B61FF" />}
            label="3 contactos"
            bgColor="#F5F3FF"
            textColor="#6D28D9"
          />
        </View>
      </View>

      {/* Note */}
      <Text className="text-xs text-text-secondary text-center mt-4 leading-5">
        Puedes terminar el viaje en cualquier momento
      </Text>

      <View className="flex-1" />

      {/* Activate button */}
      <View className="pb-4 flex-row items-stretch gap-3">
        <Pressable onPress={onBack} className="flex-1">
          <View className="w-full h-14 rounded-2xl items-center justify-center flex-row gap-2 bg-white border border-border">
            <Text className="text-primary font-semibold text-base">Volver</Text>
          </View>
        </Pressable>
        <Pressable onPress={onActivate} className="flex-1">
          <View className="w-full h-14 rounded-2xl items-center justify-center flex-row gap-2 bg-primary">
            <Shield size={18} color="white" />
            <Text
              className="text-white font-semibold text-base"
              numberOfLines={1}
            >
              Activar protección
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center px-4 py-3.5">
      <Text className="text-sm text-text-secondary flex-1">{label}</Text>
      <Text
        className="text-sm font-medium text-text-primary"
        style={{ maxWidth: "65%" }}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

function StatusBadge({
  icon,
  label,
  bgColor,
  textColor,
}: {
  icon: React.ReactNode;
  label: string;
  bgColor: string;
  textColor: string;
}) {
  return (
    <View
      className="flex-row items-center gap-1.5 px-2.5 py-1.5 rounded-full"
      style={{ backgroundColor: bgColor }}
    >
      {icon}
      <Text className={cn("text-sm font-medium", textColor)}>{label}</Text>
    </View>
  );
}
