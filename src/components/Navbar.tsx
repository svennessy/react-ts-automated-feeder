import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: ReactNode;
  icon: ReactNode;
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
          <CustomLink 
            to="/" 
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            }
          >
            Home
          </CustomLink>
          <span className="text-violet-400 text-lg">|</span>
          <CustomLink 
            to="/Settings" 
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            }
          >
            Settings
          </CustomLink>
        </div>
      </div>
    </nav>
  );
}

function CustomLink({ to, children, icon, ...props }: CustomLinkProps) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <div className="relative inline-block">
      <Link
        to={to}
        className={`px-4 py-2 font-medium text-md transition-all duration-200 flex items-center gap-2 rounded-lg hover:bg-white/10 ${
          isActive ? "text-white bg-white/10" : "text-violet-200 hover:text-white"
        }`}
        {...props}
      >
        {icon}
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
