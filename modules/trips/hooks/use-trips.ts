import { queryKeys } from "@/core/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getTripsHistory } from "../api/trips";

export default function useTrips(userId: string) {
  return useQuery({
    queryKey: [...queryKeys.tripsHistory, userId],
    queryFn: () => getTripsHistory(userId),
    enabled: !!userId,
  });
}
