import MainLayout from "@/core/layouts/main-layout";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text } from "react-native";
import { AppSelectorStep, type AppId } from "../components/app-selector-step";
import { StepIndicator } from "../components/step-indicator";
import { TripConfirmStep } from "../components/trip-confirm-step";
import { TripDataStep, type TripData } from "../components/trip-data-step";

const TOTAL_STEPS = 3;

const DEFAULT_TRIP_DATA: TripData = {
  plate: "",
  driverName: "",
  vehicleColor: null,
  audioEnabled: true,
  locationEnabled: true,
};

export function SafeTravelScreen() {
  const [step, setStep] = useState(1);
  const [selectedApp, setSelectedApp] = useState<AppId | null>(null);
  const [tripData, setTripData] = useState<TripData>(DEFAULT_TRIP_DATA);

  const goToStep = useCallback((nextStep: number) => {
    setStep(nextStep);
  }, []);

  const handleBack = useCallback(() => {
    if (step > 1) {
      goToStep(step - 1);
    } else {
      if (router.canGoBack()) {
        router.back();
      }
    }
  }, [step, goToStep]);

  return (
    <MainLayout edges={["top", "bottom"]}>
      {/* Header */}
      <View className="pt-8 px-6 gap-3">
        <Text
          className="text-3xl font-bold text-text-primary"
          style={{ letterSpacing: -0.3 }}
        >
          Iniciar viaje seguro
        </Text>
        <Text className="font-semibold text-base text-primary">
          Paso {step} de {TOTAL_STEPS}
        </Text>
        <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />
      </View>

      {/* Step content */}
      <View className="flex-1">
        {step === 1 && (
          <AppSelectorStep
            selected={selectedApp}
            onSelect={setSelectedApp}
            onContinue={() => goToStep(2)}
          />
        )}
        {step === 2 && (
          <TripDataStep
            data={tripData}
            onChange={(updates) =>
              setTripData((prev) => ({ ...prev, ...updates }))
            }
            onContinue={() => goToStep(3)}
            onBack={handleBack}
          />
        )}
        {step === 3 && (
          <TripConfirmStep
            selectedApp={selectedApp}
            data={tripData}
            onBack={handleBack}
            onActivate={() => {
              // TODO: wire activation logic
            }}
          />
        )}
      </View>
    </MainLayout>
  );
}
