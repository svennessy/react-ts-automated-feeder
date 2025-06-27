import { useState } from "react";
import DashboardCard from "../DashboardCard";
import SaveButton from "./SaveButton";
import { Loading, Error } from "../index";
import { useCats } from "../../hooks/useSupabase";

const CatManager: React.FC = () => {
  const { cats, loading, error, addCat, updateCat, deleteCat } = useCats();
  const [newCatName, setNewCatName] = useState("");
  const [editingCat, setEditingCat] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleAddCat = async () => {
    if (newCatName.trim()) {
      setIsSaving(true);
      await addCat(newCatName.trim());
      setNewCatName("");
      setIsSaving(false);
    }
  };

  const handleRemoveCat = async (id: string) => {
    setIsSaving(true);
    await deleteCat(id);
    setIsSaving(false);
  };

  const startEditing = (cat: any) => {
    setEditingCat(cat.id);
    setEditName(cat.name);
  };

  const saveEdit = async () => {
    if (editName.trim() && editingCat) {
      setIsSaving(true);
      await updateCat(editingCat, { name: editName.trim() });
      setEditingCat(null);
      setEditName("");
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditingCat(null);
    setEditName("");
  };

  const handleSave = () => {
    alert("Cat settings saved successfully!");
  };

  if (loading) {
    return (
      <DashboardCard>
        <div className="p-6">
          <Loading text="Loading cats..." variant="secondary" />
        </div>
      </DashboardCard>
    );
  }

  if (error) {
    return (
      <DashboardCard>
        <div className="p-6">
          <Error message={error || "An unknown error occurred"} />
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard>
      <div className="p-6">
        {/* Add new cat section */}
        <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-xl p-6 mb-6 border border-violet-500/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add New Cat
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="Enter cat name"
              className="flex-1 px-4 py-3 bg-white/10 border border-violet-500/30 rounded-lg text-white placeholder-violet-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 transition-all"
              onKeyPress={(e) => e.key === "Enter" && handleAddCat()}
            />
            <button
              onClick={handleAddCat}
              disabled={isSaving || !newCatName.trim()}
              className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Adding...
                </div>
              ) : (
                "Add Cat"
              )}
            </button>
          </div>
        </div>

        {/* Cat list */}
        <div className="space-y-4">
          {cats.map(cat => (
            <div key={cat.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-violet-500/30 transition-all duration-200">
              {editingCat === cat.id ? (
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/10 border border-violet-500/30 rounded-lg text-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
                    onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                  />
                  <button
                    onClick={saveEdit}
                    disabled={isSaving}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-800 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <span className="text-white font-medium text-lg">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEditing(cat)}
                      disabled={isSaving}
                      className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 disabled:bg-blue-500/10 text-blue-400 rounded-lg text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveCat(cat.id)}
                      disabled={isSaving}
                      className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 disabled:bg-red-500/10 text-red-400 rounded-lg text-sm font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {cats.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <p className="text-violet-300 text-lg mb-2">No cats added yet</p>
            <p className="text-violet-400 text-sm">Add your first cat above to get started!</p>
          </div>
        )}

        {/* Save Button */}
        <SaveButton 
          onSave={handleSave}
          disabled={isSaving}
          text="Save Cat Settings"
          loadingText="Saving..."
          variant="primary"
          size="sm"
        />
      </div>
    </DashboardCard>
  );
};

export default CatManager; 