// src/components/Features.jsx
import React from "react";

export default function Features() {
  const featuresList = [
    {
      icon: "🎯",
      title: "Automated EIA Screening",
      description:
        "Instantly evaluate land suitability against statutory EIA Notification threshold categories (Category A/B).",
    },
    {
      icon: "🛡️",
      title: "Eco-Buffer Zone Alert Engine",
      description:
        "Real-time proximity checks for 10km Eco-Sensitive Zones (ESZ), Ramsar wetlands, and wildlife corridors.",
      highlight: true,
    },
    {
      icon: "💧",
      title: "Industrial Utility Demand Load",
      description:
        "Compare daily water intake (m³/day) and power load against CGWB safe block thresholds and feeder lines.",
    },
    {
      icon: "🗺️",
      title: "Multi-Layer GIS Integration",
      description:
        "Seamless overlay of OpenStreetMap with state PCB boundaries, coastal CRZ, and forest mapping datasets.",
    },
    {
      icon: "📄",
      title: "Instant Feasibility Dossiers",
      description:
        "Export pre-clearance PDF audit reports ready for submission to regulatory bodies and consultants.",
    },
    {
      icon: "🏢",
      title: "Multi-Role Enterprise Access",
      description:
        "Tailored views and workflows for Project Proponents, Accredited Consultants, and State Regulators.",
    },
  ];

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      {/* 🌿 UPDATED BACKGROUND COLOR HERE */}
      <div className="bg-[#f2f7f2] border border-emerald-100/80 rounded-3xl p-8 sm:p-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Platform Capabilities & Statutory Tooling
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Built to eliminate pre-clearance bottlenecks through spatial
            intelligence.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {featuresList.map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                item.highlight
                  ? "border-emerald-700 ring-1 ring-emerald-700"
                  : "border-stone-200/80"
              }`}
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
