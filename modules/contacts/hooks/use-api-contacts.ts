import { queryKeys } from "@/core/constants/query-keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addContact, getContacts } from "../api/contacts";

function useApiContacts() {
  const data = useQuery({
    queryKey: queryKeys.contacts,
    queryFn: getContacts,
  });
  return data;
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

export { useApiContacts, useApiAddContact };
