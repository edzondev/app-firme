import { queryKeys } from "@/core/constants/query-keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTrip,
  endTrip,
  getActiveTrip,
  getTripsHistory,
} from "../api/trips";

export function useTrips(userId: string) {
  return useQuery({
    queryKey: [...queryKeys.tripsHistory, userId],
    queryFn: () => getTripsHistory(),
    enabled: !!userId,
  });
}

export function useCreateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.activeTrip });
    },
  });
}

export function useEndTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: endTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.activeTrip });
      queryClient.invalidateQueries({ queryKey: queryKeys.tripsHistory });
    },
  });
}

export function useActiveTrip(options?: { refetchOnMount?: boolean | "always" }) {
  return useQuery({
    queryKey: queryKeys.activeTrip,
    queryFn: getActiveTrip,
    refetchOnMount: options?.refetchOnMount,
  });
}
