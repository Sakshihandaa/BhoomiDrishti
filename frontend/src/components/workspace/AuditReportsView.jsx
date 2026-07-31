import React from "react";

export default function AuditReportsView() {
  const reports = [
    {
      id: "BD-2026-891",
      sector: "Pharmaceutical Formulation",
      coords: "18.9224° N, 72.8347° E",
      score: "88% (Feasible)",
      status: "Approved",
      date: "2026-07-28",
    },
    {
      id: "BD-2026-742",
      sector: "Chemical Synthesis Unit",
      coords: "19.0760° N, 72.8777° E",
      score: "62% (Conditional)",
      status: "Review Required",
      date: "2026-07-24",
    },
    {
      id: "BD-2026-610",
      sector: "Thermal Power Plant",
      coords: "18.5204° N, 73.8567° E",
      score: "41% (High Risk)",
      status: "Blocked (ESZ)",
      date: "2026-07-18",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-xl font-bold text-slate-900">
          Feasibility Audit Reports
        </h1>
        <p className="text-xs text-slate-600 mt-0.5">
          Automated screening dossiers generated for regulatory submissions.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-stone-100 border-b border-stone-200 text-slate-700 font-bold">
              <th className="p-3.5">Report ID</th>
              <th className="p-3.5">Industry Sector</th>
              <th className="p-3.5">Coordinates</th>
              <th className="p-3.5">Clearance Score</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Date</th>
              <th className="p-3.5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 text-slate-700">
            {reports.map((item, idx) => (
              <tr key={idx} className="hover:bg-stone-50/50">
                <td className="p-3.5 font-mono text-slate-900 font-semibold">
                  {item.id}
                </td>
                <td className="p-3.5 font-medium">{item.sector}</td>
                <td className="p-3.5 font-mono text-slate-500">
                  {item.coords}
                </td>
                <td className="p-3.5 font-bold text-slate-800">{item.score}</td>
                <td className="p-3.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      item.status.includes("Approved")
                        ? "bg-emerald-100 text-emerald-800"
                        : item.status.includes("Review")
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3.5 text-slate-500">{item.date}</td>
                <td className="p-3.5">
                  <button className="text-amber-800 font-semibold hover:underline">
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
