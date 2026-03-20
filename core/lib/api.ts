import { getUserIdToken } from "@/modules/auth/services/auth";

const API_URL = __DEV__
  ? "http://192.168.68.82:5000/api/v1"
  : "https://tu-dominio-api.com/api/v1";

type ApiErrorResponse = {
  message?: string;
};

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = await getUserIdToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = `HTTP ${response.status}`;

    try {
      const error = (await response.json()) as ApiErrorResponse;
      if (error?.message) message = error.message;
    } catch {
      // noop
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
