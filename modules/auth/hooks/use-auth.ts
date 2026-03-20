import { setCachedProfile } from "@/core/storage/helpers";
import {
  type FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import {
  getUserIdToken,
  loginWithEmail,
  registerWithEmail,
  signOutUser,
} from "../services/auth";
import { useProfile } from "./use-profile";
import { useRegisterUser } from "./use-register-user";

export function useAuth() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const registerMutation = useRegisterUser();
  const profileQuery = useProfile();

  async function handleAuthStateChanged(
    firebaseUser: FirebaseAuthTypes.User | null,
  ) {
    setUser(firebaseUser);

    if (firebaseUser) {
      // Sync con backend (solo si no existe aún)
      if (!profileQuery.data && !profileQuery.isFetching) {
        const backendUser = await registerMutation.mutateAsync({
          fullName: firebaseUser.displayName || "User",
          phone: firebaseUser.phoneNumber || "",
        });

        setCachedProfile({
          id: backendUser.id,
          fullName: backendUser.fullName,
          email: backendUser.email,
          phone: backendUser.phone,
          avatarUrl: backendUser.avatarUrl,
        });
      }
    }

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return unsubscribe;
  }, []);

  return {
    user,
    initializing,
    isAuthenticated: !!user,
    profile: profileQuery.data,
    profileLoading: profileQuery.isLoading,
    loginWithEmail,
    registerWithEmail,
    signOutUser,
    getUserIdToken,
  };
}
