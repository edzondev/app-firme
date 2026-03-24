import { apiFetch } from "@/core/lib/api";
import { TripHistory } from "@/core/types/recent-trips";

type TripHistoryResponse = {
  page: number;
  total: number;
  totalPages: number;
  trips: TripHistory[];
};

export async function getTripsHistory(userId: string) {
  try {
    const response = await apiFetch<TripHistoryResponse>(
      `/trip/history/${userId}?limit=3`,
    );
    return response;
  } catch (error) {
    console.error({ error });
  }
}

export async function createTrip(tripData: any) {
  try {
    const response = await apiFetch<any>(`/trip`, {
      method: "POST",
      body: JSON.stringify(tripData),
    });
    console.log("Trip created successfully:", response);
    return response;
  } catch (error) {
    console.error({ error });
  }
}
