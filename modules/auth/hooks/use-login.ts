import { loginSchema, type LoginFormData } from "../schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "@react-native-firebase/auth";

export default function useLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);

      await signInWithEmailAndPassword(getAuth(), data.email, data.password);
    } catch (e: any) {
      const msg =
        e?.code === "auth/invalid-credential"
          ? "Correo o contraseña incorrectos"
          : (e?.message ?? "Error al iniciar sesión");

      setError(msg);
    }
  };

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
    error,
  };
}
