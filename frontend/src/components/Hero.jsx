import React from "react";

export default function Hero({ onStartAssessment }) {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-stone-100/60 to-[#FDFDFB]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full text-xs font-semibold text-amber-900">
            <span>🏛️ Regulatory Screening Engine</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            AI-Driven Environmental Pre-Clearance & Feasibility Platform
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Accelerate industrial project siting with automated GIS spatial
            analysis, statutory buffer checks, and EIA preliminary compliance
            scoring.
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <button
              onClick={onStartAssessment}
              className="bg-[#2D5A27] hover:bg-[#23481f] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition-all"
            >
              Start Free Siting Assessment
            </button>
            <a
              href="#how-it-works"
              className="bg-white border border-stone-300 hover:bg-stone-50 text-slate-700 text-xs font-semibold px-5 py-3 rounded-xl transition-all"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Preview Card (Simulated Dossier Card) */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-md relative">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
              <span className="text-[10px] font-mono text-slate-400 block">
                DOSSIER PREVIEW #BD-2026-X8
              </span>
              <span className="text-xs font-bold text-slate-800">
                Proposed Site: Sector 14 Industrial Belt
              </span>
            </div>
            <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-lg">
              88% Feasible
            </span>
          </div>

          <div className="space-y-3 py-4 text-xs">
            <div className="flex justify-between items-center text-slate-600">
              <span>Groundwater Buffer (CGWB)</span>
              <span className="font-semibold text-emerald-700">
                Clear (Safe Block)
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Eco-Sensitive Zone (10km Buffer)</span>
              <span className="font-semibold text-amber-700">
                12.4 km Away (Compliant)
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Coastal Regulation (CRZ Zone)</span>
              <span className="font-semibold text-emerald-700">
                Outside CRZ Boundary
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 text-center">
            <span className="text-[11px] text-slate-400 font-medium">
              Sign in to unlock interactive spatial GIS maps & PDF downloads
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
