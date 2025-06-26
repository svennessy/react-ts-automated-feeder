import { useState } from "react";
import DashboardCard from "../DashboardCard";
import { useCats } from "../../hooks/useSupabase";

const CatManager: React.FC = () => {
  const { cats, loading, error, addCat, updateCat, deleteCat } = useCats();
  const [newCatName, setNewCatName] = useState("");
  const [editingCat, setEditingCat] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleAddCat = async () => {
    if (newCatName.trim()) {
      await addCat(newCatName.trim());
      setNewCatName("");
    }
  };

  const handleRemoveCat = async (id: string) => {
    await deleteCat(id);
  };

  const startEditing = (cat: any) => {
    setEditingCat(cat.id);
    setEditName(cat.name);
  };

  const saveEdit = async () => {
    if (editName.trim() && editingCat) {
      await updateCat(editingCat, { name: editName.trim() });
      setEditingCat(null);
      setEditName("");
    }
  };

  const cancelEdit = () => {
    setEditingCat(null);
    setEditName("");
  };

  if (loading) {
    return (
      <DashboardCard>
        <div className="p-4">
          <h2 className="text-xl font-bold text-white mb-4">Cat Management</h2>
          <p className="text-violet-300 text-center py-4">Loading cats...</p>
        </div>
      </DashboardCard>
    );
  }

  if (error) {
    return (
      <DashboardCard>
        <div className="p-4">
          <h2 className="text-xl font-bold text-white mb-4">Cat Management</h2>
          <p className="text-red-400 text-center py-4">Error: {error}</p>
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard>
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-4">Cat Management</h2>
        
        {/* Add new cat */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="Enter cat name"
            className="flex-1 px-3 py-2 bg-violet-700 border border-violet-600 rounded-lg text-white placeholder-violet-300 focus:outline-none focus:border-violet-400"
            onKeyPress={(e) => e.key === "Enter" && handleAddCat()}
          />
          <button
            onClick={handleAddCat}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors"
          >
            Add Cat
          </button>
        </div>

        {/* Cat list */}
        <div className="space-y-3">
          {cats.map(cat => (
            <div key={cat.id} className="flex items-center gap-3 p-3 bg-violet-700 rounded-lg">
              {editingCat === cat.id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 px-2 py-1 bg-violet-600 border border-violet-500 rounded text-white"
                    onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                  />
                  <button
                    onClick={saveEdit}
                    className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white rounded text-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-white font-medium">{cat.name}</span>
                  <button
                    onClick={() => startEditing(cat)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveCat(cat.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {cats.length === 0 && (
          <p className="text-violet-300 text-center py-4">No cats added yet. Add your first cat above!</p>
        )}
      </div>
    </DashboardCard>
  );
};

export default CatManager; 