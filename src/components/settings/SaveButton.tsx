import DashboardCard from "../DashboardCard";

interface SaveButtonProps {
  onSave: () => void;
  disabled?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onSave, disabled = false }) => {
  return (
    <DashboardCard>
      <div className="p-4 flex justify-center">
        <button
          onClick={onSave}
          disabled={disabled}
          className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
            disabled
              ? "bg-gray-600 cursor-not-allowed opacity-50"
              : "bg-green-600 hover:bg-green-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          }`}
        >
          {disabled ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </DashboardCard>
  );
};

export default SaveButton; 