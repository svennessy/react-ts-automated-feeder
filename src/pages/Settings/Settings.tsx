import { Navbar } from "../../components";
import { useCats, useMeals } from "../../hooks/useSupabase";
import SettingsHeader from "./SettingsHeader";
import SettingsStats from "./SettingsStats";
import SettingsManagementGrid from "./SettingsManagementGrid";
import SettingsFooter from "./SettingsFooter";

function Settings() {
  const { cats, loading: catsLoading, error: catsError } = useCats();
  const { meals, loading: mealsLoading, error: mealsError } = useMeals();

  if (catsLoading || mealsLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
          <div className="container mx-auto px-6 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-600 rounded-full mb-6">
                  <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Loading Settings</h1>
                <p className="text-violet-300">Getting everything ready for you...</p>
              </div>
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
        <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
          <div className="container mx-auto px-6 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Oops! Something went wrong</h1>
                <p className="text-red-400 mb-4">{catsError || mealsError}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <SettingsHeader />
            <SettingsStats catsCount={cats.length} activeMealsCount={meals.filter(m => m.is_active).length} />
            <SettingsManagementGrid />
            <SettingsFooter />
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
