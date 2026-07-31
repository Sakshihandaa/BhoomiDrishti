import React from "react";

export function IndustryRegistrationSection() {
  return (
    <section className="py-20 bg-slate-950 border-t border-slate-800 text-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Industrial Entity Registration
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Register your enterprise on BhoomiDrishti to run automated EIA
            screening, access GIS eco-sensitive maps, and submit pre-clearance
            feasibility reports.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all">
            <div className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center text-sm mb-4 border border-emerald-800">
              1
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Corporate Identity
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Requires registered business details including Company CIN,
              Corporate PAN/TAN, and official headquarters address.
            </p>
            <span className="text-xs text-emerald-400 font-medium">
              Required Document: CIN Certificate
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all">
            <div className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center text-sm mb-4 border border-emerald-800">
              2
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Authorized Signatory
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Nodal officer verification via official corporate email domain and
              phone OTP authentication for audit trails.
            </p>
            <span className="text-xs text-emerald-400 font-medium">
              Required: Authorization Letter
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all">
            <div className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center text-sm mb-4 border border-emerald-800">
              3
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Project Specification
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Input project category (Red/Orange/Green), estimated power load
              (MW), and daily water consumption.
            </p>
            <span className="text-xs text-emerald-400 font-medium">
              Ready for: Instant Feasibility Audit
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
