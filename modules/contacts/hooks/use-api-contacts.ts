import { queryKeys } from "@/core/constants/query-keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addContact, getContacts } from "../api/contacts";

function useGetContacts() {
  return useQuery({
    queryKey: queryKeys.contacts,
    queryFn: ({ signal }) => getContacts(signal),
  });
}

function useApiAddContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts });
    },
  });
}

export { useApiAddContact, useGetContacts };
