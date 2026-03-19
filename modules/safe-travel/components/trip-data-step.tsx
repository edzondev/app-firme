import { Car, ChevronDown, Lock, MapPin, Mic } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { AnimatedToggle } from "./animated-toggle";

const VEHICLE_COLORS = [
  { id: "blanco", name: "Blanco", hex: "#F8F8F8", border: "#E5E5E5" },
  { id: "negro", name: "Negro", hex: "#1A1A1A" },
  { id: "gris", name: "Gris", hex: "#8C8C8C" },
  { id: "rojo", name: "Rojo", hex: "#EF4444" },
  { id: "azul", name: "Azul", hex: "#3B82F6" },
  { id: "plateado", name: "Plateado", hex: "#CBD5E1", border: "#B0BAC7" },
  { id: "amarillo", name: "Amarillo", hex: "#EAB308" },
  { id: "verde", name: "Verde", hex: "#22C55E" },
];

export type TripData = {
  plate: string;
  driverName: string;
  vehicleColor: string | null;
  audioEnabled: boolean;
  locationEnabled: boolean;
};

type Props = {
  data: TripData;
  onChange: (updates: Partial<TripData>) => void;
  onContinue: () => void;
  onBack: () => void;
};

export function TripDataStep({ data, onChange, onContinue, onBack }: Props) {
  const [colorOpen, setColorOpen] = useState(false);

  const selectedColor = VEHICLE_COLORS.find((c) => c.id === data.vehicleColor);

  return (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 28,
          paddingBottom: 16,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        nestedScrollEnabled={true}
      >
        <Text
          className="text-2xl font-bold text-text-primary"
          style={{ letterSpacing: -0.4 }}
        >
          Datos del viaje
        </Text>
        <Text className="text-sm text-text-secondary mt-1.5 mb-7 leading-5">
          Mientras más info ingreses, más segura estarás
        </Text>

        {/* Plate */}
        <Text className="text-sm font-medium text-text-primary mb-2">
          Placa del vehículo
        </Text>
        <View className="flex-row items-center bg-white border border-border rounded-xl px-3 mb-5 shadow-sm shadow-black/5">
          <Car size={16} color="#9CA3AF" />
          <TextInput
            value={data.plate}
            onChangeText={(t) => onChange({ plate: t.toUpperCase() })}
            placeholder="ABC-123"
            placeholderTextColor="#BCBCBC"
            autoCapitalize="characters"
            className="flex-1 h-12 ml-2.5 text-[15px] text-text-primary"
          />
        </View>

        {/* Driver name */}
        <View className="flex-row items-center mb-2">
          <Text className="text-sm font-medium text-text-primary flex-1">
            Nombre del conductor
          </Text>
          <View className="bg-secondary px-2 py-0.5 rounded">
            <Text className="text-xs text-text-secondary font-medium">
              Opcional
            </Text>
          </View>
        </View>
        <TextInput
          value={data.driverName}
          onChangeText={(t) => onChange({ driverName: t })}
          placeholder="Juan Pérez"
          placeholderTextColor="#BCBCBC"
          className="h-12 bg-white border border-border rounded-xl px-3.5 text-[15px] text-text-primary mb-5"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 2,
            elevation: 1,
          }}
        />

        {/* Vehicle color */}
        <View className="flex-row items-center mb-2">
          <Text className="text-sm font-medium text-text-primary flex-1">
            Color del vehículo
          </Text>
          <View className="bg-secondary px-2 py-0.5 rounded">
            <Text className="text-xs text-text-secondary font-medium">
              Opcional
            </Text>
          </View>
        </View>
        <Pressable onPress={() => setColorOpen((prev) => !prev)}>
          <View
            className="h-12 bg-white border border-border rounded-xl px-3.5 flex-row items-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 2,
              elevation: 1,
            }}
          >
            {selectedColor ? (
              <View className="flex-row items-center flex-1 gap-2.5">
                <View
                  className="w-[18px] h-[18px] rounded-full border"
                  style={{
                    backgroundColor: selectedColor.hex,
                    borderColor: selectedColor.border ?? selectedColor.hex,
                  }}
                />
                <Text className="text-[15px] text-text-primary flex-1">
                  {selectedColor.name}
                </Text>
              </View>
            ) : (
              <Text className="text-[15px] text-[#BCBCBC] flex-1">
                Seleccionar color
              </Text>
            )}
            <ChevronDown
              size={18}
              color="#9CA3AF"
              style={{ transform: [{ rotate: colorOpen ? "180deg" : "0deg" }] }}
            />
          </View>
        </Pressable>

        {/* Color picker list */}
        {colorOpen && (
          <View className="flex-row flex-wrap gap-2.5 pt-3 pb-1">
            {VEHICLE_COLORS.map((color) => (
              <Pressable
                key={color.id}
                onPress={() => {
                  onChange({ vehicleColor: color.id });
                  setColorOpen(false);
                }}
                className="items-center gap-1 w-[58px]"
              >
                <View
                  className="w-[34px] h-[34px] rounded-full"
                  style={{
                    backgroundColor: color.hex,
                    borderWidth: data.vehicleColor === color.id ? 2.5 : 1,
                    borderColor:
                      data.vehicleColor === color.id
                        ? "#107359"
                        : (color.border ?? color.hex),
                  }}
                />
                <Text className="text-[11px] text-text-secondary">
                  {color.name}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Divider */}
        <View className="h-px bg-border my-5" />

        {/* Audio recording toggle */}
        <View className="flex-row items-center gap-3 mb-5">
          <View className="w-8 h-8 rounded-full items-center justify-center bg-[#F3F4F6]">
            <Mic size={16} color="#6B7280" />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center gap-1.5">
              <Text className="text-sm font-medium text-text-primary shrink">
                Grabación de audio
              </Text>
              <View className="flex-row items-center gap-1 px-1.5 py-0.5 rounded bg-[#F0FBF7]">
                <Lock size={10} color="#107359" />
                <Text className="text-[10px] text-primary font-semibold">
                  Premium
                </Text>
              </View>
            </View>
          </View>
          <AnimatedToggle
            value={data.audioEnabled}
            onValueChange={(v) => onChange({ audioEnabled: v })}
          />
        </View>

        {/* Location sharing toggle */}
        <View className="flex-row items-center gap-3">
          <View className="w-8 h-8 rounded-full items-center justify-center bg-[#F0FBF7]">
            <MapPin size={16} color="#107359" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-medium text-text-primary">
              Compartir ubicación
            </Text>
            <Text className="text-xs text-text-secondary mt-0.5">
              Con tus contactos de emergencia
            </Text>
          </View>
          <AnimatedToggle
            value={data.locationEnabled}
            onValueChange={(v) => onChange({ locationEnabled: v })}
          />
        </View>
      </ScrollView>

      {/* Sticky continue button */}
      <View className="px-6 pb-4 pt-2 flex-row gap-3">
        <Pressable onPress={onBack} className="flex-1">
          <View className="h-14 rounded-2xl items-center justify-center bg-white border border-border">
            <Text className="text-primary font-semibold text-base">Volver</Text>
          </View>
        </Pressable>
        <Pressable onPress={onContinue} className="flex-1">
          <View className="h-14 rounded-2xl items-center justify-center bg-primary">
            <Text className="text-white font-semibold text-base">
              Continuar
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
