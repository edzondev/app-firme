import * as SecureStore from "expo-secure-store";

const MMKV_KEY_ALIAS = "firme_mmkv_encryption_key";
const AUDIO_KEY_ALIAS = "firme_audio_encryption_key";

/**
 * Genera o recupera la encryption key de MMKV.
 * Se guarda en el Keychain/KeyStore del dispositivo (hardware-backed).
 * Se llama UNA VEZ al iniciar la app.
 */
export async function getOrCreateMMKVKey(): Promise<string> {
  // Intentar recuperar la key existente
  let key = await SecureStore.getItemAsync(MMKV_KEY_ALIAS);

  if (!key) {
    // Generar una key aleatoria de 32 caracteres
    // crypto.getRandomValues está disponible en React Native con Hermes
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    key = Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");

    // Guardar en SecureStore (Keychain/KeyStore)
    await SecureStore.setItemAsync(MMKV_KEY_ALIAS, key);
  }

  return key;
}

/**
 * Genera o recupera la encryption key para grabaciones de audio.
 * Separada de la key de MMKV por seguridad.
 */
export async function getOrCreateAudioKey(): Promise<string> {
  let key = await SecureStore.getItemAsync(AUDIO_KEY_ALIAS);

  if (!key) {
    const array = new Uint8Array(32); // 256 bits para AES-256
    crypto.getRandomValues(array);
    key = Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
    await SecureStore.setItemAsync(AUDIO_KEY_ALIAS, key);
  }

  return key;
}
