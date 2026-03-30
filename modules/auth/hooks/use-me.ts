import { queryKeys } from "@/core/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/endpoints";
import { useAuth } from "./use-auth";

export function useMe() {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.me,
    queryFn: ({ signal }) => getProfile(signal),
    enabled: !!user, // solo corre si hay sesión Firebase
    staleTime: 1000 * 60 * 5, // 5 min, no refetch innecesario
  });
}
