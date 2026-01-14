# TrashIT Platform - Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          USER INTERFACE                                  │
│                     http://localhost:5173                                │
└─────────────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
        ┌───────────────────────┐   ┌───────────────────────┐
        │   Node.js Backend     │   │   AI Engine (Python)  │
        │   Express + TypeScript│   │   FastAPI + Gemini    │
        │   Port: 5000          │   │   Port: 8000          │
        └───────────────────────┘   └───────────────────────┘
                    │                           │
                    │                           │
        ┌───────────▼───────────┐   ┌───────────▼───────────┐
        │  Firebase Storage     │   │  Google Gemini API    │
        │  - Waste images       │   │  - Vision analysis    │
        │  - User data          │   │  - Material detection │
        └───────────────────────┘   └───────────────────────┘
```

## Component Breakdown

### 1. Frontend (React + Vite)
```
client/src/
├── pages/
│   ├── VendorDashboard.tsx    ← AI Integration Point
│   ├── SellerDashboard.tsx
│   └── IndustryDashboard.tsx
├── lib/
│   └── firebase.ts            ← Firebase config
└── App.tsx                    ← Role selection
```

**Key Functions:**
- `handleScan(listing)` - Triggers AI analysis
- `fetchListings()` - Gets waste listings from backend
- Filter and sort marketplace items

### 2. Backend API (Node.js)
```
server/src/
└── index.ts
    ├── GET  /api/listings      ← Fetch waste listings
    ├── POST /api/listings      ← Create new listing
    └── GET  /health            ← Health check
```

**Responsibilities:**
- Manage waste listings database
- Handle seller uploads
- Serve marketplace data

### 3. AI Engine (Python FastAPI)
```
trashit-ai/
├── app.py                     ← Main API
├── ai_engine/
│   ├── vision.py             ← Gemini Vision API
│   ├── grading.py            ← Quality grading
│   ├── pricing.py            ← Price prediction
│   ├── confidence.py         ← AI verification
│   └── industry_match.py     ← Buyer recommendations
└── models/
    └── schemas.py            ← Data models
```

**Endpoints:**
- `POST /analyze-waste` - Main AI analysis
- `GET /health` - Health check

## Data Flow: AI Scan Process

```
┌────────────────┐
│ User clicks    │
│ "AI Scan"      │
└────────┬───────┘
         │
         ▼
┌────────────────────────────────┐
│ VendorDashboard.handleScan()   │
│ - Get listing.imageUrl         │
│ - Fetch image as Blob          │
│ - Create FormData              │
└────────┬───────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│ POST /analyze-waste            │
│ - Upload image file            │
│ - multipart/form-data          │
└────────┬───────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│ AI Engine Processing           │
│ 1. vision.py                   │
│    - Gemini Vision API         │
│    - Detect waste type         │
│    - Find materials            │
│                                │
│ 2. grading.py                  │
│    - Assign A/B/C grade        │
│                                │
│ 3. pricing.py                  │
│    - Calculate price           │
│    - Generate range            │
│                                │
│ 4. industry_match.py           │
│    - Match buyers              │
│                                │
│ 5. confidence.py               │
│    - Verify results            │
└────────┬───────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│ JSON Response                  │
│ {                              │
│   waste_type: "PCB",           │
│   materials: [...],            │
│   pricing: {...},              │
│   recommended_buyers: [...]    │
│ }                              │
└────────┬───────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│ Transform for UI               │
│ - Free vs Premium logic        │
│ - Format percentages           │
│ - Build recommendations        │
└────────┬───────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│ Display Results Modal          │
│ - Waste Type                   │
│ - Confidence                   │
│ - Price Range                  │
│ - Composition (Premium)        │
│ - Recommendations (Premium)    │
└────────────────────────────────┘
```

## Request/Response Examples

### 1. Frontend → AI Engine

**Request:**
```http
POST http://localhost:8000/analyze-waste
Content-Type: multipart/form-data

file: [Binary Image Data]
```

**Response:**
```json
{
  "waste_type": "Circuit Boards",
  "condition": "clean",
  "usability_score": 0.89,
  "quality_grade": "A",
  "materials_detected": [
    {
      "material": "Copper",
      "confidence": 0.92
    },
    {
      "material": "Gold",
      "confidence": 0.45
    }
  ],
  "pricing": {
    "price_per_kg": 245.80,
    "price_range": [221.22, 270.38]
  },
  "pricing_breakdown": {
    "base_price": 250,
    "grade_multiplier": 1.0,
    "material_bonus": -4.2
  },
  "vendor_trust_score": 0.82,
  "recommended_buyers": [
    "PCB Refiners",
    "Precious Metal Recovery"
  ],
  "ai_verified": true
}
```

### 2. Frontend → Backend

**Request:**
```http
GET http://localhost:5000/api/listings?region=Noida&tier=premium
```

**Response:**
```json
[
  {
    "id": "1",
    "wasteType": "Copper Wire Scrap",
    "quantity": 250,
    "imageUrl": "https://...",
    "location": "Noida",
    "category": "metal"
  }
]
```

## State Management

### VendorDashboard State
```typescript
const [listings, setListings] = useState<Listing[]>([]);
const [isPremium, setIsPremium] = useState(false);
const [scanResult, setScanResult] = useState<any>(null);
const [scanning, setScanning] = useState(false);
const [currentScannedItem, setCurrentScannedItem] = useState<Listing | null>(null);
const [filters, setFilters] = useState<Filter>({ ... });
```

### Scan Result State
```typescript
{
  wasteType: string,
  confidence: string,      // "98%"
  priceRange: {
    min: number,
    max: number
  },
  usability: string,
  composition?: {          // Premium only
    [material: string]: string
  },
  recommendations?: string[] // Premium only
}
```

## Error Handling

### Network Errors
```typescript
try {
  const response = await fetch(...);
  if (!response.ok) throw new Error();
  // Process result
} catch (error) {
  console.error('AI scan failed:', error);
  // Fall back to mock data
  setScanResult({ ... });
}
```

### CORS Errors
Handled by FastAPI middleware:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    ...
)
```

## Performance Optimization

### Current Implementation
- Image fetched from external URL
- Uploaded to AI backend
- Processed by Gemini API
- Results cached in state

### Future Improvements
1. Image compression before upload
2. Result caching (localStorage)
3. Batch processing
4. Progressive loading
5. Image preloading

## Security Considerations

### Current State
- ✅ CORS enabled for specific origins
- ✅ API key stored in environment
- ⚠️ No authentication yet
- ⚠️ No file size limits
- ⚠️ No file type validation

### Production Needs
1. User authentication (JWT)
2. File upload validation
3. Rate limiting
4. API key rotation
5. Input sanitization
6. Error message sanitization

---

**Last Updated:** January 14, 2026
**Version:** 1.0.0
