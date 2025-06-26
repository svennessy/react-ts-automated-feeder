import { Navbar, CatManager, MealManager, SaveButton } from "../../components";
import { useState, useEffect } from "react";

interface Cat {
  id: string;
  name: string;
  portions?: number;
}

interface MealCat {
  id: string;
  name: string;
  portions: number;
}

interface Meal {
  id: string;
  name: string;
  time: string;
  enabled: boolean;
  cats: MealCat[];
}

function Settings() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);

  // Update meals when cats change
  useEffect(() => {
    // Add new cats to existing meals
    setMeals(prevMeals => 
      prevMeals.map(meal => ({
        ...meal,
        cats: [
          ...meal.cats,
          ...cats.filter(cat => !meal.cats.find(mealCat => mealCat.id === cat.id))
            .map(cat => ({ ...cat, portions: 1 }))
        ]
      }))
    );
  }, [cats]);

  const saveSettings = () => {
    // Here you would save to backend/localStorage
    console.log("Saving settings:", { cats, meals });
    alert("Settings saved successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="sm:w-min lg:w-full px-5 py-28 mx-auto flex flex-col gap-4">
        {/* Header */}
        <div className="bg-violet-800 border-violet-900 rounded-lg shadow-black shadow-lg p-4">
          <h1 className="text-2xl font-bold text-white text-center">Feeder Settings</h1>
          <p className="text-violet-200 text-center">Manage cats and configure feeding times</p>
        </div>

        {/* Cat Management */}
        <CatManager cats={cats} onCatsChange={setCats} />

        {/* Meal Management */}
        <MealManager cats={cats} meals={meals} onMealsChange={setMeals} />

        {/* Save Button */}
        <SaveButton onSave={saveSettings} />
      </div>
    </>
  );
}

export default Settings;
