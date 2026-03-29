export type ExternalApp =
  | "indrive"
  | "uber"
  | "didi"
  | "yango"
  | "cabify"
  | "other";

export type TripStatus = "active" | "completed" | "sos_triggered" | "cancelled";

export interface CreateTripInput {
  externalApp: ExternalApp;
  driverPlate: string;
  driverName?: string;
  vehicleColor?: string;
  audioEnabled?: boolean;
  shareEnabled?: boolean;
}

export interface CreateTripResponse {
  tripId: string;
  shareToken: string;
  startedAt: string;
}

export interface ActiveTrip {
  id: string;
  userId: string;
  externalApp: ExternalApp;
  driverPlate: string | null;
  driverName: string | null;
  vehicleColor: string | null;
  status: TripStatus;
  audioEnabled: boolean;
  shareEnabled: boolean;
  routeDeviationEnabled: boolean;
  shareToken: string | null;
  startedAt: string;
  endedAt: string | null;
  durationSeconds: number | null;
  distanceMeters: number | null;
  locationPointsCount: number;
  userRating: number | null;
  createdAt: string;
}

export interface EndTripResponse {
  id: string;
  status: "completed";
  endedAt: string;
  durationSeconds: number;
  distanceMeters: number;
}

export interface ActiveTripMMKV {
  tripId: string;
  shareToken: string;
  startedAt: string;
  externalApp: ExternalApp;
  driverPlate: string | null;
  driverName: string | null;
  audioEnabled: boolean;
}
