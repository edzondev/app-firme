import { apiFetch } from "@/core/lib/api";
import type { TripHistory } from "@/core/types/recent-trips";
import type {
  ActiveTrip,
  CreateTripInput,
  CreateTripResponse,
  EndTripResponse,
} from "@/core/types/trip";

type TripHistoryResponse = {
  page: number;
  total: number;
  totalPages: number;
  trips: TripHistory[];
};

export async function getTripsHistory(
  signal?: AbortSignal,
): Promise<TripHistoryResponse> {
  return apiFetch<TripHistoryResponse>(`/trip/history?limit=3`, { signal });
}

export async function createTrip(
  tripData: CreateTripInput,
): Promise<CreateTripResponse> {
  return apiFetch<CreateTripResponse>("/trip", {
    method: "POST",
    body: JSON.stringify(tripData),
  });
}

export async function endTrip(tripId: string): Promise<EndTripResponse> {
  return apiFetch<EndTripResponse>(`/trip/${tripId}/end`, {
    method: "PATCH",
  });
}

export async function getActiveTrip(): Promise<ActiveTrip | null> {
  const result = await apiFetch<ActiveTrip | { active: false }>("/trip/active");
  if ("active" in result && result.active === false) return null;
  return result as ActiveTrip;
}
