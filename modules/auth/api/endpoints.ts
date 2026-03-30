import { apiFetch } from "@/core/lib/api";
import { Profile } from "@/core/types/profile";

export type RegisterUserInput = {
  fullName: string;
  phone?: string;
};

export function registerUserInBackend(data: RegisterUserInput) {
  return apiFetch<Profile>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getProfile(signal?: AbortSignal) {
  return apiFetch<
    Pick<Profile, "id" | "firebaseUid" | "fullName" | "email" | "phone">
  >("/auth/me", { signal });
}
