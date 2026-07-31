from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from shapely.geometry import Point, Polygon
import math

app = FastAPI(
    title="PreClear AI Engine",
    description="Automated GIS Pre-Feasibility & Statutory Environmental Clearance Intelligence",
    version="1.0.0"
)

# Enable CORS so the React frontend can talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------------------
# 1. SIMULATED GIS DATASETS (Polygons & Coordinates)
# -------------------------------------------------------------------

# MoEFCC Eco-Sensitive Zone (ESZ) Forest Polygon (Lat/Lng)
ESZ_FOREST_POLYGON = Polygon([
    (77.1000, 28.5000),
    (77.1500, 28.5000),
    (77.1500, 28.5500),
    (77.1000, 28.5500)
])

# CGWA Groundwater Block Polygon (Critical / Over-Exploited)
CRITICAL_WATER_ZONE = Polygon([
    (77.1800, 28.5800),
    (77.2500, 28.5800),
    (77.2500, 28.6500),
    (77.1800, 28.6500)
])

# DISCOM Electrical Substation Location
SUBSTATION_LOCATION = Point(77.2000, 28.5200)

# -------------------------------------------------------------------
# 2. REQUEST & RESPONSE SCHEMAS
# -------------------------------------------------------------------

class SiteEvaluationRequest(BaseModel):
    latitude: float = Field(..., example=28.5250)
    longitude: float = Field(..., example=77.1200)
    industry_sector: str = Field(..., example="Textiles")
    water_demand_kld: float = Field(..., example=250.0)
    power_demand_mw: float = Field(..., example=10.0)

class RiskAssessmentResponse(BaseModel):
    site_coordinates: dict
    resource_impact_score: float
    feasibility_status: str
    risk_color_code: str
    detailed_breakdown: dict
    recommendations: list

# -------------------------------------------------------------------
# 3. HAVERSINE DISTANCE HELPER
# -------------------------------------------------------------------

def calculate_haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371.0  # Earth radius in KM
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

# -------------------------------------------------------------------
# 4. API ENDPOINT
# -------------------------------------------------------------------

@app.post("/api/v1/evaluate-site", response_model=RiskAssessmentResponse)
def evaluate_site(request: SiteEvaluationRequest):
    site_point = Point(request.longitude, request.latitude)
    
    # 1. MoEFCC 10km ESZ Forest Buffer Check
    distance_to_esz_km = calculate_haversine_distance(
        request.latitude, request.longitude,
        ESZ_FOREST_POLYGON.centroid.y, ESZ_FOREST_POLYGON.centroid.x
    )
    is_inside_esz = ESZ_FOREST_POLYGON.contains(site_point)
    
    esz_score = 100
    esz_risk = "SAFE (Clear of ESZ Forest Buffer)"
    if is_inside_esz or distance_to_esz_km < 2.0:
        esz_score = 0
        esz_risk = "HIGH RISK REJECT (Inside Protected Forest / Buffer Zone)"
    elif distance_to_esz_km < 10.0:
        esz_score = 50
        esz_risk = "MODERATE RISK (Within 10km ESZ Buffer Zone)"

    # 2. CGWA Groundwater Vulnerability
    is_in_critical_water_zone = CRITICAL_WATER_ZONE.contains(site_point)
    water_score = 100
    water_risk = "SAFE (Groundwater Abundant)"
    
    if is_in_critical_water_zone:
        if request.water_demand_kld > 100.0:
            water_score = 20
            water_risk = "HIGH RISK (Critical Block & High Demand)"
        else:
            water_score = 60
            water_risk = "MODERATE RISK (Critical Block, Low Demand Allowed)"

    # 3. DISCOM Substation Proximity
    grid_distance_km = calculate_haversine_distance(
        request.latitude, request.longitude,
        SUBSTATION_LOCATION.y, SUBSTATION_LOCATION.x
    )
    grid_score = max(0, 100 - (grid_distance_km * 5))

    # 4. Dynamic MCDA Sector Weighting
    sector = request.industry_sector.lower()
    if "textile" in sector:
        weights = {"water": 0.50, "esz": 0.30, "grid": 0.20}
    elif "data center" in sector:
        weights = {"grid": 0.50, "esz": 0.30, "water": 0.20}
    else:  # General Manufacturing
        weights = {"esz": 0.40, "water": 0.30, "grid": 0.30}

    final_score = round(
        (water_score * weights["water"]) +
        (esz_score * weights["esz"]) +
        (grid_score * weights["grid"]),
        2
    )

    if esz_score == 0 or final_score < 40:
        status = "UNVIABLE / CRITICAL BOTTLENECK"
        color_code = "#EF4444"  # Red
    elif final_score < 70:
        status = "CONDITIONAL APPROVAL NEEDED"
        color_code = "#F59E0B"  # Amber
    else:
        status = "HIGHLY FEASIBLE"
        color_code = "#10B981"  # Green

    recs = []
    if is_inside_esz or distance_to_esz_km < 10.0:
        recs.append("Mandatory Wildlife Clearance required via National Board for Wildlife (NBWL).")
    if is_in_critical_water_zone:
        recs.append("Must mandate 100% Zero Liquid Discharge (ZLD) plant to bypass CGWA water rejection.")
    if grid_distance_km > 10.0:
        recs.append(f"Substation is {round(grid_distance_km, 1)} km away; account for dedicated transmission line capex.")

    return RiskAssessmentResponse(
        site_coordinates={"latitude": request.latitude, "longitude": request.longitude},
        resource_impact_score=final_score,
        feasibility_status=status,
        risk_color_code=color_code,
        detailed_breakdown={
            "environmental_esz_status": esz_risk,
            "groundwater_status": water_risk,
            "distance_to_nearest_substation_km": round(grid_distance_km, 2),
            "mcda_weights_applied": weights
        },
        recommendations=recs
    )