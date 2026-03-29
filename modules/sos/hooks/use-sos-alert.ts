import { queryKeys } from "@/core/constants/query-keys";
import type { ResolveSOSInput, SOSAlertDetail } from "@/core/types/sos";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { getSOSDetail, resolveSOS } from "../api/sos";

interface UseSOSAlertReturn {
  sosDetail: SOSAlertDetail | null;
  isLoading: boolean;
  isResolving: boolean;
  isResolveConfirmOpen: boolean;
  resolveError: string | null;
  requestResolve: () => void;
  confirmFalseAlarm: () => void;
  confirmResolved: () => void;
  dismissResolveConfirm: () => void;
  dismissResolveError: () => void;
}

export function useSOSAlert(sosAlertId: string | null): UseSOSAlertReturn {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isResolving, setIsResolving] = useState(false);
  const [isResolveConfirmOpen, setIsResolveConfirmOpen] = useState(false);
  const [resolveError, setResolveError] = useState<string | null>(null);

  const { data: sosDetail, isLoading } = useQuery({
    queryKey: [...queryKeys.sosDetail, sosAlertId],
    queryFn: () => getSOSDetail(sosAlertId!),
    enabled: !!sosAlertId,
    refetchInterval: 5000,
  });

  const performResolve = useCallback(
    async (input: ResolveSOSInput) => {
      if (!sosAlertId) return;

      setIsResolving(true);
      try {
        await resolveSOS(sosAlertId, input);
        queryClient.invalidateQueries({ queryKey: queryKeys.activeSos });
        queryClient.invalidateQueries({ queryKey: queryKeys.sosDetail });
        router.back();
      } catch (err) {
        setResolveError(
          err instanceof Error ? err.message : "No se pudo cancelar la alerta",
        );
      } finally {
        setIsResolving(false);
      }
    },
    [sosAlertId, queryClient, router],
  );

  const requestResolve = useCallback(() => {
    setIsResolveConfirmOpen(true);
  }, []);

  const dismissResolveConfirm = useCallback(() => {
    setIsResolveConfirmOpen(false);
    setResolveError(null);
  }, []);

  const dismissResolveError = useCallback(() => {
    setResolveError(null);
  }, []);

  const confirmFalseAlarm = useCallback(
    () => performResolve({ status: "false_alarm" }),
    [performResolve],
  );

  const confirmResolved = useCallback(
    () => performResolve({ status: "resolved" }),
    [performResolve],
  );

  return {
    sosDetail: sosDetail ?? null,
    isLoading,
    isResolving,
    isResolveConfirmOpen,
    resolveError,
    requestResolve,
    confirmFalseAlarm,
    confirmResolved,
    dismissResolveConfirm,
    dismissResolveError,
  };
}
