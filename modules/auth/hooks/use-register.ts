import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  getAuth,
} from "@react-native-firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUserInBackend } from "../api/endpoints";
import { registerSchema, type RegisterFormData } from "../schemas/auth.schema";

export default function useRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);

      await createUserWithEmailAndPassword(getAuth(), data.email, data.password);
      await registerUserInBackend({ fullName: data.fullName });
    } catch (e: any) {
      const errorMap: Record<string, string> = {
        "auth/email-already-in-use": "Ya existe una cuenta con este correo",
        "auth/invalid-email": "Correo electrónico inválido",
        "auth/weak-password": "La contraseña es demasiado débil",
      };

      setError(errorMap[e?.code] ?? e?.message ?? "Error al crear la cuenta");
    }
  };

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
  };
}
