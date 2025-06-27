import { ReactNode } from "react";

interface SettingsCardProps {
  children: ReactNode;
  className?: string;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ children, className = "" }) => {
  return (
    <div className={`w-full border bg-violet-800 border-violet-900 rounded-lg shadow-black shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default SettingsCard; 