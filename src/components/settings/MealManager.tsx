import { useState } from "react";
import SettingsCard from "../SettingsCard";
import SaveButton from "./SaveButton";
import { Loading, Error } from "../index";
import { useCats, useMeals } from "../../hooks/useSupabase";

const MealManager: React.FC = () => {
  const { cats, loading: catsLoading, error: catsError } = useCats();
  const { meals, loading: mealsLoading, error: mealsError, addMeal, updateMeal, deleteMeal } = useMeals();
  
  const [newMealName, setNewMealName] = useState("");
  const [newMealTime, setNewMealTime] = useState("12:00");
  const [selectedCatIds, setSelectedCatIds] = useState<string[]>([]);
  const [newMealPortions, setNewMealPortions] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const handleCatSelection = (catId: string) => {
    setSelectedCatIds(prev => 
      prev.includes(catId) 
        ? prev.filter(id => id !== catId)
        : [...prev, catId]
    );
  };

  const handleAddMeal = async () => {
    if (newMealName.trim() && selectedCatIds.length > 0) {
      setIsSaving(true);
      
      // Create a meal for each selected cat
      const mealPromises = selectedCatIds.map(catId => 
        addMeal({
          cat_id: catId,
          name: newMealName.trim(),
          time: newMealTime,
          portions: newMealPortions,
          is_active: true
        })
      );
      
      await Promise.all(mealPromises);
      
      // Reset form
      setNewMealName("");
      setNewMealTime("12:00");
      setSelectedCatIds([]);
      setNewMealPortions(1);
      setIsSaving(false);
    }
  };

  const handleRemoveMeal = async (id: string) => {
    setIsSaving(true);
    await deleteMeal(id);
    setIsSaving(false);
  };

  const handleToggleMeal = async (id: string, isActive: boolean) => {
    setIsSaving(true);
    await updateMeal(id, { is_active: !isActive });
    setIsSaving(false);
  };

  const handleUpdateMealTime = async (id: string, time: string) => {
    setIsSaving(true);
    await updateMeal(id, { time });
    setIsSaving(false);
  };

  const handleUpdateMealPortions = async (id: string, portions: number) => {
    setIsSaving(true);
    await updateMeal(id, { portions: Math.max(1, portions) });
    setIsSaving(false);
  };

  const handleSave = () => {
    alert("Meal settings saved successfully!");
  };

  // Group meals by name and time to show them together
  const groupedMeals = meals.reduce((groups, meal) => {
    const key = `${meal.name}-${meal.time}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(meal);
    return groups;
  }, {} as Record<string, typeof meals>);

  if (catsLoading || mealsLoading) {
    return (
      <SettingsCard>
        <div className="p-6">
          <Loading text="Loading meals..." variant="primary" />
        </div>
      </SettingsCard>
    );
  }

  if (catsError || mealsError) {
    return (
      <SettingsCard>
        <div className="p-6">
          <Error message={catsError || mealsError || "An unknown error occurred"} />
        </div>
      </SettingsCard>
    );
  }

  return (
    <SettingsCard>
      <div className="p-6">
        {/* Add new meal section */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 mb-6 border border-green-500/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add New Meal
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                value={newMealName}
                onChange={(e) => setNewMealName(e.target.value)}
                placeholder="Meal name (e.g., Breakfast, Dinner)"
                className="px-4 py-3 bg-white/10 border border-green-500/30 rounded-lg text-white placeholder-violet-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
                onKeyPress={(e) => e.key === "Enter" && handleAddMeal()}
              />
              <input
                type="time"
                value={newMealTime}
                onChange={(e) => setNewMealTime(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
              />
            </div>
            
            {/* Cat selection checkboxes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-violet-200 text-sm font-medium">Select cats for this meal:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cats.map(cat => (
                    <label key={cat.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-green-500/30 transition-all cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCatIds.includes(cat.id)}
                        onChange={() => handleCatSelection(cat.id)}
                        className="w-4 h-4 text-green-600 bg-white/10 border-green-500/30 rounded focus:ring-green-500/20"
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        </div>
                        <span className="text-white font-medium">{cat.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-violet-200 text-sm font-medium">Portions per cat:</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    value={newMealPortions}
                    onChange={(e) => setNewMealPortions(parseInt(e.target.value) || 1)}
                    placeholder="Portions per cat"
                    className="flex-1 px-4 py-3 bg-white/10 border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
                  />
                  <button
                    onClick={handleAddMeal}
                    disabled={!newMealName.trim() || selectedCatIds.length === 0 || isSaving}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
                  >
                    {isSaving ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Adding...
                      </div>
                    ) : (
                      `Add Meal${selectedCatIds.length > 1 ? 's' : ''}`
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meal list */}
        <div className="space-y-4">
          {Object.entries(groupedMeals).map(([key, mealGroup]) => {
            const firstMeal = mealGroup[0];
            const catNames = mealGroup.map(meal => {
              const cat = cats.find(c => c.id === meal.cat_id);
              return cat?.name || 'Unknown Cat';
            }).join(', ');
            
            return (
              <div key={key} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-green-500/30 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-lg">{firstMeal.name}</h4>
                      <p className="text-violet-300 text-sm">for {catNames}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-violet-200">
                      <input
                        type="checkbox"
                        checked={mealGroup.every(meal => meal.is_active)}
                        onChange={() => {
                          const newActiveState = !mealGroup.every(meal => meal.is_active);
                          mealGroup.forEach(meal => handleToggleMeal(meal.id, meal.is_active));
                        }}
                        disabled={isSaving}
                        className="w-4 h-4 text-green-600 bg-white/10 border-green-500/30 rounded focus:ring-green-500/20 disabled:opacity-50"
                      />
                      <span className="text-sm">Active</span>
                    </label>
                    <button
                      onClick={() => {
                        mealGroup.forEach(meal => handleRemoveMeal(meal.id));
                      }}
                      disabled={isSaving}
                      className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 disabled:bg-red-500/10 text-red-400 rounded-lg text-sm font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <label className="text-violet-200 text-sm font-medium">Time:</label>
                    <input
                      type="time"
                      value={firstMeal.time}
                      onChange={(e) => {
                        mealGroup.forEach(meal => handleUpdateMealTime(meal.id, e.target.value));
                      }}
                      disabled={isSaving}
                      className="px-3 py-2 bg-white/10 border border-green-500/30 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-violet-200 text-sm font-medium">Portions per cat:</label>
                    <input
                      type="number"
                      min="1"
                      value={firstMeal.portions}
                      onChange={(e) => {
                        mealGroup.forEach(meal => handleUpdateMealPortions(meal.id, parseInt(e.target.value) || 1));
                      }}
                      disabled={isSaving}
                      className="w-20 px-3 py-2 bg-white/10 border border-green-500/30 rounded-lg text-white text-center disabled:opacity-50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {meals.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <p className="text-violet-300 text-lg mb-2">No meals configured yet</p>
            <p className="text-violet-400 text-sm">Add your first meal above to get started!</p>
          </div>
        )}

        {/* Save Button */}
        <SaveButton 
          onSave={handleSave}
          disabled={isSaving}
          text="Save Meal Settings"
          loadingText="Saving..."
          variant="success"
          size="sm"
        />
      </div>
    </SettingsCard>
  );
};

export default MealManager; 