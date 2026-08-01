// src/components/IndustryRegistration.jsx
import React, { useState } from "react";

export default function IndustryRegistration({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    companyName: "",
    cinNumber: "",
    officialEmail: "",
    industryCategory: "Red",
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-stone-200 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-bold text-slate-900">
            Industrial Entity Registration
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Company / Entity Name
            </label>
            <input
              type="text"
              placeholder="e.g. GreenTech Industries Ltd."
              className="w-full border border-stone-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-[#2D5A27] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Corporate Identification Number (CIN)
            </label>
            <input
              type="text"
              placeholder="e.g. U12345MH2026PTC123456"
              className="w-full border border-stone-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-[#2D5A27] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nodal Officer Email
            </label>
            <input
              type="email"
              placeholder="nodal@company.com"
              className="w-full border border-stone-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-[#2D5A27] outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 text-slate-700 text-xs font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2D5A27] text-white text-xs font-semibold rounded-lg hover:bg-[#23481f]"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
