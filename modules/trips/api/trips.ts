import { apiFetch } from "@/core/lib/api";

export async function getTripsHistory(userId: string) {
    const response = await apiFetch(`/trip/history/${userId}?limit=3`);
    return response;
}