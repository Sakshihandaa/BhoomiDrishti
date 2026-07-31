import React, { useState } from "react";

export default function AuthModal({
  isOpen,
  onClose,
  initialMode,
  onAuthSuccess,
}) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuthSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold text-slate-900 mb-1">
          {mode === "login"
            ? "Industry Portal Login"
            : "Register Enterprise Entity"}
        </h2>
        <p className="text-xs text-slate-600 mb-5">
          {mode === "login"
            ? "Access your saved site audits and clearance dossiers."
            : "Enter corporate details to begin statutory screening."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === "register" && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Company / Entity Name
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Apex Biotech Pvt Ltd"
                className="w-full bg-stone-50 border border-stone-300 text-xs p-2.5 rounded-lg focus:ring-1 focus:ring-emerald-700"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Official Domain Email
            </label>
            <input
              required
              type="email"
              placeholder="nodal.officer@company.com"
              className="w-full bg-stone-50 border border-stone-300 text-xs p-2.5 rounded-lg focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="w-full bg-stone-50 border border-stone-300 text-xs p-2.5 rounded-lg focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2D5A27] hover:bg-[#23481f] text-white text-xs font-bold py-2.5 rounded-lg shadow-sm transition-all mt-2"
          >
            {mode === "login"
              ? "Sign In to Portal"
              : "Complete Entity Registration"}
          </button>
        </form>

        <div className="text-center mt-4 text-xs text-slate-600">
          {mode === "login" ? (
            <span>
              Don't have an entity account?{" "}
              <button
                onClick={() => setMode("register")}
                className="text-emerald-800 font-bold underline"
              >
                Register here
              </button>
            </span>
          ) : (
            <span>
              Already registered?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-emerald-800 font-bold underline"
              >
                Sign in
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
