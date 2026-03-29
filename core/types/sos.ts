export type SOSStatus = "active" | "resolved" | "false_alarm";

export type SOSChannel = "push" | "sms" | "whatsapp";

export interface SOSAlert {
  id: string;
  tripId: string | null;
  userId: string;
  latitude: number;
  longitude: number;
  accuracy: number | null;
  status: SOSStatus;
  message: string | null;
  triggeredAt: string;
  resolvedAt: string | null;
  resolutionNote: string | null;
}

export interface SOSNotification {
  id: string;
  channel: SOSChannel;
  sentAt: string | null;
  deliveredAt: string | null;
  failedAt: string | null;
  failureReason: string | null;
  contactName: string;
  contactPhone: string;
}

export interface SOSAlertDetail extends SOSAlert {
  notifications: SOSNotification[];
}

export interface SOSTriggerInput {
  latitude: number;
  longitude: number;
  accuracy?: number;
  tripId?: string;
}

export interface SOSTriggerResponse {
  sosAlertId: string;
  status: "active";
  latitude: number;
  longitude: number;
  contactsNotified: {
    contactId: string;
    contactName: string;
    push: boolean;
    sms: boolean;
    whatsapp: boolean;
  }[];
  message: string;
}

export interface ResolveSOSInput {
  status: "resolved" | "false_alarm";
  note?: string;
}

export interface SOSTriggerWSPayload {
  tripId: string;
  shareToken: string;
  latitude: number;
  longitude: number;
  accuracy: number | null;
}
