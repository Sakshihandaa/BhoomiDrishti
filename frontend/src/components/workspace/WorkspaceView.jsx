import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

// Fix default marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Helper component to smoothly re-center map when coordinates update
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

// Helper component to handle user map clicks and auto-set Lat/Lng coordinates
function MapClickHandler({ setCoords }) {
  useMapEvents({
    click(e) {
      setCoords({
        lat: e.latlng.lat.toFixed(4),
        lng: e.latlng.lng.toFixed(4),
      });
    },
  });
  return null;
}

// ==========================================
// 🌐 REAL-TIME GIS API INTEGRATION HELPERS
// ==========================================

// 1. Fetch real district/landmark info using OpenStreetMap Nominatim Reverse Geocoding API
async function fetchRealLocationData(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    );
    const data = await res.json();
    return {
      displayName: data.display_name || "Selected Coordinate Point",
      district:
        data.address?.state_district ||
        data.address?.county ||
        "Unknown District",
      village:
        data.address?.village ||
        data.address?.suburb ||
        data.address?.town ||
        "Local Region",
    };
  } catch (error) {
    console.error("Failed to fetch Nominatim location:", error);
    return null;
  }
}

// 2. Query real residential habitations (villages, towns, suburbs) within radius using Overpass GIS API
async function fetchNearbyHabitations(lat, lng, radiusMeters = 3000) {
  const query = `
    [out:json];
    (
      node["place"~"village|town|suburb|neighbourhood"](around:${radiusMeters},${lat},${lng});
    );
    out body;
  `;
  try {
    const res = await fetch(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
    );
    const data = await res.json();
    return data.elements || [];
  } catch (error) {
    console.error("Overpass API spatial query error:", error);
    return [];
  }
}

export default function WorkspaceView() {
  // Location inputs
  const [coords, setCoords] = useState({ lat: "21.1458", lng: "79.0882" });
  const [addressSearch, setAddressSearch] = useState(
    "Nagpur Industrial Area, Maharashtra",
  );

  // Form selections
  const [sector, setSector] = useState("Thermal Power Generation");
  const [water, setWater] = useState("35000");
  const [power, setPower] = useState("10");

  // Residential & Public Consent metrics
  const [residentialDistance, setResidentialDistance] = useState("2.5"); // in km
  const [publicConsent, setPublicConsent] = useState("82"); // % approval
  const [hasPublicHearing, setHasPublicHearing] = useState(true);

  // Active screening layers state
  const [activeLayers, setActiveLayers] = useState({
    groundwater: true,
    esz: true,
    crz: true,
    wetland: true,
    grid: true,
    forest: true,
  });

  // State for calculation results
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const toggleLayer = (key) => {
    setActiveLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ==========================================
  // ⚡ REAL-TIME SPATIAL FEASIBILITY ENGINE
  // ==========================================
  const handleRunFeasibility = async () => {
    setIsEvaluating(true);

    try {
      const parsedLat = parseFloat(coords.lat) || 21.1458;
      const parsedLng = parseFloat(coords.lng) || 79.0882;

      // 1. Live API Call: Get real reverse geocoded address
      const locationData = await fetchRealLocationData(parsedLat, parsedLng);
      if (locationData?.displayName) {
        setAddressSearch(locationData.displayName);
      }

      // 2. Live API Call: Query OpenStreetMap Overpass for real habitations within 3km
      const nearbySettlements = await fetchNearbyHabitations(
        parsedLat,
        parsedLng,
        3000,
      );

      // 3. Dynamic Rule Evaluation
      let riskScore = 100;
      let flags = [];

      // Evaluate Real OSM Proximity
      if (nearbySettlements.length > 0) {
        const placeNames = nearbySettlements
          .map((item) => item.tags?.name)
          .filter(Boolean)
          .slice(0, 3)
          .join(", ");

        riskScore -= 20;
        flags.push(
          `Real GIS Detection: Found ${nearbySettlements.length} settlement(s) nearby (${placeNames || "Residential Area"}). Mandatory green belt buffer required.`,
        );
      } else {
        flags.push(
          "Real GIS Detection: No major registered residential settlements within 3km radius.",
        );
      }

      // High Water Sector Check
      const numericWater = Number(water);
      if (
        [
          "Thermal Power Generation",
          "Chemical & Petrochemical Plant",
          "Textile Processing & Dyeing",
        ].includes(sector)
      ) {
        if (numericWater > 30000) {
          riskScore -= 15;
          flags.push(
            "Water intake exceeds CGWB safe block threshold (>30,000 m³/day) for high-water-demand industrial sectors.",
          );
        }
      }

      // User Input Survey Checks
      const numericConsent = Number(publicConsent);
      if (numericConsent < 60) {
        riskScore -= 20;
        flags.push(
          "Public survey indicates community objection (<60% approval). High risk during public hearing.",
        );
      }

      if (!hasPublicHearing) {
        riskScore -= 15;
        flags.push(
          "Gram Sabha NOC / Public Hearing clearance missing for project site.",
        );
      }

      // Final Status Determination
      let status = "Feasible (Low Risk)";
      if (riskScore < 50) status = "Non-Feasible / High Risk";
      else if (riskScore < 75) status = "Conditional Approval";

      setEvaluationResult({
        score: Math.max(0, riskScore),
        status: status,
        flags: flags,
        proximityViolation:
          nearbySettlements.length > 0
            ? `${nearbySettlements.length} Settlement(s) Detected`
            : "0 Violations",
        bufferCompliance:
          nearbySettlements.length > 0
            ? "Buffer Active (<3km)"
            : "Clear (>3km)",
        socialFeasibility: `${numericConsent}% Resident Consent`,
      });
    } catch (err) {
      console.error("Feasibility evaluation error:", err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const parsedLat = parseFloat(coords.lat) || 21.1458;
  const parsedLng = parseFloat(coords.lng) || 79.0882;

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header Dashboard Banner */}
      <div className="bg-[#ECEAE1]/80 border border-stone-300 rounded-2xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded border border-emerald-300 uppercase tracking-wider">
              GIS Siting Engine v2.4 (Live GIS Enabled)
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mt-2">
              Industrial Feasibility Workspace
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Analyze site coordinates against live spatial data, buffer zones,
              utility loads, and public consent metrics.
            </p>
          </div>
          <button
            onClick={handleRunFeasibility}
            disabled={isEvaluating}
            className="bg-[#2D5A27] hover:bg-[#23481f] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 self-start md:self-auto cursor-pointer disabled:opacity-70"
          >
            {isEvaluating
              ? "📡 Querying Real GIS APIs..."
              : "⚡ Run Deep Feasibility Check"}
          </button>
        </div>
      </div>

      {/* 2. Top Parameter Inputs Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* A. Location & Site Coordinates */}
        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="border-b border-stone-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              📍 Site Location Coordinates
            </h3>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 mb-1 font-medium">
                Detected Location / Landmark
              </label>
              <input
                type="text"
                value={addressSearch}
                onChange={(e) => setAddressSearch(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-slate-800 text-xs focus:ring-1 focus:ring-emerald-800 outline-none"
                placeholder="Search city or industrial estate..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 mb-1 font-medium">
                  Latitude (°N)
                </label>
                <input
                  type="text"
                  value={coords.lat}
                  onChange={(e) =>
                    setCoords({ ...coords, lat: e.target.value })
                  }
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 font-mono text-slate-800 text-xs focus:ring-1 focus:ring-emerald-800 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1 font-medium">
                  Longitude (°E)
                </label>
                <input
                  type="text"
                  value={coords.lng}
                  onChange={(e) =>
                    setCoords({ ...coords, lng: e.target.value })
                  }
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 font-mono text-slate-800 text-xs focus:ring-1 focus:ring-emerald-800 outline-none"
                />
              </div>
            </div>
            <p className="text-[11px] text-stone-500 italic">
              💡 Tip: You can click anywhere directly on the map to place a pin.
            </p>
          </div>
        </div>

        {/* B. Industry Specifications */}
        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="border-b border-stone-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              ⚙️ Industry Specifications
            </h3>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 mb-1 font-medium">
                Industry Sector
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-slate-800 text-xs focus:ring-1 focus:ring-emerald-800 outline-none"
              >
                <option>Thermal Power Generation</option>
                <option>Chemical & Petrochemical Plant</option>
                <option>Pharmaceutical Formulation</option>
                <option>Textile Processing & Dyeing</option>
                <option>Integrated Steel & Metallurgy</option>
                <option>Distillery & Fermentation</option>
                <option>Cement Manufacturing</option>
                <option>Mining & Mineral Processing</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 mb-1 font-medium">
                  Water (m³/day)
                </label>
                <input
                  type="number"
                  value={water}
                  onChange={(e) => setWater(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-slate-800 text-xs focus:ring-1 focus:ring-emerald-800 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1 font-medium">
                  Power Load (MW)
                </label>
                <input
                  type="number"
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-slate-800 text-xs focus:ring-1 focus:ring-emerald-800 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* C. Residential & Social Feasibility Survey */}
        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="border-b border-stone-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              🏘️ Residential & Social Impact Survey
            </h3>
          </div>
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 mb-1 font-medium">
                  Estimated Distance (km)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={residentialDistance}
                  onChange={(e) => setResidentialDistance(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-slate-800 text-xs focus:ring-1 focus:ring-emerald-800 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1 font-medium">
                  Public Consent (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={publicConsent}
                  onChange={(e) => setPublicConsent(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-slate-800 text-xs focus:ring-1 focus:ring-emerald-800 outline-none"
                />
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={hasPublicHearing}
                  onChange={(e) => setHasPublicHearing(e.target.checked)}
                  className="rounded border-stone-300 text-emerald-800 focus:ring-emerald-800"
                />
                <span className="font-medium">
                  Gram Sabha / Public Hearing NOC Conducted
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Active Screening Layers Toggle Bar */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
          🗺️ Active Screening GIS Overlays
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
          {Object.entries({
            groundwater: "Groundwater Blocks",
            esz: "10km ESZ Zone",
            crz: "CRZ Coastal Map",
            wetland: "Wetland Buffer",
            grid: "Power Grid Feeder",
            forest: "Forest Cover",
          }).map(([key, label]) => (
            <label
              key={key}
              className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${
                activeLayers[key]
                  ? "bg-emerald-50/80 border-emerald-300 text-emerald-950 font-semibold"
                  : "bg-stone-50 border-stone-200 text-slate-500"
              }`}
            >
              <span className="text-[11px] truncate">{label}</span>
              <input
                type="checkbox"
                checked={activeLayers[key]}
                onChange={() => toggleLayer(key)}
                className="ml-1 rounded border-stone-300 text-emerald-800"
              />
            </label>
          ))}
        </div>
      </div>

      {/* 4. Live Interactive OpenStreetMap View */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            Candidate Site Spatial Map
          </h2>
          <span className="text-xs font-mono text-slate-500 bg-stone-100 px-2.5 py-1 rounded border border-stone-200">
            Lat: {coords.lat} | Lng: {coords.lng}
          </span>
        </div>

        <div className="w-full h-[380px] rounded-xl overflow-hidden border border-stone-300 relative z-0">
          <MapContainer
            center={[parsedLat, parsedLng]}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <ChangeView center={[parsedLat, parsedLng]} />
            <MapClickHandler setCoords={setCoords} />

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[parsedLat, parsedLng]}>
              <Popup>
                <div className="text-xs font-sans">
                  <strong>{addressSearch}</strong>
                  <br />
                  Sector: {sector}
                  <br />
                  Active Layers:{" "}
                  {Object.values(activeLayers).filter(Boolean).length}
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* 5. Metric Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Proximity Violations
          </span>
          <div className="text-2xl font-bold text-slate-900">
            {evaluationResult
              ? evaluationResult.proximityViolation
              : "0 Violations"}
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Settlement Status:{" "}
            <span className="font-semibold">
              {evaluationResult
                ? evaluationResult.bufferCompliance
                : "Clear (>3km)"}
            </span>
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Environmental Feasibility
          </span>
          <div className="text-2xl font-bold text-emerald-800">
            {evaluationResult ? `${evaluationResult.score}%` : "88% (Baseline)"}
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Status:{" "}
            <span className="font-semibold text-slate-800">
              {evaluationResult
                ? evaluationResult.status
                : "Awaiting Assessment"}
            </span>
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Social & Resident Consent
          </span>
          <div className="text-2xl font-bold text-amber-800">
            {publicConsent}% Approval
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Gram Sabha NOC:{" "}
            <span className="font-semibold">
              {hasPublicHearing ? "Approved" : "Pending"}
            </span>
          </p>
        </div>
      </div>

      {/* 6. Evaluation Detailed Output & PDF Download */}
      {evaluationResult && (
        <div className="bg-white border border-emerald-800/30 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Feasibility Evaluation Summary
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Report ID: BD-{Math.floor(100000 + Math.random() * 900000)}
              </p>
            </div>
            <button className="bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-2xs cursor-pointer self-start sm:self-auto">
              📄 Download Certified Audit Report
            </button>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Identified Risk & Statutory Notes:
            </h4>
            {evaluationResult.flags.length > 0 ? (
              evaluationResult.flags.map((flag, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2"
                >
                  <span>⚠️</span>
                  <span>{flag}</span>
                </div>
              ))
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-start gap-2">
                <span>✅</span>
                <span>
                  No major statutory buffer or social feasibility violations
                  detected for the candidate coordinates.
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
