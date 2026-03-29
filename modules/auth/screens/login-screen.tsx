import { Text, View } from "react-native";
import { Button } from "@/core/components/ui/button";
import LoginForm from "../components/login-form";

export default function LoginScreen() {
  return (
    <View className="flex-1 justify-center px-6 pt-14 pb-8">
      {/* Title */}
      <Text className="text-4xl font-bold text-slate-900 mb-8">
        Inicia sesión en{"\n"}tu cuenta
      </Text>

      {/* Form */}
      <LoginForm />
      {/* Divider */}
      <View className="flex-row items-center my-6">
        <View className="flex-1 h-[1px] bg-slate-200" />
        <Text className="mx-4 text-sm text-slate-400">o inicia sesión con</Text>
        <View className="flex-1 h-[1px] bg-slate-200" />
      </View>

      {/* Social buttons */}
      <View className="gap-3">
        <Button
          title="Iniciar sesión con Apple"
          variant="outline"
          size="lg"
          className="rounded-full border-slate-900 bg-slate-800"
          textClassName="text-white"
        />
      </View>
    </View>
  );
}
