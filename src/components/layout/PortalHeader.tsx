import { LogOut, HelpCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PortalHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="bg-header text-header-foreground border-b-2 border-border">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-6">
          <h1 className="text-sm font-bold tracking-wider">SUPPLIER COLLABORATION PORTAL</h1>
        </div>
        
        <div className="flex items-center gap-4 text-xs">
          <button className="hover:underline flex items-center gap-1">
            EN
          </button>
          <button className="hover:underline flex items-center gap-1">
            <User className="h-3 w-3" />
            UPPLNAME
          </button>
          <button className="hover:underline flex items-center gap-1">
            <HelpCircle className="h-3 w-3" />
          </button>
          <button onClick={handleLogout} className="hover:underline flex items-center gap-1">
            <LogOut className="h-3 w-3" />
          </button>
        </div>
      </div>
    </header>
  );
};
