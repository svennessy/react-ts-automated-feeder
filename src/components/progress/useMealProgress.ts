import { useEffect, useState, useMemo } from "react";
import { calculateTimeUntilNextMeal } from "./mealProgressHelpers";

// used in MealProgress.tsx

export const useMealProgress = (nextMealTime: Date) => {
  const [progress, setProgress] = useState(0);          // progress is a number between 0 and 100

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();
      
      // Calculate total seconds elapsed in the day
      const totalSecondsElapsed = (currentHour * 3600) + (currentMinute * 60) + currentSecond;
      const totalSecondsInDay = 24 * 3600; // 24 hours in seconds
      
      // Progress should increase as the day progresses
      const progressPercent = Math.max(0, Math.min(100, (totalSecondsElapsed / totalSecondsInDay) * 100));
      setProgress(progressPercent);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000);     // update progress every second

    return () => clearInterval(interval);                   // clear interval when component unmounts
  }, []);

  // Memoize time calculation to prevent unnecessary recalculations
  const timeUntilNextMeal = useMemo(() => 
    calculateTimeUntilNextMeal(nextMealTime), 
    [nextMealTime]
  );

  return {
    progress,
    timeUntilNextMeal
  };
}; 