import React from "react";

export default function DataLayersView() {
  const datasets = [
    {
      title: "Central Ground Water Board (CGWB)",
      status: "Active (2026)",
      type: "Hydrology",
      desc: "Categorization of over-exploited, critical, semi-critical, and safe groundwater units.",
    },
    {
      title: "10km Eco-Sensitive Zones (ESZ)",
      status: "Protected Area",
      type: "Ecology",
      desc: "Demarcated boundaries around national parks, wildlife sanctuaries, and reserve forests.",
    },
    {
      title: "Coastal Regulation Zone (CRZ)",
      status: "CZMP Mapping",
      type: "Coastal",
      desc: "CRZ-I through CRZ-IV high tide line buffer classifications.",
    },
    {
      title: "Ramsar Wetlands Directory",
      status: "Protected Waterbody",
      type: "Wetland",
      desc: "500-meter statutory non-construction buffer around recognized wetlands.",
    },
    {
      title: "State Industrial Electricity Grids",
      status: "Feeder Capacity",
      type: "Utility",
      desc: "Available substation load capacity for heavy industrial connections.",
    },
    {
      title: "State PCB Air Quality Stations",
      status: "Monitoring Zone",
      type: "Air Quality",
      desc: "Baseline ambient air quality scores and non-attainment city flags.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-xl font-bold text-slate-900">
          GIS Regulatory Data Layers
        </h1>
        <p className="text-xs text-slate-600 mt-0.5">
          National environmental datasets utilized during automated spatial
          checks.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {datasets.map((layer, idx) => (
          <div
            key={idx}
            className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs hover:border-emerald-800 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {layer.status}
              </span>
              <span className="text-[10px] text-slate-400 font-mono uppercase">
                {layer.type}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">
              {layer.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {layer.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
