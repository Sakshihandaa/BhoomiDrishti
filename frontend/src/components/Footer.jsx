import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-stone-300 bg-[#E2DFD3] py-12 text-xs text-slate-600 relative z-10">
      {" "}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <span className="text-slate-900 font-bold text-sm block mb-2">
            BhoomiDrishti
          </span>
          <p className="text-slate-500 text-xs leading-relaxed">
            AI-driven environmental pre-clearance and statutory site feasibility
            analysis platform.
          </p>
        </div>
        <div>
          <span className="text-slate-800 font-semibold block mb-2.5">
            Platform
          </span>
          <ul className="space-y-2">
            <li>
              <a
                href="#how-it-works"
                className="hover:text-emerald-800 transition-colors"
              >
                Workflow
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="hover:text-emerald-800 transition-colors"
              >
                Capabilities
              </a>
            </li>
            <li>
              <a
                href="#onboarding"
                className="hover:text-emerald-800 transition-colors"
              >
                Industry Onboarding
              </a>
            </li>
          </ul>
        </div>
        <div>
          <span className="text-slate-800 font-semibold block mb-2.5">
            Regulatory Sources
          </span>
          <ul className="space-y-2">
            <li>
              <span className="text-slate-500">CGWB Groundwater Data</span>
            </li>
            <li>
              <span className="text-slate-500">
                Eco-Sensitive Zone (ESZ) Maps
              </span>
            </li>
            <li>
              <span className="text-slate-500">Coastal Zone CZMP Datasets</span>
            </li>
          </ul>
        </div>
        <div>
          <span className="text-slate-800 font-semibold block mb-2.5">
            Legal & Compliance
          </span>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-emerald-800 transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-800 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-800 transition-colors">
                Helpdesk Support
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-stone-200 text-center text-slate-500">
        © {new Date().getFullYear()} BhoomiDrishti PreClear AI. All rights
        reserved.
      </div>
    </footer>
  );
}
