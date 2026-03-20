import { initializeStorage } from "./mmkv";
import { getOrCreateMMKVKey } from "./secure";

let initialized = false;

/**
 * Inicializa el sistema de almacenamiento local.
 * Llama esto UNA VEZ, lo más temprano posible en la app.
 * Debe completarse ANTES de que cualquier pantalla lea de MMKV.
 */
export async function initStorage(): Promise<void> {
  if (initialized) return;

  // 1. Obtener (o crear) la encryption key desde SecureStore
  const encryptionKey = await getOrCreateMMKVKey();
  console.log();
  // 2. Inicializar MMKV con esa key
  initializeStorage(encryptionKey);

  initialized = true;
}
