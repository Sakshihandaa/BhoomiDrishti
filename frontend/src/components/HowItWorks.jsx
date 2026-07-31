import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Project Profiling",
      desc: "Input sector category (Red/Orange/Green), water requirement (m³/day), and power load (MW).",
    },
    {
      num: "02",
      title: "GIS Spatial Screening",
      desc: "Automated analysis against CGWB groundwater maps, forest cover, and wetland buffer zones.",
    },
    {
      num: "03",
      title: "Risk & Audit Score",
      desc: "Real-time compliance rating generated against statutory environmental thresholds.",
    },
    {
      num: "04",
      title: "Dossier Export",
      desc: "Download standardized preliminary screening reports for environmental consultants and regulators.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-16 bg-white border-y border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Automated Statutory Screening Workflow
          </h2>
          <p className="text-xs text-slate-600 mt-2">
            From site coordinates to regulatory compliance in four structured
            steps.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-stone-50 border border-stone-200/80 rounded-xl p-5 relative"
            >
              <span className="text-2xl font-bold text-amber-800/25 block mb-2">
                {item.num}
              </span>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
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
