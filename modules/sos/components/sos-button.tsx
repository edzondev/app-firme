import * as Haptics from "expo-haptics";
import { useCallback, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const SOS_HOLD_DURATION = 3000;

interface SOSButtonProps {
  onTrigger: () => void;
  disabled?: boolean;
}

export function SOSButton({ onTrigger, disabled }: SOSButtonProps) {
  const [isPressing, setIsPressing] = useState(false);
  const progress = useSharedValue(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hapticIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startPress = useCallback(() => {
    if (disabled) return;

    setIsPressing(true);
    progress.value = withTiming(1, { duration: SOS_HOLD_DURATION });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    hapticIntervalRef.current = setInterval(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, 500);

    timerRef.current = setTimeout(() => {
      if (hapticIntervalRef.current) clearInterval(hapticIntervalRef.current);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      onTrigger();
      setIsPressing(false);
      progress.value = 0;
    }, SOS_HOLD_DURATION);
  }, [disabled, onTrigger, progress]);

  const cancelPress = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (hapticIntervalRef.current) clearInterval(hapticIntervalRef.current);
    cancelAnimation(progress);
    progress.value = withTiming(0, { duration: 200 });
    setIsPressing(false);
  }, [progress]);

  const progressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + progress.value * 0.15 }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 2]) }],
    opacity: interpolate(progress.value, [0, 1], [0.5, 0]),
  }));

  return (
    <View className="items-center gap-2 mt-6">
      <View className="relative items-center justify-center">
        <Animated.View
          style={[ringStyle]}
          className="absolute w-28 h-28 rounded-full bg-sos"
        />
        <Pressable
          onPressIn={startPress}
          onPressOut={cancelPress}
          disabled={disabled}
        >
          <Animated.View
            style={[progressStyle]}
            className="w-24 h-24 rounded-full bg-sos items-center justify-center shadow-lg shadow-sos"
          >
            <Text className="text-white text-2xl font-black">SOS</Text>
          </Animated.View>
        </Pressable>
      </View>
      <Text className="text-xs text-gray-500 mt-4">
        {isPressing ? "Mantén presionado..." : "Mantén presionado 3 segundos"}
      </Text>
    </View>
  );
}
