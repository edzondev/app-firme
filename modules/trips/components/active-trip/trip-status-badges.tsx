import { MapPin, Mic, Users } from "lucide-react-native";
import { Text, View } from "react-native";

interface TripStatusBadgesProps {
  gpsActive: boolean;
  audioRecording: boolean;
  sharedContacts?: number;
}

function Badge({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <View
      className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-full ${
        active ? "bg-green-50" : "bg-gray-100"
      }`}
    >
      {icon}
      <Text
        className={`text-xs font-medium ${
          active ? "text-green-700" : "text-gray-400"
        }`}
      >
        {label}
      </Text>
    </View>
  );
}

export function TripStatusBadges({
  gpsActive,
  audioRecording,
  sharedContacts,
}: TripStatusBadgesProps) {
  return (
    <View className="flex-row flex-wrap gap-2">
      <Badge
        icon={<MapPin size={12} color={gpsActive ? "#15803d" : "#9ca3af"} />}
        label="GPS activo"
        active={gpsActive}
      />
      <Badge
        icon={
          <Mic size={12} color={audioRecording ? "#15803d" : "#9ca3af"} />
        }
        label="Audio grabando"
        active={audioRecording}
      />
      {sharedContacts !== undefined && (
        <Badge
          icon={
            <Users size={12} color={sharedContacts > 0 ? "#15803d" : "#9ca3af"} />
          }
          label={`Compartido con ${sharedContacts}`}
          active={sharedContacts > 0}
        />
      )}
    </View>
  );
}
