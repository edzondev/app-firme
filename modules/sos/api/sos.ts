import { apiFetch } from "@/core/lib/api";
import type {
  SOSAlert,
  SOSAlertDetail,
  SOSTriggerInput,
  SOSTriggerResponse,
  ResolveSOSInput,
} from "@/core/types/sos";

export async function triggerSOS(
  dto: SOSTriggerInput,
): Promise<SOSTriggerResponse> {
  return apiFetch<SOSTriggerResponse>("/sos", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}

export async function resolveSOS(
  sosId: string,
  dto: ResolveSOSInput,
): Promise<SOSAlert> {
  return apiFetch<SOSAlert>(`/sos/${sosId}/resolve`, {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}

export async function getActiveSOS(): Promise<SOSAlert | null> {
  const result = await apiFetch<SOSAlert | { active: false }>("/sos/active");
  if ("active" in result && result.active === false) return null;
  return result as SOSAlert;
}

export async function getSOSDetail(sosId: string): Promise<SOSAlertDetail> {
  return apiFetch<SOSAlertDetail>(`/sos/${sosId}`);
}
