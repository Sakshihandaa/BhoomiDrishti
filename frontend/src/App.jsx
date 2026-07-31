import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import RegistrationInfo from "./components/RegistrationInfo";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";

import WorkspaceView from "./components/workspace/WorkspaceView";
import DataLayersView from "./components/workspace/DataLayersView";
import AuditReportsView from "./components/workspace/AuditReportsView";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const handleLoginClick = () => {
    setAuthMode("login");
    setShowAuthModal(true);
  };
  const handleRegisterClick = () => {
    setAuthMode("register");
    setShowAuthModal(true);
  };
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setIsAuthenticated(true);
    setActiveTab("workspace");
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab("home");
  };

  return (
    <div className="min-h-screen bg-[#FDFDFB] text-slate-800 font-sans antialiased flex flex-col justify-between">
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLoginClick={handleLoginClick}
          onRegisterClick={handleRegisterClick}
          onLogout={handleLogout}
        />

        <main className="max-w-7xl mx-auto px-6 py-8">
          {!isAuthenticated ? (
            <>
              <Hero onStartAssessment={handleRegisterClick} />
              <HowItWorks />
              <Features />
              <RegistrationInfo onRegisterClick={handleRegisterClick} />
            </>
          ) : (
            <>
              {activeTab === "workspace" && <WorkspaceView />}
              {activeTab === "layers" && <DataLayersView />}
              {activeTab === "reports" && <AuditReportsView />}
            </>
          )}
        </main>
      </div>

      <Footer />

      <AuthModal
        isOpen={showAuthModal}
        initialMode={authMode}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
