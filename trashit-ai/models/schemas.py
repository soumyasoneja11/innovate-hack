from pydantic import BaseModel
from typing import List

class Material(BaseModel):
    material: str
    confidence: float

class VisionOutput(BaseModel):
    waste_type: str
    condition: str
    usability_score: float
    materials_detected: List[Material]

class Pricing(BaseModel):
    price_per_kg: float
    price_range: list

class FinalResponse(BaseModel):
    waste_type: str
    condition: str
    usability_score: float
    quality_grade: str
    materials_detected: List[Material]
    pricing: Pricing
    pricing_breakdown: dict
    vendor_trust_score: float
    recommended_buyers: list
    ai_verified: bool
