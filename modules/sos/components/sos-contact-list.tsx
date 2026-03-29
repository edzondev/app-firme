import type { SOSNotification } from "@/core/types/sos";
import { Check, Clock, X } from "lucide-react-native";
import { Text, View } from "react-native";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getBestNotification(notifications: SOSNotification[]): SOSNotification {
  return [...notifications].sort((a, b) => {
    if (a.deliveredAt && b.deliveredAt) {
      return new Date(a.deliveredAt).getTime() - new Date(b.deliveredAt).getTime();
    }
    if (a.deliveredAt) return -1;
    if (b.deliveredAt) return 1;
    if (a.sentAt && b.sentAt) {
      return new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime();
    }
    if (a.sentAt) return -1;
    if (b.sentAt) return 1;
    return 0;
  })[0];
}

function channelLabel(channel: string): string {
  switch (channel) {
    case "push":
      return "vía push";
    case "sms":
      return "SMS";
    case "whatsapp":
      return "WhatsApp";
    default:
      return channel;
  }
}

function NotificationStatus({ notification }: { notification: SOSNotification }) {
  if (notification.deliveredAt) {
    return (
      <View className="flex-row items-center gap-1">
        <Check size={13} color="#FFFFFF" />
        <Text className="text-sm text-white/70">
          Notificado {channelLabel(notification.channel)}
        </Text>
      </View>
    );
  }
  if (notification.sentAt) {
    return (
      <View className="flex-row items-center gap-1">
        <Check size={13} color="#FFFFFF" />
        <Text className="text-sm text-white/70">
          {notification.channel === "sms" ? "SMS" : notification.channel} enviado
        </Text>
      </View>
    );
  }
  if (notification.failedAt) {
    return (
      <View className="flex-row items-center gap-1">
        <X size={13} color="#FFFFFF" />
        <Text className="text-sm text-white/70">Falló</Text>
      </View>
    );
  }
  return (
    <View className="flex-row items-center gap-1">
      <Clock size={13} color="#FFFFFF" />
      <Text className="text-sm text-white/70">Pendiente</Text>
    </View>
  );
}

interface SOSContactListProps {
  notifications: SOSNotification[];
}

export function SOSContactList({ notifications }: SOSContactListProps) {
  const grouped = notifications.reduce(
    (acc, n) => {
      const key = n.contactName;
      if (!acc[key]) acc[key] = [];
      acc[key].push(n);
      return acc;
    },
    {} as Record<string, SOSNotification[]>,
  );

  const contacts = Object.entries(grouped);

  return (
    <View className="bg-white/10 rounded-2xl overflow-hidden">
      {contacts.map(([name, items]) => {
        const best = getBestNotification(items);
        const initials = getInitials(name);

        return (
          <View
            key={name}
            className="flex-row items-center p-4 gap-3"
          >
            <View
              className="w-12 h-12 rounded-full items-center justify-center bg-white/10"
            >
              <Text className="text-white text-lg font-bold">{initials}</Text>
            </View>

            <View className="flex-1">
              <Text className="text-lg font-semibold text-white">{name}</Text>
              <Text className="text-sm text-white/70">{best.contactPhone}</Text>
            </View>

            <NotificationStatus notification={best} />
          </View>
        );
      })}
    </View>
  );
}
