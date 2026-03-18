import { useEffect, useState } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  onAuthStateChanged,
  loginWithEmail,
  registerWithEmail,
  signOut,
  getIdToken,
} from '../services/auth';

export function useAuth() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escuchar cambios de auth (login, logout, token refresh)
    const unsubscribe = onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    // Limpiar suscripción al desmontar
    return unsubscribe;
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    loginWithEmail,
    registerWithEmail,
    signOut,
    getIdToken,
  };
}
