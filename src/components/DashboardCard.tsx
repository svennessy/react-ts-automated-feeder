import { ReactNode } from "react";

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ children, className = "" }) => {
  return (
    <div className={`min-w-[370px] h-[250px] border bg-violet-800 border-violet-900 rounded-lg shadow-black shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default DashboardCard; 