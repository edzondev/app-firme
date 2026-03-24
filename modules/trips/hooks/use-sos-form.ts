import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  defaultValues,
  sosSchema,
  STEP_COUNT,
  stepFields,
  type SosSchemaInput,
  type SosSchemaOutput,
} from "../schemas/sos.schema";
import { useCreateTrip } from "./use-trips";

export default function useSosForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const { mutateAsync } = useCreateTrip();

  const form = useForm<SosSchemaInput, unknown, SosSchemaOutput>({
    resolver: zodResolver(sosSchema),
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

  const handleSubmit = useCallback(async () => {
    console.log("Submitting form with data:", form.getValues());

    const data = {
      externalApp: form.getValues("appName"),
      driverPlate: form.getValues("driverPlate"),
      driverName: form.getValues("driverName"),
      vehicleColor: form.getValues("carColor"),
      audioEnabled: form.getValues("enabledAudio"),
    };
    await mutateAsync(data);
  }, []);

  return {
    form,
    currentStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === STEP_COUNT - 1,
    totalSteps: STEP_COUNT,
    next,
    back,
    handleSubmit,
  };
}
