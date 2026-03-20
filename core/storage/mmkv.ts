import { createMMKV, type MMKV } from "react-native-mmkv";

// Variable que se inicializa al arrancar la app
let storage: MMKV | null = null;

/**
 * Inicializa MMKV con encriptación.
 * DEBE llamarse en el entry point de la app, DESPUÉS de obtener la key.
 */
export function initializeStorage(encryptionKey: string) {
  storage = createMMKV({
    id: "firme-storage",
    encryptionKey,
  });
}

/**
 * Obtiene la instancia de MMKV.
 * Lanza error si no fue inicializada (bug de programación).
 */
export function getStorage(): MMKV {
  if (!storage) {
    throw new Error("MMKV no inicializado. Llama initializeStorage() primero.");
  }
  return storage;
}
