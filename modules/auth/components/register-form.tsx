import { Button } from "@/core/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/core/components/ui/field";
import { Input } from "@/core/components/ui/input";
import { Eye, EyeOff } from "lucide-react-native";
import { Controller } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import useRegister from "../hooks/use-register";

export default function RegisterForm() {
  const {
    form,
    onSubmit,
    isLoading,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
  } = useRegister();

  return (
    <>
      <FieldGroup>
        <Controller
          control={form.control}
          name="fullName"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel id={field.name}>Nombre completo</FieldLabel>
              <Input
                {...field}
                id={field.name}
                readOnly={isLoading}
                error={fieldState.invalid}
                placeholder="Juan Pérez"
                autoCapitalize="words"
                value={field.value}
                onChangeText={field.onChange}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel id={field.name}>Correo electrónico</FieldLabel>
              <Input
                {...field}
                id={field.name}
                readOnly={isLoading}
                error={fieldState.invalid}
                placeholder="tucorreo@ejemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={field.value}
                onChangeText={field.onChange}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel id={field.name}>Contraseña</FieldLabel>
              <View className="relative">
                <Input
                  {...field}
                  id={field.name}
                  readOnly={isLoading}
                  error={fieldState.invalid}
                  placeholder="••••••••"
                  secureTextEntry={!showPassword}
                  className="pr-12"
                  value={field.value}
                  onChangeText={field.onChange}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <Pressable
                  className="absolute right-3 top-3"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#94a3b8" />
                  ) : (
                    <Eye size={20} color="#94a3b8" />
                  )}
                </Pressable>
              </View>
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel id={field.name}>Confirmar contraseña</FieldLabel>
              <View className="relative">
                <Input
                  {...field}
                  id={field.name}
                  readOnly={isLoading}
                  error={fieldState.invalid}
                  placeholder="••••••••"
                  secureTextEntry={!showConfirmPassword}
                  className="pr-12"
                  value={field.value}
                  onChangeText={field.onChange}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <Pressable
                  className="absolute right-3 top-3"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color="#94a3b8" />
                  ) : (
                    <Eye size={20} color="#94a3b8" />
                  )}
                </Pressable>
              </View>
            </Field>
          )}
        />
      </FieldGroup>

      {error && (
        <View className="bg-destructive/5 p-4 rounded-lg border border-destructive mt-6">
          <Text className="text-base text-red-500">{error}</Text>
        </View>
      )}

      <View className="mt-8">
        <Button
          title={isLoading ? "Creando cuenta..." : "Crear cuenta"}
          size="lg"
          disabled={isLoading}
          onPress={form.handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
}
