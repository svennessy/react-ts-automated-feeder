import { useState } from "react";
import DashboardCard from "../DashboardCard";
import { useCats, useMeals } from "../../hooks/useSupabase";

const MealManager: React.FC = () => {
  const { cats, loading: catsLoading, error: catsError } = useCats();
  const { meals, loading: mealsLoading, error: mealsError, addMeal, updateMeal, deleteMeal } = useMeals();
  
  const [newMealName, setNewMealName] = useState("");
  const [newMealTime, setNewMealTime] = useState("12:00");
  const [selectedCatId, setSelectedCatId] = useState<string>("");
  const [newMealPortions, setNewMealPortions] = useState(1);

  const handleAddMeal = async () => {
    if (newMealName.trim() && selectedCatId) {
      await addMeal({
        cat_id: selectedCatId,
        name: newMealName.trim(),
        time: newMealTime,
        portions: newMealPortions,
        is_active: true
      });
      setNewMealName("");
      setNewMealTime("12:00");
      setSelectedCatId("");
      setNewMealPortions(1);
    }
  };

  const handleRemoveMeal = async (id: string) => {
    await deleteMeal(id);
  };

  const handleToggleMeal = async (id: string, isActive: boolean) => {
    await updateMeal(id, { is_active: !isActive });
  };

  const handleUpdateMealTime = async (id: string, time: string) => {
    await updateMeal(id, { time });
  };

  const handleUpdateMealPortions = async (id: string, portions: number) => {
    await updateMeal(id, { portions: Math.max(1, portions) });
  };

  if (catsLoading || mealsLoading) {
    return (
      <DashboardCard>
        <div className="p-4">
          <h2 className="text-xl font-bold text-white mb-4">Meal Management</h2>
          <p className="text-violet-300 text-center py-4">Loading meals...</p>
        </div>
      </DashboardCard>
    );
  }

  if (catsError || mealsError) {
    return (
      <DashboardCard>
        <div className="p-4">
          <h2 className="text-xl font-bold text-white mb-4">Meal Management</h2>
          <p className="text-red-400 text-center py-4">
            Error: {catsError || mealsError}
          </p>
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard>
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-4">Meal Management</h2>
        
        {/* Add new meal */}
        <div className="space-y-3 mb-4 p-4 bg-violet-700 rounded-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMealName}
              onChange={(e) => setNewMealName(e.target.value)}
              placeholder="Enter meal name"
              className="flex-1 px-3 py-2 bg-violet-600 border border-violet-500 rounded-lg text-white placeholder-violet-300 focus:outline-none focus:border-violet-400"
              onKeyPress={(e) => e.key === "Enter" && handleAddMeal()}
            />
            <input
              type="time"
              value={newMealTime}
              onChange={(e) => setNewMealTime(e.target.value)}
              className="px-3 py-2 bg-violet-600 border border-violet-500 rounded-lg text-white focus:outline-none focus:border-violet-400"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCatId}
              onChange={(e) => setSelectedCatId(e.target.value)}
              className="flex-1 px-3 py-2 bg-violet-600 border border-violet-500 rounded-lg text-white focus:outline-none focus:border-violet-400"
            >
              <option value="">Select a cat</option>
              {cats.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={newMealPortions}
              onChange={(e) => setNewMealPortions(parseInt(e.target.value) || 1)}
              placeholder="Portions"
              className="w-24 px-3 py-2 bg-violet-600 border border-violet-500 rounded-lg text-white focus:outline-none focus:border-violet-400"
            />
            <button
              onClick={handleAddMeal}
              disabled={!newMealName.trim() || !selectedCatId}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              Add Meal
            </button>
          </div>
        </div>

        {/* Meal list */}
        <div className="space-y-4">
          {meals.map(meal => {
            const cat = cats.find(c => c.id === meal.cat_id);
            return (
              <div key={meal.id} className="p-4 bg-violet-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="time"
                      value={meal.time}
                      onChange={(e) => handleUpdateMealTime(meal.id, e.target.value)}
                      className="px-2 py-1 bg-violet-600 border border-violet-500 rounded text-white"
                    />
                    <span className="text-white font-medium">{meal.name}</span>
                    <span className="text-violet-300">for {cat?.name || 'Unknown Cat'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-violet-200">
                      <input
                        type="checkbox"
                        checked={meal.is_active}
                        onChange={() => handleToggleMeal(meal.id, meal.is_active)}
                        className="w-4 h-4 text-violet-600 bg-violet-700 border-violet-500 rounded focus:ring-violet-500"
                      />
                      Active
                    </label>
                    <button
                      onClick={() => handleRemoveMeal(meal.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Portions */}
                <div className="flex items-center gap-2">
                  <label className="text-violet-200 text-sm">Portions:</label>
                  <input
                    type="number"
                    min="1"
                    value={meal.portions}
                    onChange={(e) => handleUpdateMealPortions(meal.id, parseInt(e.target.value) || 1)}
                    className="w-16 px-2 py-1 bg-violet-600 border border-violet-500 rounded text-white text-center"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {meals.length === 0 && (
          <p className="text-violet-300 text-center py-4">No meals configured yet. Add your first meal above!</p>
        )}
      </div>
    </DashboardCard>
  );
};

export default MealManager; 