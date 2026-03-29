import type { ActiveTripMMKV } from "@/core/types/trip";
import { SOSButton } from "@/modules/sos/components/sos-button";
import { APP_LABELS } from "@/modules/trips/constants/trip.constants";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Car } from "lucide-react-native";
import { useMemo, useRef } from "react";
import { Text, View } from "react-native";
import { EndTripButton } from "./end-trip-button";
import { TripStatusBadges } from "./trip-status-badges";

interface TripBottomSheetProps {
  tripData: ActiveTripMMKV;
  isEnding: boolean;
  gpsActive: boolean;
  isSocketConnected: boolean;
  sharedContacts?: number;
  onEndTrip: () => void;
  onSOSTrigger: () => void;
}

export function TripBottomSheet({
  tripData,
  isEnding,
  gpsActive,
  isSocketConnected,
  sharedContacts,
  onEndTrip,
  onSOSTrigger,
}: TripBottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%", "43%"], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      onChange={() => { }}
      style={{ zIndex: 30, elevation: 30 }}
      backgroundStyle={{ borderRadius: 24 }}
      handleIndicatorStyle={{ backgroundColor: "#d1d5db", width: 40 }}
    >
      <BottomSheetView className="flex-1 px-6 pt-2 pb-8">
        <View className="flex-row items-center gap-2">
          <View className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#00000012" }}>
            <Car size={20} color="#000" />
          </View>
          <View className="flex-1 flex-col gap-1">
            <View className="flex-row items-center gap-2">
              <Text className="text-sm font-medium text-gray-800">
                {APP_LABELS[tripData.externalApp] ?? tripData.externalApp}
              </Text>

              {tripData.driverPlate && (
                <Text className="text-sm font-medium text-gray-800">
                  | Placa: {tripData.driverPlate.toUpperCase()}
                </Text>
              )}
            </View>
            {tripData.driverName && (
              <Text className="text-sm font-medium text-gray-500">
                Conductor: {tripData.driverName}
              </Text>
            )}
          </View>
        </View>

        <View className="mt-4">
          <TripStatusBadges
            gpsActive={gpsActive}
            audioRecording={tripData.audioEnabled}
            sharedContacts={sharedContacts}
          />
        </View>

        <View className="flex-1" />

        <View className="items-center mb-6">
          <SOSButton onTrigger={onSOSTrigger} />
        </View>

        <EndTripButton isEnding={isEnding} onEndTrip={onEndTrip} />
      </BottomSheetView>
    </BottomSheet>
  );
}
