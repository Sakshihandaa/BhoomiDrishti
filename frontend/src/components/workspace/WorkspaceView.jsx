import React, { useState, useEffect } from "react";

export default function WorkspaceView() {
  const [industrySector, setIndustrySector] = useState(
    "Pharmaceutical Formulation",
  );
  const [waterReq, setWaterReq] = useState(650);
  const [powerLoad, setPowerLoad] = useState(8);

  useEffect(() => {
    if (!window.L) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => initMap();
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  const initMap = () => {
    const container = document.getElementById("leaflet-map");
    if (container && window.L && !container._leaflet_id) {
      const map = window.L.map("leaflet-map").setView([18.9224, 72.8347], 8);
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const sites = [
        {
          lat: 18.9224,
          lng: 72.8347,
          title: "Candidate Site A (Coastal Clearance)",
        },
        {
          lat: 19.076,
          lng: 72.8777,
          title: "Candidate Site B (Buffer Review)",
        },
      ];

      sites.forEach((s) => {
        window.L.marker([s.lat, s.lng])
          .addTo(map)
          .bindPopup(`<b>${s.title}</b>`);
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Site Assessment Workspace
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Evaluate candidate site coordinates against statutory regulatory
            overlays.
          </p>
        </div>
        <button className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-2xs">
          Run Feasibility Check
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
            ⚙️ Project Specifications
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Industry Sector
              </label>
              <select
                value={industrySector}
                onChange={(e) => setIndustrySector(e.target.value)}
                className="w-full bg-white border border-stone-300 text-xs rounded-lg p-2"
              >
                <option>Pharmaceutical Formulation</option>
                <option>Thermal Power Generation</option>
                <option>Chemical Synthesis Unit</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Water (m³/day)
                </label>
                <input
                  type="number"
                  value={waterReq}
                  onChange={(e) => setWaterReq(e.target.value)}
                  className="w-full bg-white border border-stone-300 text-xs rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Power (MW)
                </label>
                <input
                  type="number"
                  value={powerLoad}
                  onChange={(e) => setPowerLoad(e.target.value)}
                  className="w-full bg-white border border-stone-300 text-xs rounded-lg p-2"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-stone-50 border border-stone-200 rounded-xl p-5">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
            🗺️ Active Screening Layers
          </h3>
          <div className="grid sm:grid-cols-3 gap-2.5">
            {[
              "Groundwater Blocks",
              "10km ESZ Zone",
              "CRZ Coastal Map",
              "Wetland Buffer",
              "Power Grid Feeder",
              "Forest Cover",
            ].map((layer, idx) => (
              <label
                key={idx}
                className="flex items-center space-x-2 bg-white border border-stone-200 p-2.5 rounded-lg text-xs text-slate-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  defaultChecked
                  className="accent-emerald-700 rounded"
                />
                <span className="font-medium">{layer}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Candidate Site Spatial Map
          </span>
          <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            2 Sites Plotted
          </span>
        </div>
        <div
          id="leaflet-map"
          className="w-full h-96 rounded-lg border border-stone-200 z-10"
        ></div>
      </div>
    </div>
  );
}
