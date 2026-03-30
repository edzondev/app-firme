import { cn } from "@/core/lib/utils";
import type { Tables } from "@/database.types";
import { getAvatarColor } from "@/modules/contacts/constants/avatar-colors";
import { ScrollView, Text, View } from "react-native";

interface TrustContactsProps {
  contacts: Tables<"emergency_contacts">[] | undefined;
  isLoading: boolean;
}

interface ContactAvatarProps {
  contact: Tables<"emergency_contacts">;
}

function ContactAvatar({ contact }: ContactAvatarProps) {
  const color = getAvatarColor(contact.name);
  const initials = contact.name.slice(0, 2).toUpperCase();

  return (
    <View className="items-center gap-1.5">
      <View
        className={cn(
          "w-12 h-12 rounded-full items-center justify-center",
          color.bg,
        )}
      >
        <Text className={cn("text-base font-semibold", color.text)}>
          {initials}
        </Text>
      </View>
      <Text className="text-xs text-foreground text-center" numberOfLines={1}>
        {contact.name}
      </Text>
    </View>
  );
}

export function TrustContacts({ contacts, isLoading }: TrustContactsProps) {
  if (isLoading || !contacts || contacts.length === 0) return null;

  return (
    <View className="gap-3">
      <Text className="text-sm font-medium text-foreground uppercase">
        Contactos de confianza
      </Text>
      <View className="bg-card border border-border rounded-2xl p-5">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-4"
        >
          {contacts.map((contact) => (
            <ContactAvatar key={contact.id} contact={contact} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
