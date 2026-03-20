/**
 * Todas las keys de MMKV centralizadas.
 */
export const StorageKeys = {
  // Auth & user cache
  USER_PROFILE: "user_profile", // JSON: { id, name, email, phone, avatarUrl }
  IS_PREMIUM: "is_premium", // boolean
  SUBSCRIPTION_EXPIRES: "sub_expires", // string (ISO date)

  // Onboarding
  ONBOARDING_COMPLETED: "onboarding_done", // boolean

  // Settings
  DARK_MODE: "dark_mode", // boolean
  AUDIO_QUALITY: "audio_quality", // 'normal' | 'alta'
  SOS_DELAY: "sos_delay", // number (3 o 5)
  NOTIFICATIONS_ENABLED: "notif_on", // boolean

  // Trip state (para restaurar si la app se cierra)
  ACTIVE_TRIP: "active_trip", // JSON: { tripId, shareToken, startedAt, externalApp }

  // GPS offline queue
  GPS_OFFLINE_QUEUE: "gps_offline", // JSON: LocationPoint[]

  // Push
  EXPO_PUSH_TOKEN: "expo_push_token", // string

  // Misc
  LAST_KNOWN_LOCATION: "last_location", // JSON: { lat, lng, timestamp }
} as const;
