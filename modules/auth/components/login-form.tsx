import { Controller } from "react-hook-form";
import useLogin from "../hooks/use-login";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/core/components/ui/field";
import { Input } from "@/core/components/ui/input";
import { Pressable, Text, View } from "react-native";
import { Button } from "@/core/components/ui/button";
import { Eye, EyeOff } from "lucide-react-native";

export default function LoginForm() {
  const {
    form,
    onSubmit,
    isLoading,
    rememberMe,
    setRememberMe,
    setShowPassword,
    showPassword,
    error,
  } = useLogin();

  return (
    <>
      {/* Form */}
      <FieldGroup>
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

        {/* Remember me + Forgot password */}
        <View className="flex-row items-center justify-between">
          <Pressable
            className="flex-row items-center gap-2"
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View
              className={`w-5 h-5 rounded border items-center justify-center ${
                rememberMe
                  ? "bg-primary border-primary"
                  : "border-slate-300 bg-white"
              }`}
            >
              {rememberMe && <Text className="text-white text-xs">✓</Text>}
            </View>
            <Text className="text-sm text-slate-600">Recuérdame</Text>
          </Pressable>
          <Pressable>
            <Text className="text-sm font-medium text-primary">
              ¿Olvidaste tu contraseña?
            </Text>
          </Pressable>
        </View>
      </FieldGroup>

      {error && (
        <View className="bg bg-destructive/5 p-4 rounded-lg border border-destructive mt-6 ">
          <Text className="text-base text-red-500">{error}</Text>
        </View>
      )}

      {/* Continue button */}
      <View className="mt-8">
        <Button
          title={isLoading ? "Cargando..." : "Continuar"}
          size="lg"
          disabled={isLoading}
          className="rounded-full"
          onPress={() => onSubmit(form.getValues())}
        />
      </View>
    </>
  );
}
