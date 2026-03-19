import MainLayout from "@/core/layouts/main-layout";
import PremiumBanner from "@/modules/profile/components/premium-banner";
import ProfileHeader from "@/modules/profile/components/profile-header";
import SettingsLinkItem from "@/modules/profile/components/settings-link-item";
import SettingsSection from "@/modules/profile/components/settings-section";
import SettingsSegmentItem from "@/modules/profile/components/settings-segment-item";
import SettingsToggleItem from "@/modules/profile/components/settings-toggle-item";
import {
    Bell,
    FileText,
    Lock,
    LogOut,
    Mic,
    Moon,
    Timer,
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView, View } from "react-native";

const USER = {
  name: "María García",
  email: "maria@correo.com",
  phone: "+51 987 654 321",
  initials: "MG",
};

export default function ProfilePage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [audioQuality, setAudioQuality] = useState("Normal");
  const [sosDelay, setSosDelay] = useState("3 seg");

  return (
    <MainLayout edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1 py-8"
        contentContainerClassName="gap-5 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader
          name={USER.name}
          email={USER.email}
          phone={USER.phone}
          initials={USER.initials}
        />

        <PremiumBanner
          planName="Plan Gratuito"
          description="Desbloquea grabación de audio y más"
          onUpgrade={() => {}}
        />

        <SettingsSection title="Configuración">
          <SettingsToggleItem
            Icon={Bell}
            label="Notificaciones"
            value={notifications}
            onValueChange={setNotifications}
          />
          <SettingsSegmentItem
            Icon={Mic}
            label="Calidad de audio"
            options={["Normal", "Alta"]}
            value={audioQuality}
            onValueChange={setAudioQuality}
          />
          <SettingsSegmentItem
            Icon={Timer}
            label="Activación SOS"
            options={["3 seg", "5 seg"]}
            value={sosDelay}
            onValueChange={setSosDelay}
          />
          <SettingsToggleItem
            Icon={Moon}
            label="Modo oscuro"
            value={darkMode}
            onValueChange={setDarkMode}
            showDivider={false}
          />
        </SettingsSection>

        <SettingsSection title="Otros">
          <SettingsLinkItem
            Icon={FileText}
            label="Términos y condiciones"
            onPress={() => {}}
            showDivider
          />
          <SettingsLinkItem
            Icon={Lock}
            label="Política de privacidad"
            onPress={() => {}}
            showDivider
          />
          <SettingsLinkItem
            Icon={LogOut}
            label="Cerrar sesión"
            onPress={() => {}}
          />
        </SettingsSection>

        <View className="h-2" />
      </ScrollView>
    </MainLayout>
  );
}
