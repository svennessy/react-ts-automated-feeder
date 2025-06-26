// used in Home.tsx

import { useMealProgress } from "./useMealProgress";
import { useMealState } from "./useMealState";
import { MealDots } from "./MealDots";
import { useMemo } from "react";
import {
  calculateTimeUntilNextMeal,
  formatTimeDisplay,
  calculateHorseshoeDimensions,
  calculateMealDotPositions,
  generateProgressPath,
  ROTATION_OFFSET,
} from "./mealProgressHelpers";

interface MealProgressProps {
  nextMealTime: Date;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

const MealProgress: React.FC<MealProgressProps> = ({
  nextMealTime,
  className = "",
  size = 200,
  strokeWidth = 12,
}) => {
  const { progress, timeUntilNextMeal } = useMealProgress(nextMealTime);
  const { hours, minutes } = timeUntilNextMeal;
  
  // Memoize calculations to prevent unnecessary recalculations
  const { radius, centerX, centerY, circumference } = useMemo(() =>
    calculateHorseshoeDimensions(size, strokeWidth),
    [size, strokeWidth]
  );
  
  const mealDots = useMemo(() =>
    calculateMealDotPositions(centerX, centerY, radius),
    [centerX, centerY, radius]
  );
  
  const progressPath = useMemo(() =>
    generateProgressPath(centerX, centerY, radius, progress),
    [centerX, centerY, radius, progress]
  );
  
  const { activeMeals, toggleMeal } = useMealState();

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          style={{ transform: `rotate(${ROTATION_OFFSET}deg)` }}
        >
          {/* Background horseshoe */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            stroke="#4c1d95"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={0}
            strokeLinecap="round"
            className="opacity-30"
          />

          {/* Progress indicator */}
          <path
            d={progressPath}
            stroke="#a855f7"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <MealDots
          mealDots={mealDots}
          activeMeals={activeMeals}
          centerX={centerX}
          centerY={centerY}
          strokeWidth={strokeWidth}
          rotationOffset={ROTATION_OFFSET}
          onToggleMeal={toggleMeal}
        />

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-sm font-medium text-gray-600 mb-1">
            Time until next meal
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {formatTimeDisplay(hours, minutes)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealProgress;
