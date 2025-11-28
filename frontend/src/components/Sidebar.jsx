// src/components/Sidebar.jsx
import { Wallet, BarChart3, PieChart } from "lucide-react";

const Sidebar = ({ activeView, setActiveView }) => {
  const navItemClasses = (isActive) =>
    `flex items-center gap-2 px-3 py-2 rounded-xl text-sm cursor-pointer ${
      isActive
        ? "bg-slate-800/70 text-slate-50"
        : "text-slate-400 hover:bg-slate-900/70 hover:text-slate-100"
    }`;

  return (
    <aside className="hidden md:flex md:flex-col w-60 bg-slate-950 border-r border-slate-800/60">
      <div className="px-5 py-4 flex items-center gap-2 border-b border-slate-800/60">
        <div className="h-9 w-9 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Wallet className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="font-semibold text-sm">ExpenseTracker</div>
          <div className="text-xs text-slate-400">Personal Finance</div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 text-sm space-y-1">
        <div
          className={navItemClasses(activeView === "dashboard")}
          onClick={() => setActiveView("dashboard")}
        >
          <BarChart3 className="h-4 w-4" />
          Dashboard
        </div>
        <div
          className={navItemClasses(activeView === "analytics")}
          onClick={() => setActiveView("analytics")}
        >
          <PieChart className="h-4 w-4" />
          Analytics
        </div>
      </nav>
      <div className="px-4 py-4 text-[11px] text-slate-500 border-t border-slate-800/60">
        🔗 GitHub: [Your Repo Link]
      </div>
    </aside>
  );
};

export default Sidebar;
