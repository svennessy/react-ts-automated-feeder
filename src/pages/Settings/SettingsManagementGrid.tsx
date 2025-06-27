import CatManager from "../../components/settings/CatManager";
import MealManager from "../../components/settings/MealManager";

const SettingsManagementGrid = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Cat Management */}
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-violet-500/20 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Cat Management</h2>
      </div>
      <CatManager />
    </div>

    {/* Meal Management */}
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Meal Management</h2>
      </div>
      <MealManager />
    </div>
  </div>
);

export default SettingsManagementGrid; 