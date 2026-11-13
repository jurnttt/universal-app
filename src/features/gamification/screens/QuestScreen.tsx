import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useGameProgress } from "../hooks/useGameProgress";

export function QuestScreen() {
  const { xp, isUnlocked, earnXp, resetProgress } = useGameProgress();

  // Shared animation values (60fps UI thread)
  const barWidth = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  const badgeScale = useSharedValue(0.8);

  // Animate progress meter smoothly whenever XP changes
  useEffect(() => {
    barWidth.value = withTiming(xp, { duration: 400 });
  }, [xp]);

  // Pop animation when reward unlocks
  useEffect(() => {
    if (isUnlocked) {
      badgeScale.value = withSpring(1, { damping: 8, stiffness: 150 });
    } else {
      badgeScale.value = 0.8;
    }
  }, [isUnlocked]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${barWidth.value}%`,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
    opacity: isUnlocked ? 1 : 0.35,
  }));

  return (
    <View className="flex-1 justify-center bg-slate-950 px-6">
      {/* Progress Meter Card */}
      <View className="mb-6 rounded-3xl bg-slate-900 p-6 border border-slate-800">
        <View className="flex-row justify-between mb-2">
          <Text className="text-white font-bold text-lg">Daily Quest XP</Text>
          <Text className="text-emerald-400 font-bold text-lg">{xp} / 100 XP</Text>
        </View>

        {/* Animated Progress Track */}
        <View className="h-4 w-full overflow-hidden rounded-full bg-slate-800">
          <Animated.View
            style={progressStyle}
            className="h-full rounded-full bg-emerald-500"
          />
        </View>
      </View>

      {/* Unlockable Reward Sequence */}
      <Animated.View
        style={badgeStyle}
        className={`mb-8 items-center rounded-3xl p-6 border ${
          isUnlocked
            ? "bg-amber-500/15 border-amber-400"
            : "bg-slate-900 border-slate-800"
        }`}
      >
        <Text className="text-4xl mb-2">{isUnlocked ? "🏆" : "🔒"}</Text>
        <Text className="text-white font-bold text-lg">
          {isUnlocked ? "Reward Unlocked: Gold Pioneer!" : "Reach 100 XP to Unlock"}
        </Text>
      </Animated.View>

      {/* Tactile Game-Like Action Button */}
      <Animated.View style={buttonStyle}>
        <Pressable
          onPressIn={() => (buttonScale.value = withSpring(0.93))}
          onPressOut={() => (buttonScale.value = withSpring(1))}
          onPress={() => earnXp(25)}
          disabled={isUnlocked}
          className={`items-center rounded-2xl py-4 ${
            isUnlocked ? "bg-slate-800" : "bg-indigo-600"
          }`}
        >
          <Text className="text-white font-bold text-base">
            {isUnlocked ? "Quest Complete!" : "Complete Action (+25 XP)"}
          </Text>
        </Pressable>
      </Animated.View>

      {/* Reset Trigger for Testing */}
      <Pressable onPress={resetProgress} className="mt-4 items-center py-2">
        <Text className="text-slate-400 text-sm">Reset Progress</Text>
      </Pressable>
    </View>
  );
}