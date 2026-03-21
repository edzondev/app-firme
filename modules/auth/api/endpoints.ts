import { apiFetch } from "@/core/lib/api";

export type RegisterUserInput = {
  fullName: string;
  phone?: string;
};

export type Profile = {
  id: string;
  firebaseUid: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  avatarUrl: string | null;
};

export function registerUserInBackend(data: RegisterUserInput) {
  return apiFetch<Profile>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getProfile() {
  return apiFetch<Profile>("/auth/me");
}
