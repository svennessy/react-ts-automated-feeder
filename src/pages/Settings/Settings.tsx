import { Navbar, CatManager, MealManager } from "../../components";
import { useCats, useMeals } from "../../hooks/useSupabase";

function Settings() {
  const { cats, loading: catsLoading, error: catsError } = useCats();
  const { meals, loading: mealsLoading, error: mealsError } = useMeals();

  if (catsLoading || mealsLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-violet-900 to-purple-900 px-5 py-20">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <div className="bg-violet-800 border-violet-900 rounded-lg shadow-black shadow-lg p-4">
              <h1 className="text-2xl font-bold text-white text-center">Feeder Settings</h1>
              <p className="text-violet-200 text-center">Loading settings...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (catsError || mealsError) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-violet-900 to-purple-900 px-5 py-20">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <div className="bg-violet-800 border-violet-900 rounded-lg shadow-black shadow-lg p-4">
              <h1 className="text-2xl font-bold text-white text-center">Feeder Settings</h1>
              <p className="text-red-400 text-center">
                Error loading settings: {catsError || mealsError}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-violet-900 to-purple-900 px-5 py-20">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Header */}
          <div className="bg-violet-800 border-violet-900 rounded-lg shadow-black shadow-lg p-4">
            <h1 className="text-2xl font-bold text-white text-center">Feeder Settings</h1>
            <p className="text-violet-200 text-center">Manage cats and configure feeding times</p>
          </div>

          {/* Cat Management */}
          <CatManager />

          {/* Meal Management */}
          <MealManager />
        </div>
      </div>
    </>
  );
}

export default Settings;
