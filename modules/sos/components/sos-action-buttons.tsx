import { Phone } from "lucide-react-native";
import { Linking, Pressable, Text, View } from "react-native";

interface SOSActionButtonsProps {
  primaryContactPhone?: string | null;
  primaryContactName?: string | null;
}

export function SOSActionButtons({
  primaryContactPhone,
  primaryContactName,
}: SOSActionButtonsProps) {
  const callPolice = () => Linking.openURL("tel:105");

  const callContact = () => {
    if (primaryContactPhone) Linking.openURL(`tel:${primaryContactPhone}`);
  };

  return (
    <View className="gap-3">
      <Pressable
        onPress={callPolice}
        className="bg-white rounded-xl p-4 h-16 flex-row items-center justify-center gap-3"
      >
        <Phone size={20} color="#d4582f" />
        <Text className="text-sos font-semibold text-base">
          Llamar al 105 (PNP)
        </Text>
      </Pressable>

      {primaryContactPhone && (
        <Pressable
          onPress={callContact}
          className="bg-white/10 border border-white/40 rounded-xl p-4 h-16 flex-row items-center justify-center gap-3"
        >
          <Phone size={20} color="white" />
          <Text className="text-white font-semibold text-base">
            Llamar a {primaryContactName ?? "contacto"}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
