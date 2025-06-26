import { Navbar, CatManager, MealManager, SaveButton } from "../../components";
import { useCats, useMeals } from "../../hooks/useSupabase";

function Settings() {
  const { cats, loading: catsLoading, error: catsError } = useCats();
  const { meals, loading: mealsLoading, error: mealsError } = useMeals();

  const saveSettings = () => {
    // Settings are automatically saved to Supabase
    console.log("Settings are automatically saved to Supabase");
    alert("Settings saved successfully!");
  };

  if (catsLoading || mealsLoading) {
    return (
      <>
        <Navbar />
        <div className="sm:w-min lg:w-full px-5 py-28 mx-auto flex flex-col gap-4">
          <div className="bg-violet-800 border-violet-900 rounded-lg shadow-black shadow-lg p-4">
            <h1 className="text-2xl font-bold text-white text-center">Feeder Settings</h1>
            <p className="text-violet-200 text-center">Loading settings...</p>
          </div>
        </div>
      </>
    );
  }

  if (catsError || mealsError) {
    return (
      <>
        <Navbar />
        <div className="sm:w-min lg:w-full px-5 py-28 mx-auto flex flex-col gap-4">
          <div className="bg-violet-800 border-violet-900 rounded-lg shadow-black shadow-lg p-4">
            <h1 className="text-2xl font-bold text-white text-center">Feeder Settings</h1>
            <p className="text-red-400 text-center">
              Error loading settings: {catsError || mealsError}
            </p>
          </div>
        </div>
      </>
    );
  }

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
        <CatManager />

        {/* Meal Management */}
        <MealManager />

        {/* Save Button */}
        <SaveButton onSave={saveSettings} />
      </div>
    </>
  );
}

export default Settings;
