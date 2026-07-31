import React from "react";

export default function RegistrationInfo({ onRegisterClick }) {
  const steps = [
    {
      num: "1",
      title: "Corporate Verification",
      desc: "Validate organization via Corporate Identification Number (CIN), Corporate PAN, and registered address.",
      doc: "Required: CIN Certificate",
    },
    {
      num: "2",
      title: "Nodal Representative",
      desc: "Designate official signatory with domain-matched email and multi-factor mobile OTP authentication.",
      doc: "Required: Board Authorization",
    },
    {
      num: "3",
      title: "Project Mapping",
      desc: "Define industry classification, pollution index (Red/Orange/Green), water intake, and power requirements.",
      doc: "Output: Statutory Dossier",
    },
  ];

  return (
    // Change the top section tag to:
    <section
      id="onboarding"
      className="py-16 bg-[#E5E2D8]/80 rounded-3xl my-8 border border-stone-300/80 shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Industry Entity Onboarding Requirements
          </h2>
          <p className="text-xs text-slate-600 mt-2">
            Prerequisites for project proponents and accredited consultants to
            submit pre-clearance assessments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs"
            >
              <div className="w-8 h-8 rounded-full bg-[#2D5A27] text-white font-bold flex items-center justify-center text-xs mb-4">
                {item.num}
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {item.desc}
              </p>
              <span className="text-[11px] text-amber-800 font-semibold bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                {item.doc}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-8 max-w-2xl mx-auto text-center shadow-2xs">
          <h3 className="text-base font-bold text-slate-900 mb-1">
            Ready to Register Your Industrial Entity?
          </h3>
          <p className="text-xs text-slate-600 mb-5">
            Start running site evaluations and export certified audit dossiers.
          </p>
          <button
            onClick={onRegisterClick}
            className="bg-[#2D5A27] hover:bg-[#23481f] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-2xs transition-all"
          >
            Begin Registration
          </button>
        </div>
      </div>
    </section>
  );
}
