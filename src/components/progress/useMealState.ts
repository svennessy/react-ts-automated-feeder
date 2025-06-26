import { useState, useEffect } from "react";
import { getMealStatusForToday } from "./mealProgressHelpers";

// used in MealProgress.tsx

export const useMealState = (initialState?: boolean[]) => {
  const [activeMeals, setActiveMeals] = useState<boolean[]>(() => {
    // If no initial state provided, use current meal status for today
    return initialState || getMealStatusForToday();
  });

  // Update meal status every minute to reflect current time
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMeals(getMealStatusForToday());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const toggleMeal = (index: number) => {
    setActiveMeals((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return {
    activeMeals,
    toggleMeal,
  };
};
