interface SettingsStatsProps {
  catsCount: number;
  activeMealsCount: number;
}

const SettingsStats = ({ catsCount, activeMealsCount }: SettingsStatsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-violet-300 text-sm font-medium">Total Cats</p>
          <p className="text-3xl font-bold text-white">{catsCount}</p>
        </div>
        <div className="w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
      </div>
    </div>
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-violet-300 text-sm font-medium">Active Meals</p>
          <p className="text-3xl font-bold text-white">{activeMealsCount}</p>
        </div>
        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsStats; 