import { queryKeys } from "@/core/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../api/contacts";

export default function useApiContacts() {
  const data = useQuery({
    queryKey: queryKeys.contacts,
    queryFn: getContacts,
  });
  return data;
}
