import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import MainLayout from "@/core/layouts/main-layout";
import { useAuth } from "../hooks/use-auth";
import {
  loginSchema,
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
} from "../schemas/auth.schema";

type AuthTab = "login" | "register";

export default function AuthScreen() {
  const [tab, setTab] = useState<AuthTab>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const { loginWithEmail, registerWithEmail } = useAuth();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const isLogin = tab === "login";

  const handleTabChange = (newTab: AuthTab) => {
    setTab(newTab);
    setAuthError(null);
  };

  const onSubmitLogin = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setAuthError(null);
      await loginWithEmail(data.email, data.password);
    } catch (e: any) {
      const msg =
        e?.code === "auth/invalid-credential"
          ? "Correo o contraseña incorrectos"
          : (e?.message ?? "Error al iniciar sesión");
      setAuthError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitRegister = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setAuthError(null);
      const result = await registerWithEmail(data.email, data.password);
      console.log("Registro exitoso:", result);
    } catch (e: any) {
      const msg =
        e?.code === "auth/email-already-in-use"
          ? "Este correo ya está registrado"
          : (e?.message ?? "Error al crear la cuenta");
      setAuthError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-12 pb-10">
            {/* ── Wordmark ── */}
            <View className="mb-10">
              <View className="flex-row items-baseline">
                <Text
                  className="text-5xl font-black tracking-tight text-primary"
                  style={{ letterSpacing: -2 }}
                >
                  firme
                </Text>
                <View className="ml-2 mb-1 h-2 w-2 rounded-full bg-accent" />
              </View>
              <Text className="mt-1.5 text-sm text-text-secondary tracking-wide">
                Tu espacio de confianza
              </Text>
            </View>

            {/* ── Tab switcher ── */}
            <View className="flex-row bg-secondary rounded-2xl p-1 mb-8">
              <Pressable
                onPress={() => handleTabChange("login")}
                className={`flex-1 py-3 rounded-xl items-center justify-center ${
                  isLogin ? "bg-card" : ""
                }`}
                style={
                  isLogin
                    ? {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.06,
                        shadowRadius: 4,
                        elevation: 2,
                      }
                    : undefined
                }
              >
                <Text
                  className={`text-sm font-semibold ${
                    isLogin ? "text-text-primary" : "text-text-secondary"
                  }`}
                >
                  Ingresar
                </Text>
              </Pressable>

              <Pressable
                onPress={() => handleTabChange("register")}
                className={`flex-1 py-3 rounded-xl items-center justify-center ${
                  !isLogin ? "bg-card" : ""
                }`}
                style={
                  !isLogin
                    ? {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.06,
                        shadowRadius: 4,
                        elevation: 2,
                      }
                    : undefined
                }
              >
                <Text
                  className={`text-sm font-semibold ${
                    !isLogin ? "text-text-primary" : "text-text-secondary"
                  }`}
                >
                  Crear cuenta
                </Text>
              </Pressable>
            </View>

            {/* ── Heading ── */}
            <View className="mb-7">
              <Text
                className="text-3xl font-bold text-text-primary"
                style={{ letterSpacing: -0.5, lineHeight: 36 }}
              >
                {isLogin ? "Bienvenido\nde vuelta" : "Crea tu\ncuenta"}
              </Text>
              <Text className="mt-2.5 text-sm text-text-secondary leading-5">
                {isLogin
                  ? "Ingresa tus datos para continuar"
                  : "Completa el formulario para comenzar"}
              </Text>
            </View>

            {/* ── Fields ── */}
            <View className="gap-y-5">
              {isLogin ? (
                <>
                  {/* Email — Login */}
                  <View>
                    <Text className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                      Correo electrónico
                    </Text>
                    <Controller
                      control={loginForm.control}
                      name="email"
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <View
                            className={`flex-row items-center bg-card rounded-xl px-4 h-14 border ${
                              error ? "border-destructive" : "border-border"
                            }`}
                          >
                            <TextInput
                              className="flex-1 text-text-primary text-base"
                              placeholder="hola@ejemplo.com"
                              placeholderTextColor="hsl(0, 0%, 65%)"
                              keyboardType="email-address"
                              autoCapitalize="none"
                              autoCorrect={false}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          </View>
                          {error && (
                            <Text className="mt-1.5 text-xs text-destructive">
                              {error.message}
                            </Text>
                          )}
                        </>
                      )}
                    />
                  </View>

                  {/* Password — Login */}
                  <View>
                    <Text className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                      Contraseña
                    </Text>
                    <Controller
                      control={loginForm.control}
                      name="password"
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <View
                            className={`flex-row items-center bg-card rounded-xl px-4 h-14 border ${
                              error ? "border-destructive" : "border-border"
                            }`}
                          >
                            <TextInput
                              className="flex-1 text-text-primary text-base"
                              placeholder="••••••••"
                              placeholderTextColor="hsl(0, 0%, 65%)"
                              secureTextEntry={!showPassword}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                            <Pressable
                              onPress={() => setShowPassword((v) => !v)}
                              hitSlop={8}
                            >
                              {showPassword ? (
                                <EyeOff
                                  size={18}
                                  color="hsl(0, 0%, 55%)"
                                  strokeWidth={1.8}
                                />
                              ) : (
                                <Eye
                                  size={18}
                                  color="hsl(0, 0%, 55%)"
                                  strokeWidth={1.8}
                                />
                              )}
                            </Pressable>
                          </View>
                          {error && (
                            <Text className="mt-1.5 text-xs text-destructive">
                              {error.message}
                            </Text>
                          )}
                        </>
                      )}
                    />
                  </View>

                  {/* Forgot password */}
                  <View className="items-end -mt-1">
                    <Pressable hitSlop={8}>
                      <Text className="text-sm font-medium text-accent">
                        ¿Olvidaste tu contraseña?
                      </Text>
                    </Pressable>
                  </View>
                </>
              ) : (
                <>
                  {/* Email — Register */}
                  <View>
                    <Text className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                      Correo electrónico
                    </Text>
                    <Controller
                      key="form-register-email"
                      control={registerForm.control}
                      name="email"
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <View
                            className={`flex-row items-center bg-card rounded-xl px-4 h-14 border ${
                              error ? "border-destructive" : "border-border"
                            }`}
                          >
                            <TextInput
                              className="flex-1 text-text-primary text-base"
                              placeholder="hola@ejemplo.com"
                              placeholderTextColor="hsl(0, 0%, 65%)"
                              keyboardType="email-address"
                              autoCapitalize="none"
                              autoCorrect={false}
                              {...field}
                              value={field.value}
                              onChangeText={field.onChange}
                              onBlur={field.onBlur}
                            />
                          </View>
                          {error && (
                            <Text className="mt-1.5 text-xs text-destructive">
                              {error.message}
                            </Text>
                          )}
                        </>
                      )}
                    />
                  </View>

                  {/* Password — Register */}
                  <View>
                    <Text className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                      Contraseña
                    </Text>
                    <Controller
                      key="form-register-password"
                      control={registerForm.control}
                      name="password"
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <View
                            className={`flex-row items-center bg-card rounded-xl px-4 h-14 border ${
                              error ? "border-destructive" : "border-border"
                            }`}
                          >
                            <TextInput
                              className="flex-1 text-text-primary text-base"
                              placeholder="••••••••"
                              placeholderTextColor="hsl(0, 0%, 65%)"
                              secureTextEntry={!showPassword}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                            <Pressable
                              onPress={() => setShowPassword((v) => !v)}
                              hitSlop={8}
                            >
                              {showPassword ? (
                                <EyeOff
                                  size={18}
                                  color="hsl(0, 0%, 55%)"
                                  strokeWidth={1.8}
                                />
                              ) : (
                                <Eye
                                  size={18}
                                  color="hsl(0, 0%, 55%)"
                                  strokeWidth={1.8}
                                />
                              )}
                            </Pressable>
                          </View>
                          {error && (
                            <Text className="mt-1.5 text-xs text-destructive">
                              {error.message}
                            </Text>
                          )}
                        </>
                      )}
                    />
                  </View>

                  {/* Confirm password — Register */}
                  <View>
                    <Text className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
                      Confirmar contraseña
                    </Text>
                    <Controller
                      key="form-register-confirmPassword"
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <View
                            className={`flex-row items-center bg-card rounded-xl px-4 h-14 border ${
                              error ? "border-destructive" : "border-border"
                            }`}
                          >
                            <TextInput
                              className="flex-1 text-text-primary text-base"
                              placeholder="••••••••"
                              placeholderTextColor="hsl(0, 0%, 65%)"
                              secureTextEntry={!showConfirmPassword}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                            <Pressable
                              onPress={() => setShowConfirmPassword((v) => !v)}
                              hitSlop={8}
                            >
                              {showConfirmPassword ? (
                                <EyeOff
                                  size={18}
                                  color="hsl(0, 0%, 55%)"
                                  strokeWidth={1.8}
                                />
                              ) : (
                                <Eye
                                  size={18}
                                  color="hsl(0, 0%, 55%)"
                                  strokeWidth={1.8}
                                />
                              )}
                            </Pressable>
                          </View>
                          {error && (
                            <Text className="mt-1.5 text-xs text-destructive">
                              {error.message}
                            </Text>
                          )}
                        </>
                      )}
                    />
                  </View>
                </>
              )}

              {/* ── Auth error ── */}
              {authError && (
                <View
                  className="rounded-xl px-4 py-3.5 border border-destructive/20"
                  style={{ backgroundColor: "hsl(15, 68%, 97%)" }}
                >
                  <Text className="text-sm text-destructive leading-5">
                    {authError}
                  </Text>
                </View>
              )}

              {/* ── Submit button ── */}
              <Pressable
                onPress={
                  isLogin
                    ? loginForm.handleSubmit(onSubmitLogin)
                    : registerForm.handleSubmit(onSubmitRegister)
                }
                disabled={isLoading}
                className="mt-1 bg-primary h-14 rounded-2xl text-center w-full items-center justify-center"
                style={({ pressed }) => ({
                  opacity: isLoading ? 0.65 : pressed ? 0.88 : 1,
                  height: 56,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 4,
                })}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white text-base font-semibold tracking-wider">
                    {isLogin ? "Ingresar" : "Crear cuenta"}
                  </Text>
                )}
              </Pressable>
            </View>

            {/* ── Separator ── */}
            <View className="flex-row items-center mt-8 mb-6">
              <View className="flex-1 h-px bg-border" />
              <Text className="mx-4 text-xs text-text-secondary tracking-wider">
                o continúa con
              </Text>
              <View className="flex-1 h-px bg-border" />
            </View>

            {/* ── Social placeholder ── */}
            <Pressable
              className="h-14 bg-card border border-border rounded-2xl flex-row items-center justify-center"
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <Text className="text-text-primary text-sm font-medium">
                Continuar con Google
              </Text>
            </Pressable>

            {/* ── Footer ── */}
            <View className="mt-5 pt-8 items-center">
              <Text className="text-xs text-text-secondary text-center leading-5">
                Al continuar aceptas los{" "}
                <Text className="text-accent font-medium">
                  términos de servicio
                </Text>{" "}
                y la{" "}
                <Text className="text-accent font-medium">
                  política de privacidad
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </MainLayout>
  );
}
