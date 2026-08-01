// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    // 🌿 LIGHT ECO-GREEN FOOTER BACKGROUND
    <footer className="bg-[#eaf3ea] border-t border-emerald-100/80 pt-12 pb-8 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-slate-600">
        <div className="col-span-2 md:col-span-1 space-y-2">
          <h4 className="font-bold text-slate-900 text-sm">BhoomiDrishti</h4>
          <p className="leading-relaxed">
            AI-driven environmental pre-clearance and statutory site feasibility
            analysis platform.
          </p>
        </div>

        <div className="space-y-2">
          <h5 className="font-bold text-slate-900">Platform</h5>
          <ul className="space-y-1.5">
            <li>
              <a href="#" className="hover:text-emerald-800">
                Workflow
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-800">
                Capabilities
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-800">
                Industry Onboarding
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h5 className="font-bold text-slate-900">Regulatory Sources</h5>
          <ul className="space-y-1.5">
            <li>
              <a href="#" className="hover:text-emerald-800">
                CGWB Groundwater Data
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-800">
                Eco-Sensitive Zone (ESZ) Maps
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-800">
                Coastal Zone CZMP Datasets
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h5 className="font-bold text-slate-900">Legal & Compliance</h5>
          <ul className="space-y-1.5">
            <li>
              <a href="#" className="hover:text-emerald-800">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-800">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-800">
                Helpdesk Support
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-emerald-200/50 mt-8 pt-6 text-center text-[11px] text-slate-500">
        © 2026 BhoomiDrishti PreClear AI. All rights reserved.
      </div>
    </footer>
  );
}
