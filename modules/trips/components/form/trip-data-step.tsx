import { Field, FieldError, FieldLabel } from "@/core/components/ui/field";
import { Input } from "@/core/components/ui/input";
import { AnimatedToggle } from "@/modules/safe-travel/components/animated-toggle";
import { ChevronDown, Lock, MapPin, Mic } from "lucide-react-native";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SosSchemaOutput } from "../../schemas/sos.schema";

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

export default function TripDataStep() {
  const [colorOpen, setColorOpen] = useState(false);
  const { control, getValues, setValue } = useFormContext<SosSchemaOutput>();

  const selectedColor = VEHICLE_COLORS.find(
    (c) => c.id === getValues("carColor"),
  );

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 32,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 gap-8">
        <Controller
          control={control}
          name="driverName"
          render={({ fieldState, field }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel id={field.name}>Nombre del conductor</FieldLabel>
              <Input
                {...field}
                id={field.name}
                error={fieldState.invalid}
                placeholder="Ingresa el nombre del conductor"
                value={field.value}
                onChangeText={field.onChange}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="driverPlate"
          render={({ fieldState, field }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel id={field.name}>Placa del vehículo</FieldLabel>
              <Input
                {...field}
                id={field.name}
                error={fieldState.invalid}
                placeholder="Ingresa la placa del vehículo"
                value={field.value}
                onChangeText={field.onChange}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="carColor"
          render={({ fieldState, field }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel id={field.name}>Color del vehículo</FieldLabel>
              <Pressable onPress={() => setColorOpen((prev) => !prev)}>
                <View
                  className="h-12 bg-white border border-border rounded-xl px-3.5 flex-row items-center shadow-black shadow-sm"
                  style={{
                    elevation: 1,
                  }}
                >
                  {selectedColor ? (
                    <View className="flex-row items-center flex-1 gap-2.5">
                      <View
                        className="w-[18px] h-[18px] rounded-full border"
                        style={{
                          backgroundColor: selectedColor.hex,
                          borderColor:
                            selectedColor.border ?? selectedColor.hex,
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
                    style={{
                      transform: [{ rotate: colorOpen ? "180deg" : "0deg" }],
                    }}
                  />
                </View>
              </Pressable>

              {/* Color picker list */}
              {colorOpen && (
                <View className="flex-row flex-wrap gap-2.5 pt-3 pb-1">
                  {VEHICLE_COLORS.map((color) => (
                    <Pressable
                      key={color.id}
                      className="items-center gap-1 w-[58px]"
                      onPress={() => {
                        setValue("carColor", color.id, { shouldDirty: true });
                        setColorOpen(false);
                      }}
                    >
                      <View
                        className="w-[34px] h-[34px] rounded-full"
                        style={{
                          backgroundColor: color.hex,
                          borderWidth: selectedColor?.id === color.id ? 2.5 : 1,
                          borderColor:
                            selectedColor?.id === color.id
                              ? "#107359"
                              : (color.border ?? color.hex),
                        }}
                      />
                      <Text className="text-base text-text-secondary">
                        {color.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <View className="h-px bg-border my-4" />

        <View className="gap-4">
          <Controller
            control={control}
            name="enabledAudio"
            render={({ fieldState, field }) => (
              <Field>
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
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </View>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="enableSharedDirection"
            render={({ fieldState, field }) => (
              <Field>
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
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </View>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}
