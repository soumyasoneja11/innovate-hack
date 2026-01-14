# TrashIT AI - E-Waste Valuation Engine

AI-powered backend for analyzing and valuing e-waste materials using Google's Gemini Vision API.

## Features

- 📸 **Image Analysis**: Upload waste images for AI-powered analysis
- 🧠 **Material Detection**: Identifies materials like Copper, Gold, Aluminum, etc.
- 📊 **Quality Grading**: Assigns A/B/C grades based on condition and usability
- 💰 **Smart Pricing**: Calculates market value with transparent breakdown
- 🏭 **Industry Matching**: Recommends suitable recycling/refining industries
- ✅ **AI Verification**: Confidence scoring for material detection

## Setup Instructions

### 1. Install Dependencies

```bash
cd trashit-ai
pip install -r requirements.txt
```

### 2. Set Environment Variable

You need a Google Gemini API key. Get one from [Google AI Studio](https://makersuite.google.com/app/apikey).

**On macOS/Linux:**
```bash
export GEMINI_API_KEY="your-api-key-here"
```

**On Windows:**
```cmd
set GEMINI_API_KEY=your-api-key-here
```

### 3. Run the Server

```bash
uvicorn app:app --reload --port 8000
```

The API will be available at: `http://localhost:8000`

### 4. Test the API

Open the interactive documentation:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### POST `/analyze-waste`

Upload an image of e-waste to get complete AI analysis.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `file` (image file)

**Response:**
```json
{
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
  "recommended_buyers": ["PCB Refiners", "Precious Metal Recovery"],
  "ai_verified": true
}
```

### GET `/health`

Health check endpoint.

## Integration with Frontend

The frontend (React/Vite) is configured to call this API on port 8000. Make sure both servers are running:

1. **AI Backend**: `http://localhost:8000` (this service)
2. **Frontend**: `http://localhost:5173` (Vite dev server)

The frontend automatically calls the `/analyze-waste` endpoint when users click "AI Scan & Estimate" on waste listings.

## Tech Stack

- **Framework**: FastAPI
- **AI Model**: Google Gemini 1.5 Flash
- **Image Processing**: Pillow (PIL)
- **Validation**: Pydantic

## Project Structure

```
trashit-ai/
├── app.py                 # Main FastAPI application
├── requirements.txt       # Python dependencies
├── ai_engine/            # AI processing modules
│   ├── vision.py         # Image analysis with Gemini
│   ├── grading.py        # Quality grading logic
│   ├── pricing.py        # Price estimation
│   ├── confidence.py     # AI verification
│   └── industry_match.py # Industry recommendations
└── models/
    └── schemas.py        # Pydantic data models
```

## Environment Variables

- `GEMINI_API_KEY` - **Required**: Your Google Gemini API key

## Troubleshooting

**Issue: "GEMINI_API_KEY not found"**
- Make sure you've set the environment variable before running the server
- Restart your terminal after setting the variable

**Issue: "CORS error"**
- The frontend URL must be `http://localhost:5173` or `http://localhost:3000`
- Check the CORS configuration in `app.py`

**Issue: "Module not found"**
- Run `pip install -r requirements.txt` again
- Make sure you're in the `trashit-ai` directory

## License

Part of the TrashIT B2B Waste Marketplace Platform
