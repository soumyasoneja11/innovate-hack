# TrashIT - AI-Powered E-Waste Intelligence Platform 
("Revolutionizing the Circular Economy with AI-Driven Waste Intelligence”)
**TrashIT** is a comprehensive B2B marketplace that revolutionizes e-waste management by connecting waste sellers, collection vendors, and processing industries through AI-powered valuation and transparent pricing. 

## Overview

TrashIT transforms the traditional waste management ecosystem by providing: 
- **AI-driven e-waste analysis** using computer vision and machine learning
- **Real-time pricing** with transparent market valuations
- **B2B marketplace** connecting multiple stakeholders
- **Quality assessment** and material detection
- **Industry matching** for optimal waste processing

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

## Technology Stack

| Component | Technologies |
|-----------|-------------|
| **Frontend** | React 19, TypeScript, TailwindCSS, Vite, Redux Toolkit |
| **Backend** | Node. js, Express, TypeScript, Firebase Admin |
| **AI Engine** | Python, FastAPI, Google Generative AI, Pillow |
| **Database** | Firebase Firestore |
| **Storage** | Firebase Storage |
| **Authentication** | Firebase Auth |
| **Deployment** | Docker, Cloud Services |

## Environmental Impact

TrashIT contributes to sustainability by:
- **Reducing Waste**:  Connecting waste generators with processors
- **Increasing Recycling**: AI-powered material identification
- **Market Efficiency**: Transparent pricing reduces waste
- **Resource Recovery**: Maximizing material value extraction
- **Carbon Footprint**: Optimized logistics and processing

### Market Opportunity
- **E-waste Market**: $65+ billion globally
- **Growing Regulations**: Increasing compliance requirements
- **Sustainability Focus**: Corporate ESG initiatives
- **Digital Transformation**: Traditional industries going digital

## Hackathon Project

**TrashIT** was developed for the **Innovate Hack 3.0** - demonstrating the potential of AI-powered solutions in sustainable waste management. 

### Team
- **Developers**: 
1. Arushi Jain
2. Naisha Sharma 
3. Shresth Mishra 
4. Soumya Soneja 
- **Focus**: Full-stack development with AI integration
- **Timeline**:  Hackathon project (rapid prototyping)

