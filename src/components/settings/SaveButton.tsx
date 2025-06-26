import DashboardCard from "../DashboardCard";

interface SaveButtonProps {
  onSave: () => void;
  disabled?: boolean;
  text?: string;
  loadingText?: string;
  variant?: 'primary' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
}

const SaveButton: React.FC<SaveButtonProps> = ({ 
  onSave, 
  disabled = false, 
  text = "Save",
  loadingText = "Saving...",
  variant = 'success',
  size = 'md'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return disabled 
          ? "bg-violet-600 cursor-not-allowed opacity-50" 
          : "bg-violet-600 hover:bg-violet-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl";
      case 'warning':
        return disabled 
          ? "bg-yellow-600 cursor-not-allowed opacity-50" 
          : "bg-yellow-600 hover:bg-yellow-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl";
      case 'success':
      default:
        return disabled 
          ? "bg-green-600 cursor-not-allowed opacity-50" 
          : "bg-green-600 hover:bg-green-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return "px-4 py-2 text-sm";
      case 'lg':
        return "px-10 py-4 text-lg";
      case 'md':
      default:
        return "px-6 py-3 text-base";
    }
  };

  return (
    <div className="mt-4 flex justify-center">
      <button
        onClick={onSave}
        disabled={disabled}
        className={`${getSizeClasses()} rounded-lg font-semibold text-white transition-all duration-200 ${getVariantClasses()}`}
      >
        {disabled ? loadingText : text}
      </button>
    </div>
  );
};

export default SaveButton; 