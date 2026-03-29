export interface JoinTripPayload {
  tripId: string;
  shareToken: string;
}

export interface GPSUpdatePayload {
  tripId: string;
  shareToken: string;
  latitude: number;
  longitude: number;
  accuracy: number | null;
  speed: number | null;
  heading: number | null;
  altitude: number | null;
  timestamp: string;
}

export interface SOSTriggerPayload {
  tripId: string;
  shareToken: string;
  latitude: number;
  longitude: number;
  accuracy: number | null;
}

export interface EndTripPayload {
  tripId: string;
}

export interface LocationUpdatePayload {
  latitude: number;
  longitude: number;
  speed: number | null;
  heading: number | null;
  timestamp: string;
}

export interface SOSActivatedPayload {
  tripId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  userName: string;
}
