import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configurar Google Sign-In (hacer una sola vez al iniciar la app)
/*GoogleSignin.configure({
  webClientId: 'TU_WEB_CLIENT_ID.apps.googleusercontent.com', // del paso 10
});*/

// ============================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================

/**
 * Registrar con email y contraseña
 */
export async function registerWithEmail(email: string, password: string) {
  const credential = await auth().createUserWithEmailAndPassword(email, password);
  return credential.user;
}

/**
 * Login con email y contraseña
 */
export async function loginWithEmail(email: string, password: string) {
  const credential = await auth().signInWithEmailAndPassword(email, password);
  return credential.user;
}

/**
 * Login con Google
 */
/*export async function loginWithGoogle() {
  // 1. Inicia el flujo de Google Sign-In nativo
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const response = await GoogleSignin.signIn();

  // 2. Obtiene el idToken de Google
  const idToken = response.data?.idToken;
  if (!idToken) throw new Error('No se obtuvo el token de Google');

  // 3. Crea una credencial de Firebase con ese token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // 4. Inicia sesión en Firebase con la credencial
  const credential = await auth().signInWithCredential(googleCredential);
  return credential.user;
}*/

/**
 * Cerrar sesión
 */
export async function signOut() {
  // Cerrar sesión de Google si estaba logueado con Google
  /*try {
    await GoogleSignin.signOut();
  } catch {}*/

  // Cerrar sesión de Firebase
  await auth().signOut();
}

/**
 * Obtener el ID Token actual (para enviarlo al backend)
 * Firebase lo refresca automáticamente si está expirado
 */
export async function getIdToken(): Promise<string | null> {
  const user = auth().currentUser;
  if (!user) return null;

  // forceRefresh: true solo si necesitas forzar un token nuevo
  const token = await user.getIdToken(false);
  return token;
}

/**
 * Escuchar cambios en el estado de autenticación
 * Retorna una función para cancelar la suscripción
 */
export function onAuthStateChanged(
  callback: (user: FirebaseAuthTypes.User | null) => void,
) {
  return auth().onAuthStateChanged(callback);
}

/**
 * Obtener el usuario actual
 */
export function getCurrentUser() {
  return auth().currentUser;
}
