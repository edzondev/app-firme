import { queryKeys } from "@/core/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/endpoints";

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: getProfile,
  });
}
