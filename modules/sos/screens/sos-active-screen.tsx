import { ConfirmationSheet } from "@/core/components/shared/confirmation-sheet";
import { Button } from "@/core/components/ui/button";
import useSocket from "@/core/hooks/use-socket";
import MapView from "@/modules/sos/components/map";
import { useTripTimer } from "@/modules/trips/hooks/use-trip-timer";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Phone } from "lucide-react-native";
import { useCallback, useMemo, useRef } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ResolveSOSButton } from "../components/resolve-sos-button";
import { SOSActionButtons } from "../components/sos-action-buttons";
import { SOSContactList } from "../components/sos-contact-list";
import { useSOSSession } from "../hooks/use-sos-session";

export function SOSActiveScreen() {
  const insets = useSafeAreaInsets();
  const socketHook = useSocket();

  const {
    hasSosAlert,
    isTriggering,
    triggerError,
    sosDetail,
    isLoading,
    isResolving,
    isResolveConfirmOpen,
    resolveError,
    requestResolve,
    confirmResolved,
    dismissResolveConfirm,
    dismissResolveError,
  } = useSOSSession(socketHook.socket);

  const resolveSheetRef = useRef<BottomSheetMethods | null>(null);

  const isSheetOpen = isResolveConfirmOpen || !!resolveError;

  const handleSheetClose = useCallback(
    (idx: number) => {
      if (idx === -1) {
        dismissResolveConfirm();
        dismissResolveError();
      }
    },
    [dismissResolveConfirm, dismissResolveError],
  );

  const primaryContact =
    sosDetail?.notifications?.find((n) => n.channel === "push") ?? null;

  const timerStartRef = useRef(new Date().toISOString());
  const { elapsed } = useTripTimer(
    sosDetail?.triggeredAt ?? timerStartRef.current,
  );

  const confirmActions = useMemo(
    () => (
      <View className="gap-4 flex-row justify-between w-full">
        <View className="flex-1">
          <Button
            title="No, mantener"
            variant="destructive"
            onPress={dismissResolveConfirm}
            disabled={isResolving}
          />
        </View>
        <View className="flex-1">
          <Button
            title={isResolving ? "Cancelando..." : "Sí, estoy bien"}
            variant="outline"
            onPress={confirmResolved}
            disabled={isResolving}
          />
        </View>
      </View>
    ),
    [isResolving, confirmResolved, dismissResolveConfirm],
  );

  if (isTriggering) {
    return (
      <View
        className="flex-1 bg-sos items-center justify-center"
        style={{ paddingTop: insets.top }}
      >
        <ActivityIndicator size="large" color="white" />
        <Text className="text-white text-lg font-semibold mt-4">
          Enviando alerta...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-sos">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom + 24,
          paddingHorizontal: 24,
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center gap-2">
          <View className="p-4 rounded-full bg-white/20 mb-1">
            <Phone size={32} color="white" fill="white" />
          </View>
          <Text className="text-3xl font-black text-white tracking-wider w-full text-center border-white/30 rounded-xl">
            ALERTA ENVIADA
          </Text>
          <Text className="text-white/70 text-xl py-2 my-1">
            Tus contactos han sido notificados
          </Text>
          <Text className="text-xl font-black text-white">{elapsed}</Text>
        </View>

        {triggerError && (
          <View className="bg-white/10 rounded-xl p-4">
            <Text className="text-white font-medium">
              Error: {triggerError}
            </Text>
          </View>
        )}

        {isLoading && !sosDetail && <ActivityIndicator color="white" />}
        {sosDetail && (
          <SOSContactList notifications={sosDetail.notifications} />
        )}

        <View className="rounded-2xl overflow-hidden h-36">
          <MapView />
        </View>

        <SOSActionButtons
          primaryContactPhone={primaryContact?.contactPhone}
          primaryContactName={primaryContact?.contactName}
        />

        {hasSosAlert && (
          <ResolveSOSButton
            isResolving={isResolving}
            onPress={requestResolve}
          />
        )}
      </ScrollView>

      <ConfirmationSheet
        sheetRef={resolveSheetRef}
        isOpen={isSheetOpen}
        onClose={handleSheetClose}
        snapPoints={["20%"]}
        error={resolveError}
        onDismissError={dismissResolveError}
        confirmTitle="¿Estás segura de que estás bien?"
        confirmActions={confirmActions}
      />
    </View>
  );
}
