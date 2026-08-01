// src/components/Hero.jsx
import React from "react";

function HeroImageWithOverlay() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-2xl bg-stone-100 max-w-lg w-full h-[380px] group">
      <img
        src="/park-lujiazui-financial-centre.jpg"
        alt="Environmental Site Planning"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

      {/* 🌿 LIGHT GREEN OVERLAY BADGE HERE */}
      <div className="absolute bottom-4 left-4 right-4 bg-[#f2f7f2]/95 backdrop-blur-md border border-emerald-200/60 p-4 rounded-xl shadow-lg flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded border border-emerald-300/60 uppercase tracking-wider">
            Active Site Screening
          </span>
          <h5 className="text-xs font-bold text-slate-900 mt-1">
            Sector 14 Industrial Belt
          </h5>
          <p className="text-[11px] text-slate-600">
            Compliant with CGWB & 10km ESZ Buffers
          </p>
        </div>

        <div className="text-right">
          <span className="text-lg font-bold text-emerald-800 block">88%</span>
          <span className="text-[10px] text-slate-500 font-medium">
            Feasible
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold text-amber-900 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300 inline-flex items-center gap-1.5">
            🏛️ Regulatory Screening Engine
          </span>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            AI-Driven Environmental Pre-Clearance & Feasibility Platform
          </h1>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Accelerate industrial project siting with automated GIS spatial
            analysis, statutory buffer checks, and EIA preliminary compliance
            scoring.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="bg-[#2D5A27] hover:bg-[#23481f] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer">
              Start Free Siting Assessment
            </button>
            <button className="bg-white hover:bg-stone-50 text-slate-800 font-bold text-sm px-6 py-3 rounded-xl border border-stone-300 transition-all cursor-pointer">
              Learn More
            </button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroImageWithOverlay />
        </div>
      </div>
    </section>
  );
}
