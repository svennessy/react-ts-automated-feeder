// used in MealProgress.tsx

import { useState } from "react";
import { red, green } from "../../assets";
import {
  calculateRotatedPosition,
  hasMealHappenedToday,
  getMealName,
  formatMealTime,
} from "./mealProgressHelpers";

interface MealDot {
  // a single dot in the progress circle with position (x, y) and hour
  x: number;
  y: number;
  hour: number; // you have (8, 16, and 22) hardcoded in mealProgressHelpers.ts for testing
}

interface MealDotsProps {
  // props passed from parent component MealProgress.tsx
  mealDots: MealDot[]; // array of MealDot objects
  activeMeals: boolean[]; // array of boolean values for each meal
  centerX: number; // center of the progress circle
  centerY: number; // center of the progress circle
  strokeWidth: number; // width of the progress circle
  rotationOffset: number; // offset of the progress circle (svg caused an aneuyrsm so hoops were jumped through)
  onToggleMeal: (index: number) => void;
}

// notes on Big O notation:
// O(1) - constant time (best)
// O(log n) - logarithmic time (good)
// O(n) - linear time (acceptable)
// O(n log n) - linearithmic time (acceptable)
// O(n^2) - quadratic time (bad)
// O(2^n) - exponential time (worst)
// O(n!) - factorial time (worst)

// describes performance of an algorithm as input size increases
// basically worst case scenarion for how long an algorithm takes to run as input gets bigger
// originally was using a switch statement (O(n) - time increases linearly with input size)
// hash table more efficient (O(1) - direct property access; always takes same amount of time regardless of input size)
// realistically for 3 items this is silly goose overkill but we're still gonna send it

// analogy:
// O(1) you have a mailbox with your name on it and go directly to it
// O(n) you have to search through all mailboxes to find your name

export const MealDots: React.FC<MealDotsProps> = ({
  mealDots,
  activeMeals,
  centerX,
  centerY,
  strokeWidth,
  rotationOffset,
  onToggleMeal,
}) => {
  // only ONE dot can be hovered at a time
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  // keeping inside component optimal for performance (no extra imports), simplicity (no parameter passing), and maintainability (logic stays with the component that uses it)
  const getMealData = (index: number) => {
    const mealHour = mealDots[index].hour;
    const hasHappened = hasMealHappenedToday(mealHour);
    const isManuallyToggled = activeMeals[index];

    // Calculate status once
    let status: "completed" | "manual" | "pending";
    if (hasHappened) {
      status = "completed";
    } else if (isManuallyToggled) {
      status = "manual";
    } else {
      status = "pending";
    }

    // Determine image
    const image = hasHappened || isManuallyToggled ? green : red;

    // Build tooltip text
    const mealName = getMealName(mealHour);
    const mealTime = formatMealTime(mealHour);
    const statusText =
      status === "completed"
        ? " (Completed)"
        : status === "manual"
        ? " (Marked as done)"
        : " (Pending)";
    const tooltip = `${mealName} - ${mealTime}${statusText}`;

    return {
      image,
      status,
      tooltip,
      isClickable: status !== "completed",
    };
  };

  return (
    <>
      {/* Meal time dots as images */}
      {mealDots.map((dot, index) => {
        const rotatedPosition = calculateRotatedPosition(
          dot,
          centerX,
          centerY,
          rotationOffset
        );

        const mealData = getMealData(index);
        {
          /* compares the currently hovered dot index with the current dot's index */
        }
        const isHovered = hoveredDot === index;
        {
          /* extreme overkill explanation:
        // Dot 0 (Breakfast):
        // - index = 0
        // - hoveredDot = 0 → isHovered = true ✅
        // - hoveredDot = 1 → isHovered = false ❌
        // - hoveredDot = 2 → isHovered = false ❌
        // - hoveredDot = null → isHovered = false ❌
        
        // Dot 1 (Lunch):
        // - index = 1
        // - hoveredDot = 0 → isHovered = false ❌
        // - hoveredDot = 1 → isHovered = true ✅
        // - hoveredDot = 2 → isHovered = false ❌
        // - hoveredDot = null → isHovered = false ❌
        
        // Dot 2 (Dinner):
        // - index = 2
        // - hoveredDot = 0 → isHovered = false ❌
        // - hoveredDot = 1 → isHovered = false ❌
        // - hoveredDot = 2 → isHovered = true ✅
        // - hoveredDot = null → isHovered = false ❌ */
        }

        return (
          <div
            key={index}
            className={`absolute cursor-pointer ${
              mealData.isClickable ? "" : "cursor-not-allowed"
            }`}
            style={{
              left: rotatedPosition.x - strokeWidth / 2,
              top: rotatedPosition.y - strokeWidth / 2,
              width: strokeWidth,
              height: strokeWidth,
              zIndex: 1000,
            }}
            onClick={() => {
              mealData.isClickable && onToggleMeal(index);
            }}
            onMouseEnter={() => {
              setHoveredDot(index);
            }}
            onMouseLeave={() => {
              setHoveredDot(null);
            }}
          >
            <img
              src={mealData.image}
              alt={`Meal ${index + 1} - ${mealData.status}`}
              className="w-full h-full object-contain p-[2px]"
            />

            {/* Only render tooltip if this specific dot is hovered */}
            {isHovered && (
              <div
                className="absolute bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg"
                style={{
                  top: "-35px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1001,
                  whiteSpace: "nowrap",
                }}
              >
                {mealData.tooltip}
                {/* Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};
