import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@user_game_progress";

export function useGameProgress() {
  const [xp, setXp] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Load saved progress on startup
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (saved) {
        const parsed = JSON.parse(saved);
        setXp(parsed.xp ?? 0);
        setIsUnlocked(parsed.isUnlocked ?? false);
      }
    });
  }, []);

  // Add XP and trigger unlock at 100 XP
  const earnXp = async (amount: number) => {
    const nextXp = Math.min(xp + amount, 100);
    const unlocked = nextXp >= 100 || isUnlocked;

    setXp(nextXp);
    setIsUnlocked(unlocked);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ xp: nextXp, isUnlocked: unlocked })
    );
  };

  const resetProgress = async () => {
    setXp(0);
    setIsUnlocked(false);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return { xp, isUnlocked, earnXp, resetProgress };
}