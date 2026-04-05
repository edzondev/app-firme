import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email({
      error: "Correo electrónico inválido",
    })
    .min(1, {
      error: "Ingresa tu correo electrónico",
    }),
  password: z.string().min(6, {
    error: "Mínimo 6 caracteres",
  }),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Ingresa tu nombre completo"),
    email: z.email({
      error: "Correo electrónico inválido",
    }),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
