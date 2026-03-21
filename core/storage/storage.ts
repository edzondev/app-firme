import * as SecureStore from "expo-secure-store";
import { createMMKV, type MMKV } from "react-native-mmkv";

const MMKV_KEY_ALIAS = "firme_mmkv_encryption_key";

let storage: MMKV;

async function getOrCreateKey(): Promise<string> {
  let key = await SecureStore.getItemAsync(MMKV_KEY_ALIAS);
  if (!key) {
    const array = new Uint8Array(8);
    crypto.getRandomValues(array);
    key = Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
    await SecureStore.setItemAsync(MMKV_KEY_ALIAS, key);
  }
  return key;
}

export async function initStorage(): Promise<void> {
  if (storage) return;
  try {
    const encryptionKey = await getOrCreateKey();
    storage = createMMKV({ id: "firme-storage", encryptionKey });
  } catch {
    storage = createMMKV({ id: "firme-storage" });
  }
}

export function getStorage(): MMKV {
  return storage;
}

export function getJSON<T>(key: string): T | null {
  const raw = storage.getString(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setJSON(key: string, value: unknown): void {
  storage.set(key, JSON.stringify(value));
}
