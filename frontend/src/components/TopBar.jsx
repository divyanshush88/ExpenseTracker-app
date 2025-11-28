// src/components/TopBar.jsx
import { Moon, SunMedium } from "lucide-react";
import { useState } from "react";

const TopBar = () => {
  const [dark, setDark] = useState(true);

  return (
    <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur border-b border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="text-xs sm:text-sm text-slate-400">
          Welcome back, <span className="text-slate-100 font-medium">Divyanshu</span> 👋
        </div>
        <button
          onClick={() => setDark((d) => !d)}
          className="inline-flex items-center gap-1 text-xs border border-slate-700 rounded-xl px-3 py-1.5 hover:bg-slate-800"
        >
          {dark ? <Moon className="h-3 w-3" /> : <SunMedium className="h-3 w-3" />}
          <span>{dark ? "Dark" : "Light"} mode</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
