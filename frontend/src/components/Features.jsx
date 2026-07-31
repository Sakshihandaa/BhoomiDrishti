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
    // Change the top section tag from bg-[#FDFDFB] to:
    <section
      id="features"
      className="py-16 bg-[#ECEAE1]/70 backdrop-blur-xs rounded-3xl my-8 border border-stone-300/60 shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Platform Capabilities & Statutory Tooling
          </h2>
          <p className="text-xs text-slate-600 mt-2">
            Built to eliminate pre-clearance bottlenecks through spatial
            intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs hover:border-emerald-800 transition-all"
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="text-sm font-bold text-slate-900 mb-2.5">
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
