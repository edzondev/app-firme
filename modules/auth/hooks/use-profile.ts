import { queryKeys } from "@/core/constants/query-keys";
import { useUserStore } from "@/core/stores/user-store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getProfile } from "../api/endpoints";

export function useProfile() {
  const setProfile = useUserStore((s) => s.setProfile);

  const query = useQuery({
    queryKey: queryKeys.profile,
    queryFn: getProfile,
  });

  useEffect(() => {
    if (query.data) {
      setProfile({
        id: query.data.id,
        fullName: query.data.fullName,
        phone: query.data.phone,
      });
    }
  }, [query.data]);

  return query;
}
