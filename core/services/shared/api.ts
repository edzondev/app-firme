import { getIdToken } from "@/modules/auth/services/auth";

const API_URL = __DEV__
  ? 'http://10.0.2.2:3000' // Android emulator → localhost
  : 'https://tu-dominio-api.com'; // producción

/**
 * Fetch wrapper que agrega el token de Firebase automáticamente.
 * Todos los requests al backend pasan por aquí.
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  // Obtener el token actual de Firebase
  const token = await getIdToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // Aquí va el token en el header Authorization
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// ============================================
// FUNCIONES DE API TIPADAS
// ============================================

// Ejemplo: registrar usuario en tu backend después del login en Firebase
export async function registerUserInBackend(data: {
  fullName: string;
  phone?: string;
}) {
  return apiFetch<{ id: string }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Ejemplo: obtener perfil del usuario
export async function getProfile() {
  return apiFetch<{ id: string; fullName: string; email: string }>('/api/auth/me');
}

// Ejemplo: obtener contactos
export async function getContacts() {
  return apiFetch<Array<{ id: string; name: string; phone: string }>>('/api/contacts');
}
