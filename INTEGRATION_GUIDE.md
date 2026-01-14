# TrashIT - Complete Integration Guide

This guide will help you run the complete TrashIT platform with AI integration.

## Architecture Overview

The platform consists of 3 services:

1. **Frontend (React/Vite)** - Port 5173
2. **Backend API (Node.js)** - Port 5000
3. **AI Engine (Python/FastAPI)** - Port 8000

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   React     │─────▶│  Node.js    │      │   Python    │
│  Frontend   │      │   Backend   │      │ AI Engine   │
│   :5173     │      │    :5000    │      │   :8000     │
└─────────────┘      └─────────────┘      └─────────────┘
       │                                          ▲
       └──────────────────────────────────────────┘
         (Direct AI calls for waste analysis)
```

## Prerequisites

- Node.js 16+ and npm
- Python 3.8+
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

## Step-by-Step Setup

### 1. Setup AI Engine (Python Backend)

```bash
# Navigate to AI directory
cd trashit-ai

# Install Python dependencies
pip install -r requirements.txt

# Set your Gemini API key
export GEMINI_API_KEY="your-gemini-api-key-here"

# Start the AI server
uvicorn app:app --reload --port 8000
```

✅ AI Engine should be running at `http://localhost:8000`

### 2. Setup Node.js Backend

```bash
# Navigate to server directory
cd ../server

# Install dependencies
npm install

# Start the backend server
npm run dev
```

✅ Backend API should be running at `http://localhost:5000`

### 3. Setup React Frontend

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Start the development server
npm run dev
```

✅ Frontend should be running at `http://localhost:5173`

## Testing the AI Integration

1. Open `http://localhost:5173` in your browser
2. Select **"Collection Vendor"** role
3. You'll see the Vendor Marketplace dashboard
4. Click **"🔍 AI Scan & Estimate"** on any waste listing
5. The AI will analyze the waste image and provide:
   - Waste type detection
   - Material composition (Premium only)
   - Price estimation
   - Industry recommendations (Premium only)
   - Trust score

## AI Features by Plan

### Free Plan
- ✅ Basic waste type detection
- ✅ Condition assessment
- ✅ Price range estimation (±10%)
- ✅ Usability score

### Premium Plan
- ✅ All Free features
- ✅ **Detailed material composition**
- ✅ **Industry recommendations**
- ✅ **AI verification badge**
- ✅ **Higher accuracy (98% vs 85%)**

## API Endpoints

### AI Engine (Port 8000)

#### `POST /analyze-waste`
Upload waste image for AI analysis

**Request:**
```bash
curl -X POST "http://localhost:8000/analyze-waste" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@waste-image.jpg"
```

**Response:**
```json
{
  "waste_type": "PCB",
  "condition": "clean",
  "usability_score": 0.83,
  "quality_grade": "A",
  "materials_detected": [
    {"material": "Copper", "confidence": 0.91}
  ],
  "pricing": {
    "price_per_kg": 312.5,
    "price_range": [280, 345]
  },
  "recommended_buyers": ["PCB Refiners"]
}
```

### Backend API (Port 5000)

#### `GET /api/listings`
Fetch waste listings with filters

```bash
curl "http://localhost:5000/api/listings?region=Noida&tier=premium"
```

#### `POST /api/listings`
Create new waste listing

## Troubleshooting

### AI Engine Issues

**Problem:** `GEMINI_API_KEY not found`
```bash
# Make sure to set the environment variable
export GEMINI_API_KEY="your-key"

# Verify it's set
echo $GEMINI_API_KEY
```

**Problem:** `Module 'fastapi' not found`
```bash
cd trashit-ai
pip install -r requirements.txt
```

### Frontend Issues

**Problem:** `vite: command not found`
```bash
cd client
npm install
npm run dev
```

**Problem:** CORS errors in browser console
- Make sure AI Engine is running on port 8000
- Check that CORS is enabled in `trashit-ai/app.py`

### Backend Issues

**Problem:** Port 5000 already in use
```bash
# Kill the process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change the port in server/src/index.ts
```

## Environment Variables

### AI Engine
```bash
GEMINI_API_KEY=your-gemini-api-key-here
```

### Backend (Optional)
```bash
PORT=5000
```

### Frontend (Optional)
```bash
VITE_API_URL=http://localhost:5000
VITE_AI_URL=http://localhost:8000
```

## Running All Services at Once

You can run all services simultaneously using multiple terminal windows:

**Terminal 1 - AI Engine:**
```bash
cd trashit-ai
export GEMINI_API_KEY="your-key"
uvicorn app:app --reload --port 8000
```

**Terminal 2 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd client
npm run dev
```

## Development Tips

1. **Check all services are running:**
   - http://localhost:8000/docs - AI Engine Swagger UI
   - http://localhost:5000/health - Backend health check
   - http://localhost:5173 - Frontend app

2. **Hot Reload:**
   - All services support hot reload
   - Changes will auto-refresh

3. **Debugging AI:**
   - Check AI Engine logs in Terminal 1
   - Use Swagger UI at http://localhost:8000/docs to test endpoints

4. **Network Tab:**
   - Open browser DevTools → Network
   - Filter by "analyze-waste" to see AI calls

## Production Deployment

For production, you'll need to:

1. Set proper CORS origins in `app.py`
2. Use environment variables for all API URLs
3. Deploy AI Engine to a cloud service (Google Cloud Run, AWS Lambda, etc.)
4. Deploy backend to Node.js hosting
5. Build and deploy frontend to static hosting (Vercel, Netlify)

## Need Help?

- AI Engine Docs: http://localhost:8000/docs
- Check terminal logs for errors
- Verify all 3 services are running on correct ports

---

Built with ♻️ for sustainable e-waste management
