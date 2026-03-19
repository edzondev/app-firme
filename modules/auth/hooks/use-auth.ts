import { apiFetch } from "@/core/services/shared/api";
import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import {
  getIdToken,
  loginWithEmail,
  registerWithEmail,
  signOut,
} from "../services/auth";

export function useAuth() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  function handleAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return unsubscribe;
  }, []);

  const registerInDatabase = async (user: FirebaseAuthTypes.User) => {
    // Aquí puedes agregar la lógica para registrar el usuario en tu base de datos

    const data = {
      firebaseUid: user.uid,
      email: user.email,
      fullName: user.displayName || "User",
      phone: user.phoneNumber || "",
    };

    await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  const fetchMetadata = async () => {
    const result = await apiFetch("/auth/me", {
      method: "GET",
    });

    console.log("User metadata:", result);
    return result;
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    loginWithEmail,
    registerWithEmail,
    signOut,
    getIdToken,
    registerInDatabase,
    fetchMetadata,
  };
}
