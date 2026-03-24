import { z } from "zod";

export const sosSchema = z.object({
  appName: z.string().min(1, { error: "Debes seleccionar una app." }),
  driverPlate: z.string().min(1, { error: "La placa es requerida" }),
  driverName: z
    .string()
    .min(1, { error: "El nombre del conductor es requerido" }),
  carColor: z.string().min(1, { error: "El color es requerido" }),
  enabledAudio: z.boolean().default(false),
  enableSharedDirection: z.boolean().default(true),
});

export const sosApplicationSchema = sosSchema.pick({
  appName: true,
});

export const sosTripDataSchema = sosSchema.pick({
  driverPlate: true,
  driverName: true,
  carColor: true,
  enabledAudio: true,
  enableSharedDirection: true,
});

export const stepSchemas = [sosApplicationSchema, sosTripDataSchema] as const;
export const STEP_COUNT = stepSchemas.length + 1;

export type SosSchemaInput = z.input<typeof sosSchema>;
export type SosSchemaOutput = z.output<typeof sosSchema>;
export type StepFields = Array<keyof SosSchemaInput>;

export const stepFields = stepSchemas.map(
  (schema) => Object.keys(schema.shape) as StepFields,
);

export const defaultValues: SosSchemaInput = {
  appName: "",
  driverPlate: "",
  driverName: "",
  carColor: "",
  enabledAudio: false,
  enableSharedDirection: true,
};
