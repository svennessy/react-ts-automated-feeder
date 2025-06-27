import { ReactNode } from "react";

interface ErrorProps {
  message?: string;
  title?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  className?: string;
  showRetry?: boolean;
  onRetry?: () => void;
  children?: ReactNode;
}

const Error: React.FC<ErrorProps> = ({ 
  message = "An error occurred", 
  title = "Oops! Something went wrong",
  size = "md", 
  variant = "primary",
  className = "",
  showRetry = false,
  onRetry,
  children
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-8 h-8";
      case "lg":
        return "w-16 h-16";
      case "md":
      default:
        return "w-12 h-12";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-red-500/20 text-red-400";
      case "primary":
      default:
        return "bg-red-500/20 text-red-400";
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

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={`text-center py-8 ${className}`}>
      <div className={`${getSizeClasses()} ${getVariantClasses()} rounded-full flex items-center justify-center mx-auto mb-4`}>
        <svg className={`${size === "lg" ? "w-8 h-8" : size === "sm" ? "w-4 h-4" : "w-6 h-6"} ${getVariantClasses().split(' ')[1]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
      </div>
      {title && (
        <h3 className={`font-semibold mb-2 ${getTextSize()} text-white`}>
          {title}
        </h3>
      )}
      <p className={`${getVariantClasses().split(' ')[1]} ${getTextSize()}`}>
        {message}
      </p>
      {showRetry && (
        <button 
          onClick={handleRetry}
          className="mt-4 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors"
        >
          Try Again
        </button>
      )}
      {children}
    </div>
  );
};

export default Error; 