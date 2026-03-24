import { queryKeys } from "@/core/constants/query-keys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTrip, getTripsHistory } from "../api/trips";

export function useTrips(userId: string) {
  return useQuery({
    queryKey: [...queryKeys.tripsHistory, userId],
    queryFn: () => getTripsHistory(userId),
    enabled: !!userId,
  });
}

export const useCreateTrip = () => {
  return useMutation({
    mutationFn: createTrip,
  });
};
