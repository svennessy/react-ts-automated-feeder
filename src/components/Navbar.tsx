import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: ReactNode;
}

function Navbar() {
  return (
    <nav className="w-full">
      <div className="max-w-4xl mx-auto pt-6">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            Automated Cat Feeder
          </h1>
          <p className="text-violet-200 mt-1">via Arduino and ESP8266</p>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center items-center space-x-8">
          <CustomLink to="/">Home</CustomLink>
          <span className="text-violet-400 text-lg">|</span>
          <CustomLink to="/Settings">Settings</CustomLink>
        </div>
      </div>
    </nav>
  );
}

function CustomLink({ to, children, ...props }: CustomLinkProps) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <div className="relative inline-block">
      <Link
        to={to}
        className={`px-2 py-0 font-medium text-md transition-all duration-200 ${
          isActive ? "text-white" : "text-violet-200 hover:text-white"
        }`}
        {...props}
      >
        {children}
      </Link>
      {/* Sliding underline */}
      <div
        className="absolute bottom-[-1/2] left-1/2 h-[.25rem] bg-violet-800 border-violet-900 transform transition-transform duration-300 ease-in-out"
        style={{
          transform: isActive
            ? "translateX(-50%) scaleX(1)"
            : "translateX(-50%) scaleX(0)",
          width: "80%",
        }}
      />
    </div>
  );
}

export default Navbar;
