import { z } from "zod";

const relationshipOptions = [
  "madre",
  "padre",
  "pareja",
  "hermano",
  "hermana",
  "amigo",
  "amiga",
  "hijo",
  "hija",
  "otro",
] as const;

export const addContactSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  phone: z.string(),
  relationShip: z.enum(relationshipOptions),
});
export type AddContactFormData = z.infer<typeof addContactSchema>;
