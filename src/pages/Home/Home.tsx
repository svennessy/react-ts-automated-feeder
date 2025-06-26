import {
  Clock,
  Navbar,
  DashboardCard,
  MealProgress,
} from "../../components";
import { useState } from "react";

interface DashboardItem {
  id: string;
  component: React.ReactNode;
  innerClassName?: string;
}

function Home() {
  const [nextMealTime, setNextMealTime] = useState<Date>(() => {
    // Set default next meal time to 4:00 PM today
    const now = new Date();
    const nextMeal = new Date();
    nextMeal.setHours(16, 0, 0, 0); // 4:00 PM

    // If it's already past 4 PM, set it to tomorrow
    if (now.getHours() >= 16) {
      nextMeal.setDate(nextMeal.getDate() + 1);
    }

    return nextMeal;
  });

  const dashboardItems: DashboardItem[] = [
    /* {
      id: "lights",
      component: <Lights />,
    }, */
    {
      id: "clock",
      component: <Clock />,
      innerClassName: "w-[340px] h-[220px] rounded-lg ml-[.85em] bg-black",
    },
    /* {
      id: "countdown",
      component: <Countdown />,
    }, */
  ];

  return (
    <>
      <Navbar />
      <div className="lg:w-full mx-auto flex flex-wrap justify-around items-center z-0">
        <div className="flex w-full min-h-[50vh] items-center justify-center ">
          <MealProgress
            nextMealTime={nextMealTime}
            size={360}
            strokeWidth={22}
          />
        </div>
        {dashboardItems.map((item) => (
          <DashboardCard key={item.id}>
            <div className={item.innerClassName || ""}>{item.component}</div>
          </DashboardCard>
        ))}
      </div>
    </>
  );
}

export default Home;
