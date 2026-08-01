// src/components/Features.jsx
import React from "react";

export default function Features() {
  const capabilities = [
    {
      icon: "🎯",
      title: "Automated EIA Screening",
      desc: "Instantly evaluate land suitability against statutory EIA Notification threshold categories (Category A/B).",
    },
    {
      icon: "🛡️",
      title: "Eco-Buffer Zone Alert Engine",
      desc: "Real-time proximity checks for 10km Eco-Sensitive Zones (ESZ), Ramsar wetlands, and wildlife corridors.",
    },
    {
      icon: "💧",
      title: "Industrial Utility Demand Load",
      desc: "Compare daily water intake (m³/day) and power load against CGWB safe block thresholds and feeder lines.",
    },
    {
      icon: "🗺️",
      title: "Multi-Layer GIS Integration",
      desc: "Seamless overlay of OpenStreetMap with state PCB boundaries, coastal CRZ, and forest mapping datasets.",
    },
    {
      icon: "📄",
      title: "Instant Feasibility Dossiers",
      desc: "Export pre-clearance PDF audit reports ready for submission to regulatory bodies and consultants.",
    },
    {
      icon: "🏢",
      title: "Multi-Role Enterprise Access",
      desc: "Tailored views and workflows for Project Proponents, Accredited Consultants, and State Regulators.",
    },
  ];

  return (
    <section id="capabilities" className="py-12 px-6 max-w-7xl mx-auto">
      <div className="bg-[#f2f7f2] border border-emerald-100/80 rounded-3xl p-8 sm:p-12 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Platform Capabilities & Statutory Tooling
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Built to eliminate pre-clearance bottlenecks through spatial
            intelligence.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-6 border border-stone-200/80 transition-all duration-300 hover:border-[#2D5A27] hover:shadow-md hover:-translate-y-1 cursor-pointer space-y-3"
            >
              <div className="text-2xl">{item.icon}</div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#2D5A27] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
