import { useState } from "react";
import DashboardCard from "../DashboardCard";

interface Cat {
  id: string;
  name: string;
  portions?: number;
}

interface CatManagerProps {
  cats: Cat[];
  onCatsChange: (cats: Cat[]) => void;
}

const CatManager: React.FC<CatManagerProps> = ({ cats, onCatsChange }) => {
  const [newCatName, setNewCatName] = useState("");
  const [editingCat, setEditingCat] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const addCat = () => {
    if (newCatName.trim()) {
      const newCat: Cat = {
        id: Date.now().toString(),
        name: newCatName.trim(),
        portions: 1,
      };
      onCatsChange([...cats, newCat]);
      setNewCatName("");
    }
  };

  const removeCat = (id: string) => {
    onCatsChange(cats.filter(cat => cat.id !== id));
  };

  const startEditing = (cat: Cat) => {
    setEditingCat(cat.id);
    setEditName(cat.name);
  };

  const saveEdit = () => {
    if (editName.trim() && editingCat) {
      onCatsChange(
        cats.map(cat =>
          cat.id === editingCat ? { ...cat, name: editName.trim() } : cat
        )
      );
      setEditingCat(null);
      setEditName("");
    }
  };

  const cancelEdit = () => {
    setEditingCat(null);
    setEditName("");
  };

  const updatePortions = (id: string, portions: number) => {
    onCatsChange(
      cats.map(cat =>
        cat.id === id ? { ...cat, portions: Math.max(1, portions) } : cat
      )
    );
  };

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
            onKeyPress={(e) => e.key === "Enter" && addCat()}
          />
          <button
            onClick={addCat}
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
                  <div className="flex items-center gap-2">
                    <label className="text-violet-200 text-sm">Portions:</label>
                    <input
                      type="number"
                      min="1"
                      value={cat.portions || 1}
                      onChange={(e) => updatePortions(cat.id, parseInt(e.target.value) || 1)}
                      className="w-16 px-2 py-1 bg-violet-600 border border-violet-500 rounded text-white text-center"
                    />
                  </div>
                  <button
                    onClick={() => startEditing(cat)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeCat(cat.id)}
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