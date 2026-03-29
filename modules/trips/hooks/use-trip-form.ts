import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  defaultValues,
  tripFormSchema,
  STEP_COUNT,
  stepFields,
  type TripFormInput,
  type TripFormOutput,
} from "../schemas/trip-form.schema";
import { useCreateTrip } from "./use-trips";
import type { CreateTripResponse } from "@/core/types/trip";
import type { ExternalApp } from "@/core/types/trip";

export default function useTripForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const { mutateAsync, isPending: isCreating, error: createError } = useCreateTrip();

  const form = useForm<TripFormInput, unknown, TripFormOutput>({
    resolver: zodResolver(tripFormSchema),
    defaultValues,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const next = useCallback(async () => {
    const isValid = await form.trigger(stepFields[currentStep], {
      shouldFocus: true,
    });
    if (!isValid) return;
    setCurrentStep((s) => Math.min(s + 1, STEP_COUNT - 1));
  }, [currentStep, form]);

  const back = useCallback(() => {
    setCurrentStep((s) => Math.max(0, s - 1));
  }, []);

  const handleSubmit = useCallback(async (): Promise<CreateTripResponse> => {
    const data = {
      externalApp: form.getValues("appName") as ExternalApp,
      driverPlate: form.getValues("driverPlate"),
      driverName: form.getValues("driverName") || undefined,
      vehicleColor: form.getValues("carColor") || undefined,
      audioEnabled: form.getValues("enabledAudio"),
    };
    return mutateAsync(data);
  }, [form, mutateAsync]);

  return {
    form,
    currentStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === STEP_COUNT - 1,
    totalSteps: STEP_COUNT,
    isCreating,
    createError: createError instanceof Error ? createError.message : createError ? String(createError) : null,
    next,
    back,
    handleSubmit,
  };
}
