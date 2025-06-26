import { useState } from "react";
import DashboardCard from "../DashboardCard";

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

interface MealManagerProps {
  cats: Cat[];
  meals: Meal[];
  onMealsChange: (meals: Meal[]) => void;
}

const MealManager: React.FC<MealManagerProps> = ({ cats, meals, onMealsChange }) => {
  const [newMealName, setNewMealName] = useState("");
  const [newMealTime, setNewMealTime] = useState("12:00");

  const addMeal = () => {
    if (newMealName.trim()) {
      const newMeal: Meal = {
        id: Date.now().toString(),
        name: newMealName.trim(),
        time: newMealTime,
        enabled: true,
        cats: cats.map(cat => ({ ...cat, portions: cat.portions || 1 })),
      };
      onMealsChange([...meals, newMeal]);
      setNewMealName("");
      setNewMealTime("12:00");
    }
  };

  const removeMeal = (id: string) => {
    onMealsChange(meals.filter(meal => meal.id !== id));
  };

  const toggleMeal = (id: string) => {
    onMealsChange(
      meals.map(meal =>
        meal.id === id ? { ...meal, enabled: !meal.enabled } : meal
      )
    );
  };

  const updateMealTime = (id: string, time: string) => {
    onMealsChange(
      meals.map(meal =>
        meal.id === id ? { ...meal, time } : meal
      )
    );
  };

  const updateCatPortions = (mealId: string, catId: string, portions: number) => {
    onMealsChange(
      meals.map(meal =>
        meal.id === mealId
          ? {
              ...meal,
              cats: meal.cats.map(cat =>
                cat.id === catId ? { ...cat, portions: Math.max(1, portions) } : cat
              )
            }
          : meal
      )
    );
  };

  const toggleCatInMeal = (mealId: string, cat: Cat) => {
    onMealsChange(
      meals.map(meal =>
        meal.id === mealId
          ? {
              ...meal,
              cats: meal.cats.find(c => c.id === cat.id)
                ? meal.cats.filter(c => c.id !== cat.id)
                : [...meal.cats, { ...cat, portions: cat.portions || 1 }]
            }
          : meal
      )
    );
  };

  return (
    <DashboardCard>
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-4">Meal Management</h2>
        
        {/* Add new meal */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newMealName}
            onChange={(e) => setNewMealName(e.target.value)}
            placeholder="Enter meal name"
            className="flex-1 px-3 py-2 bg-violet-700 border border-violet-600 rounded-lg text-white placeholder-violet-300 focus:outline-none focus:border-violet-400"
            onKeyPress={(e) => e.key === "Enter" && addMeal()}
          />
          <input
            type="time"
            value={newMealTime}
            onChange={(e) => setNewMealTime(e.target.value)}
            className="px-3 py-2 bg-violet-700 border border-violet-600 rounded-lg text-white focus:outline-none focus:border-violet-400"
          />
          <button
            onClick={addMeal}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors"
          >
            Add Meal
          </button>
        </div>

        {/* Meal list */}
        <div className="space-y-4">
          {meals.map(meal => (
            <div key={meal.id} className="p-4 bg-violet-700 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <input
                    type="time"
                    value={meal.time}
                    onChange={(e) => updateMealTime(meal.id, e.target.value)}
                    className="px-2 py-1 bg-violet-600 border border-violet-500 rounded text-white"
                  />
                  <span className="text-white font-medium">{meal.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-violet-200">
                    <input
                      type="checkbox"
                      checked={meal.enabled}
                      onChange={() => toggleMeal(meal.id)}
                      className="w-4 h-4 text-violet-600 bg-violet-700 border-violet-500 rounded focus:ring-violet-500"
                    />
                    Enabled
                  </label>
                  <button
                    onClick={() => removeMeal(meal.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Cat assignments */}
              <div className="space-y-2">
                <h4 className="text-violet-200 font-medium">Cat Portions:</h4>
                {cats.map(cat => {
                  const mealCat = meal.cats.find(c => c.id === cat.id);
                  const isAssigned = !!mealCat;
                  
                  return (
                    <div key={cat.id} className="flex items-center gap-3 p-2 bg-violet-600 rounded">
                      <label className="flex items-center gap-2 text-white">
                        <input
                          type="checkbox"
                          checked={isAssigned}
                          onChange={() => toggleCatInMeal(meal.id, cat)}
                          className="w-4 h-4 text-violet-600 bg-violet-700 border-violet-500 rounded focus:ring-violet-500"
                        />
                        {cat.name}
                      </label>
                      {isAssigned && (
                        <div className="flex items-center gap-2 ml-auto">
                          <label className="text-violet-200 text-sm">Portions:</label>
                          <input
                            type="number"
                            min="1"
                            value={mealCat.portions}
                            onChange={(e) => updateCatPortions(meal.id, cat.id, parseInt(e.target.value) || 1)}
                            className="w-16 px-2 py-1 bg-violet-700 border border-violet-500 rounded text-white text-center"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {meals.length === 0 && (
          <p className="text-violet-300 text-center py-4">No meals configured yet. Add your first meal above!</p>
        )}
      </div>
    </DashboardCard>
  );
};

export default MealManager; 