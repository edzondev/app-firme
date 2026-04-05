import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import RegisterForm from "../components/register-form";

export default function RegisterScreen() {
  return (
    <ScrollView
      contentContainerClassName="flex-grow justify-center px-6 pt-14 pb-8"
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-4xl font-bold text-slate-900 mb-8">
        Crea una{"\n"}cuenta
      </Text>

      <RegisterForm />

      <View className="flex-row justify-center mt-6">
        <Text className="text-sm text-slate-500">¿Ya tienes cuenta? </Text>
        <Link href="/(auth)/login">
          <Text className="text-sm text-slate-900 font-semibold">
            Inicia sesión
          </Text>
        </Link>
      </View>
    </ScrollView>
  );
}
