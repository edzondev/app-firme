import { StorageKeys } from "./keys";
import { getStorage } from "./mmkv";

export function getString(key: string): string | undefined {
  return getStorage().getString(key);
}

export function setString(key: string, value: string): void {
  getStorage().set(key, value);
}

export function getBoolean(key: string): boolean {
  return getStorage().getBoolean(key) ?? false;
}

export function setBoolean(key: string, value: boolean): void {
  getStorage().set(key, value);
}

export function getNumber(key: string): number | undefined {
  const val = getStorage().getString(key);
  return val ? Number(val) : undefined;
}

export function getJSON<T>(key: string): T | null {
  const raw = getStorage().getString(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setJSON(key: string, value: unknown): void {
  getStorage().set(key, JSON.stringify(value));
}

export function remove(key: string): void {
  getStorage().remove(key);
}

// --- User profile cache ---
interface UserProfileCache {
  id: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  avatarUrl: string | null;
}

export function getCachedProfile(): UserProfileCache | null {
  return getJSON<UserProfileCache>(StorageKeys.USER_PROFILE);
}

export function setCachedProfile(profile: UserProfileCache): void {
  setJSON(StorageKeys.USER_PROFILE, profile);
}

export function clearCachedProfile(): void {
  remove(StorageKeys.USER_PROFILE);
}

// --- Subscription ---
export function getIsPremium(): boolean {
  return getBoolean(StorageKeys.IS_PREMIUM);
}

export function setIsPremium(value: boolean): void {
  setBoolean(StorageKeys.IS_PREMIUM, value);
}

// --- Onboarding ---
export function hasCompletedOnboarding(): boolean {
  return getBoolean(StorageKeys.ONBOARDING_COMPLETED);
}

export function markOnboardingComplete(): void {
  setBoolean(StorageKeys.ONBOARDING_COMPLETED, true);
}

// --- Settings ---
export function getSettings() {
  return {
    darkMode: getBoolean(StorageKeys.DARK_MODE),
    audioQuality: getString(StorageKeys.AUDIO_QUALITY) ?? "normal",
    sosDelay: getNumber(StorageKeys.SOS_DELAY) ?? 3,
    notificationsEnabled: getBoolean(StorageKeys.NOTIFICATIONS_ENABLED),
  };
}

export function setSetting(
  key: "darkMode" | "audioQuality" | "sosDelay" | "notificationsEnabled",
  value: string | number | boolean,
) {
  const keyMap = {
    darkMode: StorageKeys.DARK_MODE,
    audioQuality: StorageKeys.AUDIO_QUALITY,
    sosDelay: StorageKeys.SOS_DELAY,
    notificationsEnabled: StorageKeys.NOTIFICATIONS_ENABLED,
  };
  const storageKey = keyMap[key];
  if (typeof value === "boolean") setBoolean(storageKey, value);
  else if (typeof value === "number") setString(storageKey, String(value));
  else setString(storageKey, value);
}

// --- Active trip (para restaurar si la app se cierra) ---
interface ActiveTripState {
  tripId: string;
  shareToken: string;
  startedAt: string;
  externalApp: string;
  driverPlate?: string;
  driverName?: string;
}

export function getActiveTrip(): ActiveTripState | null {
  return getJSON<ActiveTripState>(StorageKeys.ACTIVE_TRIP);
}

export function setActiveTrip(trip: ActiveTripState): void {
  setJSON(StorageKeys.ACTIVE_TRIP, trip);
}

export function clearActiveTrip(): void {
  remove(StorageKeys.ACTIVE_TRIP);
}

// --- GPS offline queue ---
interface OfflineGPSPoint {
  tripId: string;
  latitude: number;
  longitude: number;
  accuracy: number | null;
  speed: number | null;
  heading: number | null;
  timestamp: string;
}

export function getOfflineGPSQueue(): OfflineGPSPoint[] {
  return getJSON<OfflineGPSPoint[]>(StorageKeys.GPS_OFFLINE_QUEUE) ?? [];
}

export function addToOfflineGPSQueue(point: OfflineGPSPoint): void {
  const queue = getOfflineGPSQueue();
  queue.push(point);
  setJSON(StorageKeys.GPS_OFFLINE_QUEUE, queue);
}

export function clearOfflineGPSQueue(): void {
  remove(StorageKeys.GPS_OFFLINE_QUEUE);
}

// --- Logout: limpiar todo ---
export function clearAllUserData(): void {
  const storage = getStorage();
  // Limpiar datos de usuario pero mantener onboarding y settings de app
  storage.remove(StorageKeys.USER_PROFILE);
  storage.remove(StorageKeys.IS_PREMIUM);
  storage.remove(StorageKeys.SUBSCRIPTION_EXPIRES);
  storage.remove(StorageKeys.ACTIVE_TRIP);
  storage.remove(StorageKeys.GPS_OFFLINE_QUEUE);
  storage.remove(StorageKeys.EXPO_PUSH_TOKEN);
  storage.remove(StorageKeys.LAST_KNOWN_LOCATION);
}
