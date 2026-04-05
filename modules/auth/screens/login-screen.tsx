import { Button } from "@/core/components/ui/button";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import LoginForm from "../components/login-form";

export default function LoginScreen() {
  return (
    <View className="flex-1 justify-center px-6 pt-14 pb-8">
      <Text className="text-4xl font-bold text-slate-900 mb-8">
        Inicia sesión en{"\n"}tu cuenta
      </Text>

      <LoginForm />

      <View className="flex-row items-center my-6">
        <View className="flex-1 h-[1px] bg-slate-200" />
        <Text className="mx-4 text-sm text-slate-400">o inicia sesión con</Text>
        <View className="flex-1 h-[1px] bg-slate-200" />
      </View>

      <View className="gap-3">
        <Button title="Iniciar sesión con Google" variant="outline" />
      </View>

      <View className="flex-row justify-center mt-6">
        <Text className="text-sm text-slate-500">¿No tienes cuenta? </Text>
        <Link href="/(auth)/register">
          <Text className="text-sm text-slate-900 font-semibold">Regístrate</Text>
        </Link>
      </View>
    </View>
  );
}
