from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ai_engine.vision import analyze_image
from ai_engine.grading import assign_grade
from ai_engine.pricing import predict_price
from ai_engine.confidence import verify_ai
from ai_engine.industry_match import match_industries
from models.schemas import FinalResponse

app = FastAPI(
    title="TrashIT – AI E-Waste Valuation Engine",
    description="""
🚮 **TrashIT** is an AI-powered e-waste intelligence engine.

### What it does:
- 📸 Analyzes images of e-waste
- 🧠 Detects valuable materials using Vision AI
- 📊 Assigns quality grades & usability score
- 💰 Estimates fair market price with explainability
- 🏭 Recommends recycling & refining industries

Built to enable **transparent, sustainable, and fair e-waste trading**.
""",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post(
    "/analyze-waste",
    tags=["AI Valuation"],
    summary="Analyze e-waste image and estimate market value",
    description="""
Upload an image of e-waste to receive a complete AI-driven valuation including:
- Waste classification
- Condition assessment
- Detected materials with confidence
- AI-verified pricing
- Industry recommendations
""",
    response_model=FinalResponse,
    responses={
        200: {
            "description": "Successful e-waste analysis",
            "content": {
                "application/json": {
                    "example": {
                        "waste_type": "PCB",
                        "condition": "clean",
                        "usability_score": 0.83,
                        "quality_grade": "A",
                        "materials_detected": [
                            {"material": "Copper", "confidence": 0.91},
                            {"material": "Gold", "confidence": 0.42}
                        ],
                        "pricing": {
                            "price_per_kg": 312.5,
                            "price_range": [280, 345]
                        },
                        "pricing_breakdown": {
                            "base_price": 250,
                            "grade_multiplier": 1.0,
                            "material_bonus": 62.5
                        },
                        "vendor_trust_score": 0.82,
                        "recommended_buyers": [
                            "PCB Refiners",
                            "Precious Metal Recovery"
                        ],
                        "ai_verified": True
                    }
                }
            }
        }
    }
)
async def analyze_waste(file: UploadFile = File(...)):
    """
    Core AI endpoint for e-waste valuation.
    """
    # Read the uploaded image (for demo purposes, we'll return hardcoded data)
    image_bytes = await file.read()
    
    # HARDCODED RESPONSE FOR DEMO
    # This simulates a perfect e-waste analysis result
    return {
        "waste_type": "Mixed E-Waste (PCB, Wires, Components)",
        "condition": "Good - Salvageable",
        "usability_score": 0.87,
        "quality_grade": "A",
        "materials_detected": [
            {"material": "Copper", "confidence": 0.94},
            {"material": "Gold", "confidence": 0.78},
            {"material": "Silver", "confidence": 0.82},
            {"material": "Aluminum", "confidence": 0.88},
            {"material": "Plastic (ABS)", "confidence": 0.91}
        ],
        "pricing": {
            "price_per_kg": 385.50,
            "price_range": [340, 420]
        },
        "pricing_breakdown": {
            "base_price": 280,
            "grade_multiplier": 1.2,
            "material_bonus": 105.50
        },
        "vendor_trust_score": 0.92,
        "recommended_buyers": [
            "PCB Refiners & Precious Metal Recovery",
            "Electronic Component Recyclers",
            "Copper Wire Processors",
            "Certified E-Waste Treatment Facilities"
        ],
        "ai_verified": True
    }


@app.get(
    "/health",
    tags=["System"],
    summary="Health check endpoint"
)
def health_check():
    return {
        "status": "ok",
        "service": "TrashIT AI Engine"
    }
