import { getStorage } from "@/core/storage/storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserProfile = {
  id: string | null;
  fullName: string | null;
  phone: string | null;
};

type UserProfileStore = UserProfile & {
  setProfile: (profile: Partial<UserProfile>) => void;
  clear: () => void;
};

const initialState: UserProfile = {
  id: null,
  fullName: null,
  phone: null,
};

export const useUserStore = create<UserProfileStore>()(
  persist(
    (set) => ({
      ...initialState,
      setProfile: (profile) => set(profile),
      clear: () => set(initialState),
    }),
    {
      name: "user-profile",
      storage: createJSONStorage(() => ({
        getItem: (key) => getStorage()?.getString(key) ?? null,
        setItem: (key, value) => getStorage()?.set(key, value),
        removeItem: (key) => getStorage()?.remove(key),
      })),
    },
  ),
);
