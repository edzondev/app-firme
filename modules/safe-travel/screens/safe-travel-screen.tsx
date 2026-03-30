import { Button } from "@/core/components/ui/button";
import MainLayout from "@/core/layouts/main-layout";
import AppSelectorStep from "@/modules/trips/components/form/app-selector-step";
import { TripConfirmStep } from "@/modules/trips/components/form/trip-confirm-step";
import TripDataStep from "@/modules/trips/components/form/trip-data-step";
import { useTripActivation } from "@/modules/trips/hooks/use-trip-activation";
import useTripForm from "@/modules/trips/hooks/use-trip-form";
import { FormProvider } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";
import { StepIndicator } from "../components/step-indicator";

const STEP_LABELS: Record<
  number,
  { title: string; subtitle: string; cta: string }
> = {
  1: {
    title: "¿Qué app estás usando?",
    subtitle: "Selecciona la app en la que pediste tu taxi",
    cta: "Continuar",
  },
  2: {
    title: "Datos del viaje",
    subtitle: "Mientras más info ingreses, más segura estarás.",
    cta: "Continuar",
  },
  3: {
    title: "Confirma tu viaje",
    subtitle: "Revisa los datos antes de activar tu protección",
    cta: "Activar protección",
  },
};

const STEP_COMPONENTS: Record<number, React.ReactNode> = {
  1: <AppSelectorStep />,
  2: <TripDataStep />,
  3: <TripConfirmStep />,
};

export function SafeTravelScreen() {
  const {
    isFirstStep,
    back,
    currentStep,
    form,
    isLastStep,
    next,
    totalSteps,
    isCreating,
    createError,
    handleSubmit,
  } = useTripForm();

  const {
    activate,
    status: activationStatus,
    error: activationError,
  } = useTripActivation();
  const isBusy = isCreating || activationStatus === "activating";
  const errorMessage = createError || activationError;

  const meta = STEP_LABELS[currentStep + 1];

  const onSubmit = async () => {
    try {
      const tripResponse = await handleSubmit();
      await activate(tripResponse, {
        externalApp: form.getValues("appName"),
        driverPlate: form.getValues("driverPlate"),
        driverName: form.getValues("driverName") || undefined,
        audioEnabled: form.getValues("enabledAudio") ?? false,
      });
    } catch (err) {
      // El error de activación ya se maneja en useTripActivation.
      // Aquí solo capturamos el error de createTrip (handleSubmit).
      console.error("Error al crear viaje:", err);
    }
  };

  return (
    <MainLayout edges={["top", "bottom"]}>
      <FormProvider {...form}>
        <View className="flex-1 px-6 pt-8">
          <View className="flex-col items-start gap-1">
            <Text
              className="text-3xl font-bold text-secondary-foreground"
              style={{ letterSpacing: -0.3 }}
            >
              Iniciar viaje seguro
            </Text>
            <Text className="font-semibold text-base text-secondary-foreground">
              Paso {currentStep + 1} de {totalSteps}
            </Text>
          </View>
          <StepIndicator
            currentStep={currentStep + 1}
            totalSteps={totalSteps}
            className="my-6"
          />

          <View className="mb-8">
            <Text
              className="text-2xl font-bold text-secondary-foreground"
              style={{ letterSpacing: -0.4 }}
            >
              {meta.title}
            </Text>
            <Text className="text-base text-secondary-foreground mt-1.5 leading-5">
              {meta.subtitle}
            </Text>
          </View>

          {STEP_COMPONENTS[currentStep + 1]}

          <View className="flex-1" />

          {errorMessage && (
            <Text className="text-red-500 text-sm text-center mb-3">
              {errorMessage}
            </Text>
          )}

          <View className="flex-row gap-2">
            {!isFirstStep && (
              <Button
                title="Volver"
                variant="outline"
                onPress={back}
                className="flex-auto"
                disabled={isBusy}
              />
            )}

            <Button
              title={isBusy ? "" : meta.cta}
              variant="primary"
              onPress={isLastStep ? onSubmit : next}
              className="flex-auto"
              disabled={isBusy}
            >
              {isBusy && <ActivityIndicator color="white" />}
            </Button>
          </View>
        </View>
      </FormProvider>
    </MainLayout>
  );
}
