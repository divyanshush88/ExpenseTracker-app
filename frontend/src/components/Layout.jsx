// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const Layout = ({ children, activeView, setActiveView }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 px-4 sm:px-8 py-6 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
