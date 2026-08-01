// src/components/RegistrationInfo.jsx
import React from "react";

export default function RegistrationInfo({ onOpenModal }) {
  const steps = [
    {
      num: "1",
      title: "Corporate Verification",
      desc: "Validate organization via Corporate Identification Number (CIN), Corporate PAN, and registered address.",
      tag: "Required: CIN Certificate",
    },
    {
      num: "2",
      title: "Nodal Representative",
      desc: "Designate official signatory with domain-matched email and multi-factor mobile OTP authentication.",
      tag: "Required: Board Authorization",
    },
    {
      num: "3",
      title: "Project Mapping",
      desc: "Define industry classification, pollution index (Red/Orange/Green), water intake, and power requirements.",
      tag: "Output: Statutory Dossier",
    },
  ];

  return (
    <section
      id="onboarding"
      className="py-16 bg-[#f2f7f2] rounded-3xl my-8 border border-emerald-100/80 shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Industry Entity Onboarding Requirements
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Prerequisites for project proponents and accredited consultants to
            submit pre-clearance assessments.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-2xs space-y-4"
            >
              <span className="w-8 h-8 rounded-full bg-[#2D5A27] text-white text-xs font-bold flex items-center justify-center">
                {item.num}
              </span>
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
              <span className="inline-block bg-amber-50 text-amber-800 border border-amber-200/80 text-[10px] font-semibold px-2.5 py-1 rounded-md">
                {item.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Action Card */}
        <div className="bg-white rounded-2xl p-8 text-center max-w-xl mx-auto border border-emerald-100/80 shadow-2xs space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            Ready to Register Your Industrial Entity?
          </h3>
          <p className="text-xs text-slate-600">
            Start running site evaluations and export certified audit dossiers.
          </p>
          <button
            onClick={onOpenModal}
            className="bg-[#2D5A27] hover:bg-[#23481f] text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-all cursor-pointer"
          >
            Begin Registration
          </button>
        </div>
      </div>
    </section>
  );
}
