import { ConfirmationSheet } from "@/core/components/shared/confirmation-sheet";
import { Button } from "@/core/components/ui/button";
import { useTripAudio } from "@/core/contexts/trip-audio-context";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import MapBox, { Camera, LocationPuck } from "@rnmapbox/maps";
import { useRouter } from "expo-router";
import { useCallback, useRef } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { TripBottomSheet } from "../components/active-trip/trip-bottom-sheet";
import { TripTimer } from "../components/active-trip/trip-timer";
import { useActiveTrip } from "../hooks/use-active-trip";

MapBox.setAccessToken(process.env.EXPO_PUBLIC_REACT_NATIVE_MAPBOX_TOKEN ?? "");

export function ActiveTripScreen() {
  const router = useRouter();
  const { triggerSOS: audioTriggerSOS } = useTripAudio();
  const {
    tripData,
    isEnding,
    isEndConfirmOpen,
    endTripError,
    requestEndTrip,
    confirmEndTrip,
    dismissEndConfirm,
    dismissEndTripError,
    socketHook,
  } = useActiveTrip();

  const endTripSheetRef = useRef<BottomSheetMethods | null>(null);

  const isSheetOpen = isEndConfirmOpen || !!endTripError;

  const handleSheetClose = useCallback(
    (idx: number) => {
      if (idx === -1) {
        dismissEndConfirm();
        dismissEndTripError();
      }
    },
    [dismissEndConfirm, dismissEndTripError],
  );

  const handleSOSTrigger = useCallback(() => {
    audioTriggerSOS();
    router.push("/trip/sos-active");
  }, [audioTriggerSOS, router]);

  if (!tripData) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#107359" />
        <Text className="text-secondary-foreground mt-4">
          Cargando viaje...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="absolute inset-0">
        <MapBox.MapView
          styleURL="mapbox://styles/mapbox/standard"
          style={{ flex: 1 }}
          surfaceView={false}
          projection="mercator"
          scaleBarEnabled={false}
        >
          <Camera
            defaultSettings={{
              zoomLevel: 15,
              pitch: 50,
            }}
            followUserLocation
            followZoomLevel={15}
          />
          <LocationPuck
            puckBearingEnabled
            puckBearing="heading"
            pulsing={{ isEnabled: true }}
          />
        </MapBox.MapView>
      </View>

      <View className="absolute top-10 inset-x-0 p-4">
        <TripTimer startedAt={tripData.startedAt} />
      </View>

      <TripBottomSheet
        tripData={tripData}
        isEnding={isEnding}
        gpsActive={true}
        isSocketConnected={socketHook.isConnected}
        onEndTrip={requestEndTrip}
        onSOSTrigger={handleSOSTrigger}
      />

      <ConfirmationSheet
        sheetRef={endTripSheetRef}
        isOpen={isSheetOpen}
        onClose={handleSheetClose}
        snapPoints={["25%"]}
        error={endTripError}
        onDismissError={dismissEndTripError}
        confirmTitle="Terminar viaje"
        confirmMessage="¿Seguro que quieres terminar el viaje?"
        confirmActions={
          <View className="flex-row gap-3">
            <Button
              title="Cancelar"
              variant="outline"
              className="flex-1"
              onPress={dismissEndConfirm}
              disabled={isEnding}
            />
            <Button
              title={isEnding ? "Terminando..." : "Terminar"}
              variant="destructive"
              className="flex-1"
              onPress={confirmEndTrip}
              disabled={isEnding}
            />
          </View>
        }
      />
    </View>
  );
}
