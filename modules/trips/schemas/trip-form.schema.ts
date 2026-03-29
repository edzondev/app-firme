import { z } from "zod";

export const tripFormSchema = z.object({
  appName: z.string().min(1, { error: "Debes seleccionar una app." }),
  driverPlate: z.string().min(1, { error: "La placa es requerida" }),
  driverName: z.string().optional().default(""),
  carColor: z.string().optional().default(""),
  enabledAudio: z.boolean().default(false),
  enableSharedDirection: z.boolean().default(true),
});

export const tripFormAppSchema = tripFormSchema.pick({
  appName: true,
});

export const tripFormDataSchema = tripFormSchema.pick({
  driverPlate: true,
  driverName: true,
  carColor: true,
  enabledAudio: true,
  enableSharedDirection: true,
});

export const stepSchemas = [tripFormAppSchema, tripFormDataSchema] as const;
export const STEP_COUNT = stepSchemas.length + 1;

export type TripFormInput = z.input<typeof tripFormSchema>;
export type TripFormOutput = z.output<typeof tripFormSchema>;
export type StepFields = Array<keyof TripFormInput>;

export const stepFields = stepSchemas.map(
  (schema) => Object.keys(schema.shape) as StepFields,
);

export const defaultValues: TripFormInput = {
  appName: "",
  driverPlate: "",
  driverName: "",
  carColor: "",
  enabledAudio: false,
  enableSharedDirection: true,
};
