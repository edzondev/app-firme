import {
  createUserWithEmailAndPassword,
  firebase,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "@react-native-firebase/auth";

/**
 * Registrar con email y contraseña
 */
export async function registerWithEmail(email: string, password: string) {
  const credential = await createUserWithEmailAndPassword(
    getAuth(),
    email,
    password,
  );
  return credential.user;
}

/**
 * Login con email y contraseña
 */
export async function loginWithEmail(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(
    getAuth(),
    email,
    password,
  );
  return credential.user;
}

/**
 * Cerrar sesión
 */
export async function signOutUser() {
  // Cerrar sesión de Google si estaba logueado con Google
  /*try {
    await GoogleSignin.signOut();
  } catch {}*/

  // Cerrar sesión de Firebase
  await signOut(getAuth());
}

/**
 * Obtener el ID Token actual (para enviarlo al backend)
 * Firebase lo refresca automáticamente si está expirado
 */
export async function getUserIdToken(): Promise<string | null> {
  const user = firebase.auth().currentUser;
  if (!user) return null;

  // forceRefresh: true solo si necesitas forzar un token nuevo
  const token = await user.getIdToken(false);
  return token;
}

/**
 * Obtener el usuario actual
 */
export function getCurrentUser() {
  return firebase.auth().currentUser;
}
