import MainLayout from "@/core/layouts/main-layout";
import LoginScreen from "@/modules/auth/screens/login-screen";

export default function AuthIndex() {
  return (
    <MainLayout>
      <LoginScreen />
    </MainLayout>
  );
}
