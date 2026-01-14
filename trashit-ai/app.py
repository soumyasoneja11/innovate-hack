from fastapi import FastAPI, UploadFile, File
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
    image_bytes = await file.read()

    vision = analyze_image(image_bytes)

    grade = assign_grade(
        vision["condition"],
        vision["usability_score"]
    )

    pricing = predict_price(
        vision["waste_type"],
        grade,
        vision["materials_detected"]
    )

    ai_verified = verify_ai(vision["materials_detected"])
    buyers = match_industries(vision["materials_detected"])

    vendor_trust_score = round(
        0.5 + (0.3 if ai_verified else 0) + (0.2 if grade == "A" else 0),
        2
    )

    return {
        "waste_type": vision["waste_type"],
        "condition": vision["condition"],
        "usability_score": vision["usability_score"],
        "quality_grade": grade,
        "materials_detected": vision["materials_detected"],
        "pricing": {
            "price_per_kg": pricing["price"],
            "price_range": pricing["range"]
        },
        "pricing_breakdown": pricing["breakdown"],
        "vendor_trust_score": vendor_trust_score,
        "recommended_buyers": buyers,
        "ai_verified": ai_verified
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
