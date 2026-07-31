import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import {
  Database,
  FileText,
  BarChart3,
  MapPin,
  Zap,
  Droplets,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  RefreshCw,
  Layers,
  UserCheck,
  ChevronDown,
  LogIn,
  ExternalLink,
  ArrowUpRight,
  SlidersHorizontal,
} from "lucide-react";

const createCustomIcon = (color) => {
  return L.divIcon({
    className: "custom-pin",
    html: `<div style="background-color:${color}; width:16px; height:16px; border-radius:50%; border:2px solid white; box-shadow:0 2px 4px rgba(0,0,0,0.25);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

export default function App() {
  const [activeTab, setActiveTab] = useState("projects");

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: "Sakshi Handa",
    role: "applicant",
    organization: "GreenCore Industrial Dev",
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Feasibility state
  const [industry, setIndustry] = useState("Pharmaceutical Formulation");
  const [dailyWater, setDailyWater] = useState(650);
  const [peakPower, setPeakPower] = useState(8);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Add Site Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSiteName, setNewSiteName] = useState("");
  const [newSiteLat, setNewSiteLat] = useState("17.6868");
  const [newSiteLng, setNewSiteLng] = useState("83.2185");
  const [newSiteWaterCap, setNewSiteWaterCap] = useState(300);
  const [newSitePowerCap, setNewSitePowerCap] = useState(15);

  const [activeLayers, setActiveLayers] = useState({
    cgwa: true,
    discom: true,
    esz: true,
    coastal: true,
    wetlands: true,
    population: true,
  });

  const [sites, setSites] = useState([
    {
      id: "A",
      name: "Sanand Industrial Estate, Gujarat",
      lat: 22.9868,
      lng: 72.3693,
      baseWaterCap: 1000,
      basePowerCap: 30,
      ecoScore: 92,
      zoneType: "SAFE",
      communityRisk: "Low",
      historicalPrecedent: null,
    },
    {
      id: "B",
      name: "Dahej PCPIR Region, Gujarat",
      lat: 21.7107,
      lng: 72.5936,
      baseWaterCap: 200,
      basePowerCap: 8,
      ecoScore: 40,
      zoneType: "CRITICAL",
      communityRisk: "High",
      historicalPrecedent:
        "Dahej API cluster experienced a 14-month clearance delay due to CRZ buffer proximity & severe groundwater draw restrictions.",
    },
    {
      id: "C",
      name: "SIPCOT Complex, Tamil Nadu",
      lat: 12.8342,
      lng: 79.7026,
      baseWaterCap: 500,
      basePowerCap: 20,
      ecoScore: 84,
      zoneType: "SEMI-CRITICAL",
      communityRisk: "Moderate",
      historicalPrecedent: null,
    },
    {
      id: "D",
      name: "Vizag Industrial Node, AP",
      lat: 17.6868,
      lng: 83.2185,
      baseWaterCap: 180,
      basePowerCap: 10,
      ecoScore: 48,
      zoneType: "OVER-EXPLOITED",
      communityRisk: "Critical",
      historicalPrecedent:
        "Vizag Precedent: Aquifer depletion prompted mandatory ZLD (Zero Liquid Discharge) mandates for new industrial filings.",
    },
  ]);

  const industryProfiles = [
    { name: "Pharmaceutical Formulation", water: 650, power: 8 },
    { name: "Bulk Drug / API Manufacturing", water: 1200, power: 15 },
    { name: "Textile Processing & Dyeing", water: 450, power: 12 },
    { name: "Semiconductor Fabrication", water: 2000, power: 80 },
    { name: "Heavy Engineering & Foundry", water: 250, power: 45 },
    { name: "Automobile Assembly Unit", water: 400, power: 25 },
  ];

  const handleIndustryChange = (e) => {
    const selected = industryProfiles.find((p) => p.name === e.target.value);
    setIndustry(selected.name);
    setDailyWater(selected.water);
    setPeakPower(selected.power);
  };

  const toggleLayer = (key) =>
    setActiveLayers((prev) => ({ ...prev, [key]: !prev[key] }));

  const calculateMetrics = (site) => {
    let waterScore = Math.max(
      10,
      Math.min(100, Math.round((site.baseWaterCap / (dailyWater || 1)) * 50)),
    );
    let waterLabel =
      waterScore > 75
        ? "Safe Extraction"
        : waterScore > 40
          ? "Semi-Critical"
          : "Over-Exploited";
    let waterBadgeColor =
      waterScore > 75
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : waterScore > 40
          ? "bg-amber-50 text-amber-700 border-amber-200"
          : "bg-rose-50 text-rose-700 border-rose-200";

    const powerMargin = site.basePowerCap - peakPower;
    let powerScore = Math.max(
      10,
      Math.min(100, Math.round((site.basePowerCap / (peakPower || 1)) * 50)),
    );
    let powerLabel =
      powerMargin >= 0
        ? `${site.basePowerCap} MW Available`
        : `${Math.abs(powerMargin)} MW Deficit`;
    let powerBadgeColor =
      powerMargin >= 0
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : "bg-rose-50 text-rose-700 border-rose-200";

    let penalty = activeLayers.esz ? 5 : 0;
    if (activeLayers.coastal && site.name.includes("Dahej")) penalty += 15;
    if (activeLayers.population && site.communityRisk === "Critical")
      penalty += 15;

    let overallScore = Math.max(
      10,
      Math.min(
        100,
        Math.round(
          waterScore * 0.4 + powerScore * 0.4 + site.ecoScore * 0.2 - penalty,
        ),
      ),
    );
    let markerColor =
      overallScore >= 75
        ? "#059669"
        : overallScore >= 50
          ? "#d97706"
          : "#dc2626";

    let cgwaWarning = null;
    if (dailyWater > site.baseWaterCap) {
      cgwaWarning = `Requested water allocation (${dailyWater} m³/day) exceeds safe statutory threshold (${site.baseWaterCap} m³/day) in this ${site.zoneType} zone. CGWA clearance approval unlikely without ZLD setup.`;
    }

    return {
      ...site,
      overallScore,
      markerColor,
      cgwaWarning,
      water: { label: waterLabel, color: waterBadgeColor },
      power: { label: powerLabel, color: powerBadgeColor },
    };
  };

  const computedSites = sites.map(calculateMetrics);

  const handleAddSite = (e) => {
    e.preventDefault();
    if (!newSiteName) return;
    setSites([
      ...sites,
      {
        id: String.fromCharCode(65 + sites.length),
        name: newSiteName,
        lat: parseFloat(newSiteLat),
        lng: parseFloat(newSiteLng),
        baseWaterCap: Number(newSiteWaterCap),
        basePowerCap: Number(newSitePowerCap),
        ecoScore: 80,
        zoneType: "SEMI-CRITICAL",
        communityRisk: "Moderate",
        historicalPrecedent: null,
      },
    ]);
    setShowAddModal(false);
    setNewSiteName("");
  };

  const handleSwitchUser = (role, name, org) => {
    setCurrentUser({ role, name, organization: org });
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 font-sans flex flex-col justify-between">
      {/* FIXED HIGH Z-INDEX HEADER (FIXES LEAFLET SCROLL OVERLAP) */}
      <header className="sticky top-0 z-[10000] bg-stone-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-stone-800 shadow-md">
        <div className="flex items-center gap-8">
          <div
            className="flex items-center gap-2 text-lg font-bold cursor-pointer"
            onClick={() => setActiveTab("projects")}
          >
            <span className="text-emerald-400">🛡️</span>
            <span className="font-extrabold tracking-tight">PreClear AI</span>
          </div>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {[
              {
                id: "projects",
                label: "Feasibility Workspace",
                icon: BarChart3,
              },
              { id: "datalayers", label: "Data Layers", icon: Database },
              { id: "reports", label: "Audit Reports", icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs transition ${
                  activeTab === tab.id
                    ? "bg-stone-800 text-amber-400 font-semibold"
                    : "text-stone-300 hover:bg-stone-800 hover:text-white"
                }`}
              >
                <tab.icon size={15} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 border border-stone-700 px-3 py-1.5 rounded-md text-xs font-medium text-stone-200 transition"
              >
                <span className="font-semibold text-white">
                  {currentUser.name}
                </span>
                <span className="text-[10px] bg-stone-900 text-stone-400 px-1.5 py-0.5 rounded border border-stone-700 uppercase font-mono">
                  {currentUser.role}
                </span>
                <ChevronDown size={14} className="text-stone-400" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-60 bg-white border border-stone-200 rounded-lg shadow-lg p-2 z-[10001] text-xs text-stone-800">
                  <div className="p-2.5 border-b border-stone-100 bg-stone-50 rounded mb-1">
                    <p className="font-bold text-stone-900">
                      {currentUser.name}
                    </p>
                    <p className="text-stone-500 text-[11px]">
                      {currentUser.organization}
                    </p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-200 text-stone-700">
                      Role:{" "}
                      {currentUser.role === "applicant"
                        ? "Applicant Portal"
                        : "Regulator Portal"}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setShowAuthModal(true);
                    }}
                    className="w-full text-left px-3 py-2 text-stone-700 hover:bg-stone-100 rounded flex items-center justify-between font-medium"
                  >
                    <span>Switch Role / Sign In</span>
                    <UserCheck size={14} className="text-stone-500" />
                  </button>
                  <button
                    onClick={() => {
                      setIsAuthenticated(false);
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 rounded font-medium mt-0.5"
                  >
                    Log Out Session
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-stone-950 font-bold px-3.5 py-1.5 rounded-md text-xs transition"
            >
              <LogIn size={14} /> Sign In
            </button>
          )}
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 space-y-6">
        {/* --- TAB 1: FEASIBILITY WORKSPACE --- */}
        {activeTab === "projects" && (
          <>
            {/* TOP BAR */}
            <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-lg font-bold text-stone-900">
                  Site Assessment & Environmental Clearance Workspace
                </h1>
                <p className="text-xs text-stone-500 mt-0.5">
                  Evaluate potential project locations against statutory
                  regulatory thresholds and ecological constraints.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-semibold px-3.5 py-2 rounded-md transition flex items-center gap-1.5"
                >
                  + Add Location
                </button>
                <button
                  onClick={() => {
                    setIsAnalyzing(true);
                    setTimeout(() => setIsAnalyzing(false), 400);
                  }}
                  className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-4 py-2 rounded-md transition flex items-center gap-1.5"
                >
                  <RefreshCw
                    size={13}
                    className={isAnalyzing ? "animate-spin" : ""}
                  />{" "}
                  Run Feasibility Check
                </button>
              </div>
            </div>

            {/* PARAMETERS & TOGGLES */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white border border-stone-200 rounded-lg p-5 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-wide text-stone-600 mb-3 flex items-center gap-1.5">
                  <SlidersHorizontal size={14} /> Project Specifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="md:col-span-2">
                    <label className="block text-stone-600 font-medium mb-1">
                      Industry Sector
                    </label>
                    <select
                      value={industry}
                      onChange={handleIndustryChange}
                      className="w-full bg-stone-50 border border-stone-300 rounded-md p-2.5 text-stone-800 font-medium outline-none focus:border-stone-500"
                    >
                      {industryProfiles.map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1 flex items-center gap-1">
                      <Droplets size={13} /> Daily Water Requirement (m³/day)
                    </label>
                    <input
                      type="number"
                      value={dailyWater}
                      onChange={(e) => setDailyWater(Number(e.target.value))}
                      className="w-full p-2 bg-stone-50 border border-stone-300 rounded-md font-semibold text-stone-800"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1 flex items-center gap-1">
                      <Zap size={13} /> Estimated Power Load (MW)
                    </label>
                    <input
                      type="number"
                      value={peakPower}
                      onChange={(e) => setPeakPower(Number(e.target.value))}
                      className="w-full p-2 bg-stone-50 border border-stone-300 rounded-md font-semibold text-stone-800"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white border border-stone-200 rounded-lg p-5 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-wide text-stone-600 mb-3 flex items-center gap-1.5">
                  <Layers size={14} /> Active Assessment Layers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: "cgwa", label: "Groundwater Classification" },
                    { id: "esz", label: "10km Eco-Sensitive Zone" },
                    { id: "discom", label: "Grid Feeder Capacity" },
                    { id: "coastal", label: "Coastal Regulation Zone" },
                    { id: "population", label: "High Dependency Zone" },
                    { id: "wetlands", label: "Wetland Buffer Zone" },
                  ].map((layer) => (
                    <label
                      key={layer.id}
                      className="flex items-center gap-2 cursor-pointer hover:bg-stone-50 p-1.5 rounded transition"
                    >
                      <input
                        type="checkbox"
                        checked={activeLayers[layer.id]}
                        onChange={() => toggleLayer(layer.id)}
                        className="rounded border-stone-300 accent-stone-800 w-3.5 h-3.5"
                      />
                      <span className="text-stone-700 font-medium">
                        {layer.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* FULL WIDTH MAP WITH Z-INDEX CONTAINER FIX */}
            <div className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-sm z-0 relative">
              <div className="bg-stone-50 px-5 py-3 border-b border-stone-200 flex justify-between items-center">
                <h2 className="text-xs font-bold uppercase tracking-wide text-stone-600 flex items-center gap-1.5">
                  <Layers size={14} /> Candidate Site Overview
                </h2>
                <span className="text-xs text-stone-500 font-medium">
                  {computedSites.length} Locations Assessment
                </span>
              </div>
              <div className="h-[380px] w-full relative z-0">
                <MapContainer
                  center={[18.5, 75.5]}
                  zoom={5}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {computedSites.map((site) => (
                    <Marker
                      key={site.id}
                      position={[site.lat, site.lng]}
                      icon={createCustomIcon(site.markerColor)}
                    >
                      <Popup>
                        <strong className="block text-xs font-bold">
                          {site.name}
                        </strong>
                        <span className="text-xs text-stone-600">
                          Clearance Score: {site.overallScore}/100
                        </span>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* PERFECTLY ALIGNED SITE CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch">
              {computedSites.map((site) => {
                const badgeColor =
                  site.overallScore >= 75
                    ? "bg-emerald-600 text-white"
                    : site.overallScore >= 50
                      ? "bg-amber-600 text-white"
                      : "bg-rose-700 text-white";
                const riskLabel =
                  site.overallScore >= 75
                    ? "Low Clearance Risk"
                    : site.overallScore >= 50
                      ? "Moderate Clearance Risk"
                      : "High Clearance Risk";

                return (
                  <div
                    key={site.id}
                    className="bg-white border border-stone-200 rounded-lg p-5 shadow-sm flex flex-col justify-between h-full"
                  >
                    {/* TOP SECTION */}
                    <div className="flex-1 flex flex-col justify-start space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                            Location {site.id}
                          </span>
                          <h3 className="font-bold text-stone-800 text-sm leading-snug">
                            {site.name}
                          </h3>
                        </div>
                        <span className="bg-stone-100 text-stone-600 border border-stone-200 text-[10px] font-bold px-2 py-0.5 rounded uppercase shrink-0 ml-1">
                          {site.zoneType}
                        </span>
                      </div>

                      <div
                        className={`p-3 rounded-md text-center ${badgeColor} shadow-xs`}
                      >
                        <div className="text-2xl font-black">
                          {site.overallScore}
                          <span className="text-xs font-normal"> / 100</span>
                        </div>
                        <div className="text-[11px] font-medium tracking-wide">
                          {riskLabel}
                        </div>
                      </div>

                      {site.cgwaWarning && (
                        <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-md text-xs text-rose-800 font-normal leading-relaxed flex gap-2">
                          <AlertTriangle
                            size={15}
                            className="shrink-0 mt-0.5 text-rose-600"
                          />
                          <span>{site.cgwaWarning}</span>
                        </div>
                      )}
                    </div>

                    {/* BOTTOM SECTION (PINNED TO BOTTOM FOR EVEN ALIGNMENT) */}
                    <div className="mt-4 pt-3 border-t border-stone-100 space-y-3">
                      <div className="space-y-2 text-xs text-stone-600 font-medium">
                        <div className="flex justify-between items-center">
                          <span>Groundwater Supply:</span>
                          <span
                            className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${site.water.color}`}
                          >
                            {site.water.label}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Grid Capacity:</span>
                          <span
                            className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${site.power.color}`}
                          >
                            {site.power.label}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Community Risk:</span>
                          <span className="font-semibold text-stone-800">
                            {site.communityRisk}
                          </span>
                        </div>
                      </div>

                      {site.historicalPrecedent && (
                        <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-md text-[11px] text-stone-600 leading-relaxed">
                          <span className="font-semibold text-stone-700">
                            Precedent Flag:
                          </span>{" "}
                          {site.historicalPrecedent}
                        </div>
                      )}

                      <button
                        onClick={() =>
                          alert(`Exporting report for ${site.name}...`)
                        }
                        className="w-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold py-2 rounded-md transition flex items-center justify-center gap-1.5"
                      >
                        <FileText size={13} /> Export PDF Report
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* --- TAB 2: DATA LAYERS --- */}
        {activeTab === "datalayers" && (
          <div className="space-y-6">
            <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h2 className="text-base font-bold text-stone-900">
                  Data Integration & Sources
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Spatial datasets, hydrogeological models, and statutory
                  boundary maps integrated into the assessment engine.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="bg-stone-100 text-stone-700 border border-stone-200 px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
                  6 Live Integrations
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  category: "Hydrogeology & Water",
                  icon: Droplets,
                  agency: "CGWA & Central Water Board",
                  layers: [
                    {
                      title: "CGWA Aquifer Assessment Maps",
                      update: "Daily API Sync",
                      status: "Active",
                      coverage: "Pan-India 700+ Districts",
                    },
                    {
                      title: "Aquifer Depth & Stress Indices",
                      update: "Weekly Sync",
                      status: "Active",
                      coverage: "High-Priority Industrial Belts",
                    },
                    {
                      title: "Groundwater Heavy Metal Index",
                      update: "Bi-Weekly Sync",
                      status: "Active",
                      coverage: "Major Industrial Clusters",
                    },
                  ],
                },
                {
                  category: "Utilities & Power Grid",
                  icon: Zap,
                  agency: "State DISCOM Networks",
                  layers: [
                    {
                      title: "DISCOM Substation Capacities",
                      update: "Hourly API Sync",
                      status: "Active",
                      coverage: "State Grid Networks",
                    },
                    {
                      title: "Industrial Feeder Load Margins",
                      update: "Hourly SCADA Sync",
                      status: "Active",
                      coverage: "Notified Industrial Zones",
                    },
                    {
                      title: "Transmission Substation Feasibility",
                      update: "Daily Sync",
                      status: "Active",
                      coverage: "National Power Grid",
                    },
                  ],
                },
                {
                  category: "Environmental & Social",
                  icon: Database,
                  agency: "MoEFCC & Survey of India",
                  layers: [
                    {
                      title: "MoEFCC Eco-Sensitive Zones (ESZ)",
                      update: "Monthly Sync",
                      status: "Active",
                      coverage: "Protected Wildlife Reserves",
                    },
                    {
                      title: "Coastal Regulation Zones (CRZ I-IV)",
                      update: "Weekly Sync",
                      status: "Active",
                      coverage: "7,500km Coastal Belt",
                    },
                    {
                      title: "Wetland Atlas Buffer Exclusion Zones",
                      update: "Quarterly Geo-Sync",
                      status: "Active",
                      coverage: "Ramsar & Inland Wetlands",
                    },
                  ],
                },
              ].map((group, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-stone-200 rounded-lg p-5 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                      <group.icon size={16} className="text-stone-700" />
                      <div>
                        <h3 className="text-sm font-bold text-stone-800">
                          {group.category}
                        </h3>
                        <span className="text-[10px] text-stone-500">
                          {group.agency}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 mt-3">
                      {group.layers.map((layer, lIdx) => (
                        <div
                          key={lIdx}
                          className="border border-stone-200 p-3.5 rounded-md bg-stone-50/60 space-y-1.5"
                        >
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-xs font-semibold text-stone-800 leading-snug">
                              {layer.title}
                            </h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 shrink-0">
                              <CheckCircle size={10} /> {layer.status}
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-500 space-y-0.5 font-medium">
                            <div className="flex items-center gap-1">
                              <MapPin size={11} className="text-stone-400" />{" "}
                              {layer.coverage}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={11} className="text-stone-400" />{" "}
                              {layer.update}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-stone-100 hover:bg-stone-200 border border-stone-300 text-xs font-semibold text-stone-700 py-2 rounded-md transition flex items-center justify-center gap-1.5">
                    <ExternalLink size={13} /> Request GeoJSON Feed
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 3: AUDIT REPORTS --- */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-base font-bold text-stone-900">
                  Audit Reports & Pre-Feasibility Dossiers
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Generated clearance assessments for internal evaluation and
                  Form 1 filings.
                </p>
              </div>
              <button className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-3.5 py-2 rounded-md transition flex items-center gap-1.5 self-start sm:self-auto">
                <Download size={14} /> Export All Reports
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: "REP-2026-089",
                  title: "Bulk Drug API Facility Clearance Pre-Assessment",
                  industry: "Bulk Drug / API Manufacturing",
                  sites: ["Sanand", "Dahej", "Vizag"],
                  date: "Jul 31, 2026",
                  riskRating: "High Clearance Delay Risk (Dahej)",
                  riskColor: "bg-rose-50 text-rose-700 border-rose-200",
                },
                {
                  id: "REP-2026-074",
                  title: "Semiconductor Fab Water-Power Dual Feasibility",
                  industry: "Semiconductor Fabrication",
                  sites: ["Navi Mumbai", "Noida"],
                  date: "Jul 28, 2026",
                  riskRating: "Low Feasibility Risk (Navi Mumbai)",
                  riskColor:
                    "bg-emerald-50 text-emerald-700 border-emerald-200",
                },
                {
                  id: "REP-2026-055",
                  title: "Textile Zone Environmental Clearance Audit",
                  industry: "Textile Processing & Dyeing",
                  sites: ["SIPCOT", "Solapur"],
                  date: "Jul 15, 2026",
                  riskRating: "Moderate Clearance Risk (SIPCOT)",
                  riskColor: "bg-amber-50 text-amber-700 border-amber-200",
                },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-stone-200 rounded-lg p-5 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="bg-stone-100 border border-stone-200 p-2 rounded text-stone-700">
                        <FileText size={20} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-stone-500 bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                        {doc.id}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-stone-900 leading-snug">
                        {doc.title}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {doc.industry}
                      </p>
                    </div>

                    <div
                      className={`p-2.5 rounded border text-xs font-semibold ${doc.riskColor}`}
                    >
                      {doc.riskRating}
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="text-stone-500 font-medium">
                        Evaluated Sites:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {doc.sites.map((s) => (
                          <span
                            key={s}
                            className="bg-stone-100 border border-stone-200 text-stone-700 text-[10px] font-medium px-2 py-0.5 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-medium">
                      Generated: {doc.date}
                    </span>
                    <button
                      onClick={() => alert(`Downloading ${doc.id}...`)}
                      className="bg-stone-900 hover:bg-stone-800 text-white font-semibold px-3 py-1.5 rounded transition flex items-center gap-1"
                    >
                      <Download size={12} /> PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* REGULATOR NOTIFICATION BANNER */}
      {currentUser.role === "regulator" && (
        <div className="fixed bottom-4 right-4 z-[9999] bg-stone-900 text-stone-200 border border-stone-700 p-4 rounded-lg shadow-xl max-w-sm">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-400 mb-1">
            <UserCheck size={16} /> Regulator Portal Active
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Viewing system as statutory clearance regulator. Priority alerts for
            Form 1 applications are enabled.
          </p>
        </div>
      )}

      {/* ADD SITE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-[20000] flex items-center justify-center p-4">
          <div className="bg-white border border-stone-300 rounded-lg max-w-md w-full p-5 shadow-lg space-y-4">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <h3 className="text-sm font-bold text-stone-800">
                Add Candidate Location
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddSite} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Location Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pune Industrial Zone, Maharashtra"
                  value={newSiteName}
                  onChange={(e) => setNewSiteName(e.target.value)}
                  required
                  className="w-full p-2 border border-stone-300 rounded-md outline-none focus:border-stone-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={newSiteLat}
                    onChange={(e) => setNewSiteLat(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded-md font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={newSiteLng}
                    onChange={(e) => setNewSiteLng(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded-md font-mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Water Capacity (m³/day)
                  </label>
                  <input
                    type="number"
                    value={newSiteWaterCap}
                    onChange={(e) => setNewSiteWaterCap(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Grid Power Capacity (MW)
                  </label>
                  <input
                    type="number"
                    value={newSitePowerCap}
                    onChange={(e) => setNewSitePowerCap(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded-md"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 border border-stone-300 rounded-md text-stone-600 font-medium hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-stone-900 text-white rounded-md font-medium hover:bg-stone-800"
                >
                  Add Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SIGN IN / SWITCH ROLE MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-[20000] flex items-center justify-center p-4">
          <div className="bg-white border border-stone-300 rounded-lg max-w-sm w-full p-5 shadow-lg space-y-4 text-stone-800">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <h3 className="text-sm font-bold text-stone-900">
                Sign In / Switch Portal Role
              </h3>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600">
              Choose an operational role to toggle environmental screening
              options:
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() =>
                  handleSwitchUser(
                    "applicant",
                    "Sakshi Handa",
                    "GreenCore Industrial Dev",
                  )
                }
                className="w-full text-left p-3.5 rounded-md border border-amber-300 bg-amber-50 hover:bg-amber-100 transition flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-stone-900 text-xs">
                    Industrial Applicant Mode
                  </div>
                  <div className="text-[11px] text-stone-600 mt-0.5">
                    Evaluate prospective sites & export dossier reports
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-stone-700" />
              </button>

              <button
                onClick={() =>
                  handleSwitchUser(
                    "regulator",
                    "State Environmental Officer",
                    "MoEFCC Compliance Division",
                  )
                }
                className="w-full text-left p-3.5 rounded-md border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 transition flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-stone-900 text-xs">
                    Regulator Compliance Portal
                  </div>
                  <div className="text-[11px] text-stone-600 mt-0.5">
                    Screen submitted filings against statutory thresholds
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-stone-700" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span className="text-emerald-400">🛡️</span> PreClear AI
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Automated statutory clearance feasibility engine integrating
              hydrogeological models, power grid margins, and MoEFCC
              environmental buffers.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-stone-200 text-xs uppercase tracking-wider mb-2">
              Assessment Data
            </h4>
            <ul className="space-y-1 text-stone-400">
              <li className="hover:text-stone-200 cursor-pointer">
                Central Ground Water Authority (CGWA)
              </li>
              <li className="hover:text-stone-200 cursor-pointer">
                DISCOM Substation Capacities
              </li>
              <li className="hover:text-stone-200 cursor-pointer">
                MoEFCC Eco-Sensitive Zone Atlas
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-stone-200 text-xs uppercase tracking-wider mb-2">
              Compliance Framework
            </h4>
            <ul className="space-y-1 text-stone-400">
              <li className="hover:text-stone-200 cursor-pointer">
                MoEFCC Form 1 Pre-Feasibility Filing
              </li>
              <li className="hover:text-stone-200 cursor-pointer">
                Zero Liquid Discharge (ZLD) Rules
              </li>
              <li className="hover:text-stone-200 cursor-pointer">
                Coastal Zone Management (CRZ IV)
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-stone-200 text-xs uppercase tracking-wider mb-2">
              Platform Infrastructure
            </h4>
            <div className="space-y-1 text-stone-400">
              <div className="flex justify-between">
                <span>Spatial API Sync:</span>
                <span className="text-emerald-400 font-semibold">Active</span>
              </div>
              <div className="flex justify-between">
                <span>Core Engine:</span>
                <span className="text-stone-300 font-semibold">
                  v2.4 Enterprise
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-stone-950 border-t border-stone-800 py-3 px-6 text-center text-stone-500 text-[11px]">
          PreClear AI • Automated Environmental Feasibility & Statutory
          Clearance System
        </div>
      </footer>
    </div>
  );
}
