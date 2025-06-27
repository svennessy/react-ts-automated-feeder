import { Navbar, Loading, Error } from "../../components";
import { useCats, useMeals } from "../../hooks/useSupabase";
import SettingsStats from "./SettingsStats";
import SettingsManagementGrid from "./SettingsManagementGrid";

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
                <Loading 
                  text="Getting everything ready for you..." 
                  size="lg" 
                  variant="secondary"
                  className="flex-col"
                >
                  <h1 className="text-3xl font-bold text-white mb-2 mt-4">Loading Settings</h1>
                </Loading>
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
                <Error 
                  message={catsError || mealsError || "An unknown error occurred"}
                  title="Oops! Something went wrong"
                  size="lg"
                  showRetry={true}
                />
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
            {/* <SettingsStats catsCount={cats.length} activeMealsCount={meals.filter(m => m.is_active).length} /> */}
            <SettingsManagementGrid />
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
