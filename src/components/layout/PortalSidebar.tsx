import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const PortalSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-52 bg-secondary border-r-2 border-border text-xs">
      <nav className="p-2">
        <div className="mb-2">
          <Link
            to="/home"
            className={`block px-2 py-1.5 border border-border ${
              isActive("/home") ? "bg-muted font-semibold" : "hover:bg-muted/50"
            }`}
          >
            Dashboard
          </Link>
        </div>

        <div className="mb-1 px-2 py-1 bg-muted/50 border border-border font-semibold">
          Orders
        </div>
        <div className="pl-3 mb-2">
          <Link
            to="/order-rows"
            className={`flex items-center justify-between px-2 py-1.5 border border-border ${
              isActive("/order-rows") ? "bg-muted font-semibold" : "hover:bg-muted/50"
            }`}
          >
            Order Rows Dashboard
            <ChevronRight className="h-3 w-3" />
          </Link>
          <Link
            to="/orders"
            className={`flex items-center justify-between px-2 py-1.5 mt-1 border border-border ${
              isActive("/orders") ? "bg-muted font-semibold" : "hover:bg-muted/50"
            }`}
          >
            Orders Management
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mb-1 px-2 py-1 bg-muted/50 border border-border font-semibold">
          Invoices
        </div>
        <div className="pl-3 mb-2">
          <Link
            to="/invoices"
            className={`flex items-center justify-between px-2 py-1.5 border border-border ${
              isActive("/invoices") ? "bg-muted font-semibold" : "hover:bg-muted/50"
            }`}
          >
            Invoices List
            <ChevronRight className="h-3 w-3" />
          </Link>
          <Link
            to="/invoices/create"
            className={`flex items-center justify-between px-2 py-1.5 mt-1 border border-border ${
              isActive("/invoices/create") ? "bg-muted font-semibold" : "hover:bg-muted/50"
            }`}
          >
            Create Invoice from PO
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mb-1 px-2 py-1 bg-muted/50 border border-border font-semibold">
          Master Data
        </div>
        <div className="pl-3">
          <button className="flex items-center justify-between w-full px-2 py-1.5 border border-border hover:bg-muted/50">
            Suppliers
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </nav>
    </aside>
  );
};
