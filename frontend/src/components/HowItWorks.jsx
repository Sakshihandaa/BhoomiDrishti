// src/components/HowItWorks.jsx
import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Project Profiling",
      desc: "Input sector category (Red/Orange/Green), water requirement (m³/day), and power load (MW).",
    },
    {
      step: "02",
      title: "GIS Spatial Screening",
      desc: "Automated analysis against CGWB groundwater maps, forest cover, and wetland buffer zones.",
    },
    {
      step: "03",
      title: "Risk & Audit Score",
      desc: "Real-time compliance rating generated against statutory environmental thresholds.",
    },
    {
      step: "04",
      title: "Dossier Export",
      desc: "Download standardized preliminary screening reports for environmental consultants and regulators.",
    },
  ];

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      {/* 🌿 LIGHT GREEN CONTAINER WRAPPER */}
      <div className="bg-[#f2f7f2] border border-emerald-100/80 rounded-3xl p-8 sm:p-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Automated Statutory Screening Workflow
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            From site coordinates to regulatory compliance in four structured
            steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-stone-200/80 shadow-2xs"
            >
              <span className="text-2xl font-black text-amber-800/40 block mb-2">
                {s.step}
              </span>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                {s.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
