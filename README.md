<<<<<<< Updated upstream
# TrashIT - AI-Powered E-Waste Intelligence Platform 
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

=======
# TrashIT - B2B Waste Management Platform 🚮♻️

AI-powered marketplace connecting waste sellers, collection vendors, and processing industries for transparent and sustainable e-waste trading.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### One-Command Setup

1. **Set your Gemini API key:**
```bash
export GEMINI_API_KEY="your-api-key-here"
```

2. **Install all dependencies:**
```bash
# Install Python dependencies
cd trashit-ai && pip install -r requirements.txt && cd ..

# Install Node.js dependencies
cd server && npm install && cd ..
cd client && npm install && cd ..
```

3. **Start all services:**
```bash
./start-all.sh
```

This will start:
- 🎨 **Frontend** at http://localhost:5173
- ⚙️ **Backend API** at http://localhost:5000
- 🤖 **AI Engine** at http://localhost:8000

4. **Stop all services:**
```bash
./stop-all.sh
```

## 📚 Full Documentation

For detailed setup instructions, see [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)

## 🏗️ Architecture

```
┌─────────────────┐
│   React/Vite    │ ──┐
│   Frontend      │   │
└─────────────────┘   │
                      ├──▶ Backend API (Node.js)
┌─────────────────┐   │    - Listings management
│  AI Engine      │ ──┘    - User data
│  (FastAPI)      │         
└─────────────────┘
  - Gemini Vision
  - Material detection
  - Price estimation
```

## ✨ Features

### For Corporate Sellers
- 📸 Upload waste materials with images
- 📊 Track listings and bids
- 💰 Revenue analytics
- ✅ Firebase storage integration

### For Collection Vendors
- 🔍 **AI-Powered Waste Analysis**
  - Automatic material detection
  - Quality grading (A/B/C)
  - Price estimation with confidence scores
- 🏪 Browse marketplace with advanced filters
- 💎 Premium tier for detailed insights
- 📈 Bid management

### For Processing Industries
- 🔎 Source quality materials
- 🎯 Match with suppliers
- 📊 Sustainability tracking
- 🏭 Industry-specific recommendations

## 🤖 AI Features

The platform uses **Google Gemini 1.5 Flash** for:

1. **Waste Classification**: Identifies PCB, Metal, Plastic, E-waste
2. **Material Detection**: Finds Copper, Gold, Aluminum, Lithium, etc.
3. **Quality Assessment**: Analyzes condition and usability
4. **Price Prediction**: Estimates fair market value
5. **Industry Matching**: Recommends suitable buyers

### Free vs Premium

| Feature | Free | Premium |
|---------|------|---------|
| Waste type detection | ✅ | ✅ |
| Basic pricing | ✅ | ✅ |
| Detailed composition | ❌ | ✅ |
| Industry recommendations | ❌ | ✅ |
| AI verification badge | ❌ | ✅ |
| Confidence accuracy | 85% | 98% |

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **AI Engine**: Python, FastAPI, Google Gemini
- **Storage**: Firebase Storage
- **Image Processing**: Pillow (PIL)

## 📁 Project Structure

```
innovate-hack/
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/      # Dashboard components
│   │   └── lib/        # Firebase config
│   └── package.json
│
├── server/             # Node.js backend
│   ├── src/
│   │   └── index.ts   # API routes
│   └── package.json
│
├── trashit-ai/         # Python AI engine
│   ├── app.py         # FastAPI app
│   ├── ai_engine/     # AI modules
│   │   ├── vision.py
│   │   ├── grading.py
│   │   └── pricing.py
│   └── requirements.txt
│
├── start-all.sh       # Start all services
├── stop-all.sh        # Stop all services
└── INTEGRATION_GUIDE.md
```

## 🧪 Testing

### Test AI Analysis
```bash
curl -X POST "http://localhost:8000/analyze-waste" \
  -F "file=@test-image.jpg"
```

### Test Backend API
```bash
curl "http://localhost:5000/api/listings?region=Noida"
```

## 🔧 Environment Variables

Create a `.env` file or export these:

```bash
# AI Engine (Required)
GEMINI_API_KEY=your-gemini-api-key

# Backend (Optional)
PORT=5000

# Frontend (Optional)
VITE_API_URL=http://localhost:5000
VITE_AI_URL=http://localhost:8000
```

## 🐛 Troubleshooting

**AI Engine not starting?**
- Check if Python packages are installed: `pip list | grep fastapi`
- Verify API key: `echo $GEMINI_API_KEY`

**CORS errors?**
- Ensure AI Engine is running on port 8000
- Check browser console for exact error

**Port conflicts?**
- Kill processes: `lsof -ti:5173 | xargs kill -9`

## 📖 API Documentation

Once running, visit:
- **AI Engine Swagger UI**: http://localhost:8000/docs
- **AI Engine ReDoc**: http://localhost:8000/redoc

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🎯 Roadmap

- [ ] User authentication
- [ ] Real-time bidding
- [ ] Payment integration
- [ ] Mobile app
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

---

Built with ♻️ for a sustainable future
>>>>>>> Stashed changes
