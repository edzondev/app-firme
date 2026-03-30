import { cn } from "@/core/lib/utils";
import { MapPin, Users } from "lucide-react-native";
import { useFormContext } from "react-hook-form";
import { Text, View } from "react-native";

export function TripConfirmStep() {
  const { getValues } = useFormContext();

  return (
    <>
      <View
        className="bg-white rounded-2xl overflow-hidden shadow-gray-300 shadow-sm flex-col p-2"
        style={{
          elevation: 2,
        }}
      >
        <SummaryRow label="Aplicación" value={getValues("appName")} />
        <View className="h-px mx-4 bg-border/50" />
        <SummaryRow label="Placa del auto" value={getValues("driverPlate")} />
        <View className="h-px mx-4 bg-border/50" />
        <SummaryRow label="Conductor" value={getValues("driverName")} />
        {getValues("carColor") && (
          <>
            <View className="h-px mx-4 bg-border/50" />
            <SummaryRow
              label="Color del vehículo"
              value={getValues("carColor")}
            />
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
      <Text className="text-xs text-secondary-foreground text-center mt-4 leading-5">
        Puedes terminar el viaje en cualquier momento
      </Text>
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center px-4 py-5">
      <Text className="text-sm text-secondary-foreground flex-1">{label}</Text>
      <Text
        className="text-sm font-medium text-secondary-foreground capitalize"
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
