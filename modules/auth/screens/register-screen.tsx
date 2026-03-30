import { Text, View } from "react-native";
import LoginForm from "../components/login-form";

export default function RegisterScreen() {
  return (
    <View className="flex-1 justify-center px-6 pt-14 pb-8">
      <Text className="text-4xl font-bold text-slate-900 mb-8">
        Crea una cuenta
      </Text>

      <LoginForm />
    </View>
  );
}
