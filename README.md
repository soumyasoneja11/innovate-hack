# TrashIT - AI-Powered E-Waste Intelligence Platform 

**TrashIT** is a comprehensive B2B marketplace that revolutionizes e-waste management by connecting waste sellers, collection vendors, and processing industries through AI-powered valuation and transparent pricing. 

## Overview

TrashIT transforms the traditional waste management ecosystem by providing: 
- **AI-driven e-waste analysis** using computer vision and machine learning
- **Real-time pricing** with transparent market valuations
- **B2B marketplace** connecting multiple stakeholders
- **Quality assessment** and material detection
- **Industry matching** for optimal waste processing

## Architecture

The project consists of three main components:

### 1. **Frontend Client** (`/client`)
- **Technology**: React 19 + TypeScript + Vite
- **Styling**: TailwindCSS 4.1
- **State Management**: Redux Toolkit
- **Authentication**: Firebase Auth
- **Features**:
  - Multi-role dashboards (Sellers, Vendors, Industries)
  - Real-time waste scanning interface
  - Interactive marketplace
  - Image upload and analysis

### 2. **Backend Server** (`/server`)
- **Technology**: Node.js + Express + TypeScript
- **Authentication**: Firebase Admin SDK
- **Features**:
  - RESTful API endpoints
  - Listing management
  - User authentication
  - Regional data services
  - AI model integration

### 3. **AI Engine** (`/trashit-ai`)
- **Technology**:  Python + FastAPI + Google Generative AI
- **Computer Vision**:  Gemini 1.5 Flash model
- **Features**:
  - Image analysis and waste classification
  - Material detection with confidence scoring
  - Quality grading system
  - Price prediction algorithms
  - Industry matching logic

## 🤖 AI Capabilities

The TrashIT AI engine provides: 

### Vision Analysis
- **Waste Classification**: PCB, Plastic, Metal, Mixed E-waste
- **Condition Assessment**: Clean, Mixed, Damaged
- **Usability Scoring**: 0-1 scale for material condition
- **Material Detection**: Copper, Gold, Aluminum, Plastic, Lithium, etc. 

### Smart Pricing
- **Base Price Calculation**: Market-based pricing algorithms
- **Grade Multipliers**: Quality-based price adjustments
- **Material Bonuses**: Premium pricing for valuable materials
- **Price Ranges**: Confidence intervals for valuations

### Business Intelligence
- **Vendor Trust Scoring**: AI-verified reliability metrics
- **Industry Matching**: Optimal buyer recommendations
- **Market Analytics**: Trend analysis and insights

## Getting Started

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- Firebase Account
- Google AI API Key

### 1. Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 2. Backend Setup
```bash
cd server
npm install
npm run dev
```

### 3. AI Engine Setup
```bash
cd trashit-ai
pip install -r requirements. txt
uvicorn app:app --reload
```

### Environment Variables
Create `.env` files in respective directories: 

**Client (`/client/.env`)**
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp. com
# ...  other Firebase config
```

**Server (`/server/.env`)**
```env
PORT=5000
FIREBASE_SERVICE_ACCOUNT_KEY=path_to_service_account. json
```

**AI Engine (`/trashit-ai/.env`)**
```env
GEMINI_API_KEY=your_google_ai_api_key
```

## 📊 API Endpoints

### Backend Server (`localhost:5000`)
- `GET /api/listings` - Retrieve waste listings
- `POST /api/analyze` - Analyze waste images
- `GET /api/health` - Health check
- `GET /api/regions` - Available regions
- `GET /api/categories` - Waste categories

### AI Engine (`localhost:8000`)
- `POST /analyze-waste` - Complete AI-powered waste analysis
- `GET /health` - AI service health check
- `GET /docs` - Interactive API documentation

## 🔧 Technology Stack

| Component | Technologies |
|-----------|-------------|
| **Frontend** | React 19, TypeScript, TailwindCSS, Vite, Redux Toolkit |
| **Backend** | Node. js, Express, TypeScript, Firebase Admin |
| **AI Engine** | Python, FastAPI, Google Generative AI, Pillow |
| **Database** | Firebase Firestore |
| **Storage** | Firebase Storage |
| **Authentication** | Firebase Auth |
| **Deployment** | Docker, Cloud Services |

## 🌱 Environmental Impact

TrashIT contributes to sustainability by:
- **Reducing Waste**:  Connecting waste generators with processors
- **Increasing Recycling**: AI-powered material identification
- **Market Efficiency**: Transparent pricing reduces waste
- **Resource Recovery**: Maximizing material value extraction
- **Carbon Footprint**: Optimized logistics and processing

## 📈 Business Model

### Revenue Streams
1. **Transaction Fees**: Commission on successful trades
2. **Premium AI Analysis**: Enhanced scanning capabilities
3. **Enterprise Solutions**: White-label platform licensing
4. **Data Insights**: Market intelligence services
5. **Certification Services**: Quality assurance programs

### Market Opportunity
- **E-waste Market**: $65+ billion globally
- **Growing Regulations**: Increasing compliance requirements
- **Sustainability Focus**: Corporate ESG initiatives
- **Digital Transformation**: Traditional industries going digital

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Hackathon Project

**TrashIT** was developed for the **Innovate Hack 3.0** - demonstrating the potential of AI-powered solutions in sustainable waste management. 

### Team
- **Developers**: 
1. Arushi Jain
2. Naisha Sharma 
3. Shresth Mishra 
4. Soumya Soneja 
- **Focus**: Full-stack development with AI integration
- **Timeline**:  Hackathon project (rapid prototyping)



**Transform Waste.  Create Value. Build Sustainably. ** 

*TrashIT - Where AI meets Environmental Responsibility* 🌍
