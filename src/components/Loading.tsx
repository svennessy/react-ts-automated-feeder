import { ReactNode } from "react";

interface LoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  className?: string;
  children?: ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ 
  text = "Loading...", 
  size = "md", 
  variant = "primary",
  className = "",
  children
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-6 w-6";
      case "lg":
        return "h-12 w-12";
      case "md":
      default:
        return "h-8 w-8";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "border-violet-400 text-violet-300";
      case "primary":
      default:
        return "border-green-400 text-violet-300";
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "lg":
        return "text-lg";
      case "md":
      default:
        return "text-base";
    }
  };

  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className={`animate-spin rounded-full ${getSizeClasses()} border-b-2 ${getVariantClasses()}`}></div>
      <span className={`ml-3 ${getTextSize()} ${getVariantClasses().split(' ')[1]}`}>
        {text}
      </span>
      {children}
    </div>
  );
};

export default Loading; 