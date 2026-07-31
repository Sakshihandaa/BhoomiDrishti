import React, { useState } from "react";

export default function Header() {
  const [role, setRole] = useState("Industry / Proponent");

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-700 flex items-center justify-center font-bold text-white shadow-sm">
            BD
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white block leading-tight">
              BhoomiDrishti
            </span>
            <span className="text-xs text-emerald-400 font-medium">
              PreClear AI Portal
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a
            href="#overview"
            className="hover:text-emerald-400 transition-colors"
          >
            Overview
          </a>
          <a
            href="#feasibility"
            className="hover:text-emerald-400 transition-colors"
          >
            Feasibility Check
          </a>
          <a
            href="#layers"
            className="hover:text-emerald-400 transition-colors"
          >
            Data Layers
          </a>
          <a
            href="#registration"
            className="hover:text-emerald-400 transition-colors"
          >
            Registration Requirements
          </a>
        </nav>

        {/* User Role Selector & Action Buttons */}
        <div className="flex items-center space-x-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-slate-800 text-slate-200 text-xs font-medium px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500"
          >
            <option>Industry / Proponent</option>
            <option>Environmental Consultant</option>
            <option>Regulatory Official</option>
          </select>

          <button className="text-sm font-medium text-slate-200 hover:text-white px-3 py-2 rounded-lg transition-colors">
            Sign In
          </button>

          <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-md">
            Register Company
          </button>
        </div>
      </div>
    </header>
  );
}
