import { Text, View } from "react-native";
import ProfileAvatar from "./profile-avatar";

type Props = {
  name: string;
  email: string;
  phone: string;
  initials: string;
};

export default function ProfileHeader({ name, email, phone, initials }: Props) {
  return (
    <View className="items-center gap-3 pt-6 pb-4 px-6">
      <ProfileAvatar initials={initials} size={84} />
      <View className="items-center gap-1">
        <Text className="text-xl font-bold text-text-primary">{name}</Text>
        <Text className="text-sm text-text-secondary">
          {email} · {phone}
        </Text>
      </View>
    </View>
  );
}
