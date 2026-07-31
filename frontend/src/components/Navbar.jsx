import React from "react";

export default function Navbar({
  isAuthenticated,
  onLoginClick,
  onRegisterClick,
  onLogout,
  activeTab,
  setActiveTab,
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => setActiveTab(isAuthenticated ? "workspace" : "home")}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-[#2D5A27] flex items-center justify-center font-bold text-white shadow-sm text-sm">
            BD
          </div>
          <div>
            <span className="text-lg font-bold text-slate-900 leading-none block">
              BhoomiDrishti
            </span>
            <span className="text-[11px] text-amber-800 font-medium tracking-tight">
              Environmental Pre-Clearance
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        {isAuthenticated ? (
          <nav className="hidden md:flex items-center space-x-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-medium">
            <button
              onClick={() => setActiveTab("workspace")}
              className={`px-4 py-1.5 rounded-lg transition-all ${activeTab === "workspace" ? "bg-white text-emerald-900 font-semibold shadow-2xs" : "text-slate-600 hover:text-slate-900"}`}
            >
              Feasibility Workspace
            </button>
            <button
              onClick={() => setActiveTab("layers")}
              className={`px-4 py-1.5 rounded-lg transition-all ${activeTab === "layers" ? "bg-white text-emerald-900 font-semibold shadow-2xs" : "text-slate-600 hover:text-slate-900"}`}
            >
              GIS Data Layers
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`px-4 py-1.5 rounded-lg transition-all ${activeTab === "reports" ? "bg-white text-emerald-900 font-semibold shadow-2xs" : "text-slate-600 hover:text-slate-900"}`}
            >
              Audit Reports
            </button>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-600">
            <a
              href="#how-it-works"
              className="hover:text-emerald-900 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="hover:text-emerald-900 transition-colors"
            >
              Platform Capabilities
            </a>
            <a
              href="#onboarding"
              className="hover:text-emerald-900 transition-colors"
            >
              Industry Onboarding
            </a>
          </nav>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="bg-stone-200 hover:bg-stone-300 text-slate-800 text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all"
            >
              Sign Out
            </button>
          ) : (
            <>
              <button
                onClick={onLoginClick}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg"
              >
                Sign In
              </button>
              <button
                onClick={onRegisterClick}
                className="bg-[#2D5A27] hover:bg-[#23481f] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-2xs transition-all"
              >
                Register Entity
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
