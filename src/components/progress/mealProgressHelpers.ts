// helper functions for MealProgress.tsx

// Constants
export const MEAL_TIMES = [8, 16, 22] as const;           // 8am, 4pm, 10pm
export const HORSESHOE_ARC_ANGLE = 270;                   // 3/4 circle
export const ROTATION_OFFSET = HORSESHOE_ARC_ANGLE / 2;   // center circle opening around vertical axis (270/2 = 135)


// meal utility functions
export const MEAL_NAMES: Record<number, string> = {       // object with number keys and string values
  8: "Breakfast",
  16: "Lunch",
  22: "Dinner",
};

export const getMealName = (hour: number): string => {    // take in num param called hour and return string
  return MEAL_NAMES[hour] || `Meal at ${hour}:00`;        // ie getMealName(8) -> Breakfast or getMealName(10) -> Meal at 10:00
};

export const formatMealTime = (hour: number): string => {               // convert 24 hour to 12 format
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;   // handle midnight and noon
  return `${displayHour}:00 ${period}`;
};


// time calculation functions
export const calculateTimeUntilNextMeal = (                            
  nextMealTime: Date
): { hours: number; minutes: number } => {
  const now = new Date();                                               // input is a Date object
  const timeDifferenceMs = nextMealTime.getTime() - now.getTime();      // get the difference in milliseconds between the next meal time and the current time

  const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));        // convert milliseconds to hours
  const minutes = Math.floor(
    (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)                 // convert milliseconds to minutes
  );

  return { hours, minutes };                                            // output is an object with hours and minutes
};

export const formatTimeDisplay = (hours: number, minutes: number): string => {  // inputs are two numbers
  if (hours > 0) {                 
    return `${hours}h ${minutes}m`;                                             // ie formatTimeDisplay(1, 30) -> 1h 30m
  } else if (minutes > 0) {
    return `${minutes}m`;                                                       // ie formatTimeDisplay(0, 30) -> 30m
  } else {
    return "Now!";                                                              // ie formatTimeDisplay(0, 0) -> Now!
  }
};


// meal status functions
export const hasMealHappenedToday = (mealHour: number): boolean => {   // input is a number
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Convert meal hour to minutes for easier comparison
  const mealTimeInMinutes = mealHour * 60;
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  // output is a boolean
  return currentTimeInMinutes >= mealTimeInMinutes;                    // ie hasMealHappenedToday(8) -> true
};

export const getMealStatusForToday = (): boolean[] => {                   // output is an array of booleans
  return MEAL_TIMES.map((mealHour) => hasMealHappenedToday(mealHour));    // ie getMealStatusForToday() -> [true, false, false]
};


// geometry functions
export const calculateHorseshoeDimensions = (              // calculate the dimensions of the horseshoe
  size: number,                                            // total component size ie 300px
  strokeWidth: number                                      // width of the progress bar ie 10px
) => {
  const radius = (size - strokeWidth) / 2;                 // radius of the horseshoe ie (300px - 10px) / 2 = 145px
  const centerX = size / 2;
  const centerY = size / 2;
  const circumference = radius * Math.PI * 1.5;            // length of 3/4 circle (for stroke-dasharray)

  return { radius, centerX, centerY, circumference };
};

export const calculateMealDotPositions = (                             // used in MealDots.tsx
  centerX: number,                                                     // x coordinate of the center of the horseshoe
  centerY: number,                                                     // y coordinate of the center of the horseshoe
  radius: number                                                       // radius of the horseshoe
) => {
  return MEAL_TIMES.map((hour) => {                                    // example with input (150, 150, 145) & breakfast (8)
    const progress = (hour / 24) * 100;                                // convert hour to percentage (8/24 * 100 = 33.33333333333333)
    const angle = (progress / 100) * HORSESHOE_ARC_ANGLE;              // convert percentage to angle (33.33333333333333 / 100 * 270 = 90)
    const x = centerX + radius * Math.cos((angle * Math.PI) / 180);    // calculate x coordinate (150 + 145 * cos(90 * PI / 180) = 150)
    const y = centerY + radius * Math.sin((angle * Math.PI) / 180);    // calculate y coordinate (150 + 145 * sin(90 * PI / 180) = 150)
    return { x, y, hour };                                             // ie calculateMealDotPositions(150, 150, 145) -> {x: 150, y: 150, hour: 8}
  });
};

export const calculateRotatedPosition = (                              // used in MealDots.tsx
  dot: { x: number; y: number },                                       // x and y coordinates of the dot
  centerX: number,                                                     // x coordinate of the center of the horseshoe
  centerY: number,                                                     // y coordinate of the center of the horseshoe
  rotationOffset: number                                               // rotation offset (135 degrees)
) => {                                                                 // ex. calculateRotatedPosition({x: 140, y: 140}, 150, 150, 135)
  const rotatedX =                                                     // calculate x coordinate of the rotated dot
    centerX +                                                          // 150 +
    (dot.x - centerX) * Math.cos((rotationOffset * Math.PI) / 180) -   // (140 - 150) * cos(135 * PI / 180) = -10 * -0.7071067811865476 = 7.0710678118654755 -
    (dot.y - centerY) * Math.sin((rotationOffset * Math.PI) / 180);    // (140 - 150) * sin(135 * PI / 180) = -10 * 0.7071067811865476 = -7.0710678118654755 = -17.0710678118654755
  const rotatedY =                                                     // calculate y coordinate of the rotated dot
    centerY +                                                          // 150 +
    (dot.x - centerX) * Math.sin((rotationOffset * Math.PI) / 180) +   // (140 - 150) * sin(135 * PI / 180) = -10 * 0.7071067811865476 = -7.0710678118654755 +
    (dot.y - centerY) * Math.cos((rotationOffset * Math.PI) / 180);    // (140 - 150) * cos(135 * PI / 180) = -10 * -0.7071067811865476 = 7.0710678118654755 = 17.0710678118654755

  return { x: rotatedX, y: rotatedY };                                 // ie calculateRotatedPosition({x: 140, y: 140}, 150, 150, 135) -> {x: 132.92893218813452, y: 147.07106781186547}
};


// svg path functions
export const generateProgressPath = (
  centerX: number,
  centerY: number,
  radius: number,
  progress: number                                                              // progress is a number between 0 and 100
): string => {
  const progressAngle = (progress / 100) * HORSESHOE_ARC_ANGLE;                 // convert progress to angle (33.33333333333333 / 100 * 270 = 90)
  const endX = centerX + radius * Math.cos((progressAngle * Math.PI) / 180);    // calculate x coordinate of the end of the progress path
  const endY = centerY + radius * Math.sin((progressAngle * Math.PI) / 180);    // calculate y coordinate of the end of the progress path
  const largeArcFlag = progressAngle > 180 ? 1 : 0;                             // determine if the path is a large arc (1) or small arc (0)

  return `M ${                                                                  // M: start of the path
    centerX + radius                                                            // A: arc command with radius, flags, and end coordinates
  } ${centerY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;      // ie generateProgressPath(150, 150, 145, 33.33333333333333) -> M 150 150 A 145 145 0 0 1 132.92893218813452 147.07106781186547
};
