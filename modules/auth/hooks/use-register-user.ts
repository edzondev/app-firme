import { queryKeys } from "@/core/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUserInBackend, RegisterUserInput } from "../api/endpoints";

export function useRegisterUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterUserInput) => registerUserInBackend(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    },
  });
}
