# 🚀 TrashIT - Quick Reference Card

## One-Line Commands

### Start Everything
```bash
export GEMINI_API_KEY="your-key" && ./start-all.sh
```

### Stop Everything
```bash
./stop-all.sh
```

## Individual Services

### AI Engine (Port 8000)
```bash
cd trashit-ai
export GEMINI_API_KEY="your-key"
uvicorn app:app --reload --port 8000
```

### Backend (Port 5000)
```bash
cd server
npm run dev
```

### Frontend (Port 5173)
```bash
cd client
npm run dev
```

## Quick Access URLs

| Service | URL | Purpose |
|---------|-----|---------|
| 🎨 Frontend | http://localhost:5173 | Main web app |
| ⚙️ Backend | http://localhost:5000 | REST API |
| 🤖 AI Engine | http://localhost:8000 | AI analysis |
| 📚 API Docs | http://localhost:8000/docs | Swagger UI |

## Test Commands

### Test AI Engine
```bash
curl -X POST http://localhost:8000/analyze-waste \
  -F "file=@test-image.jpg"
```

### Test Backend
```bash
curl http://localhost:5000/api/listings
```

### Health Checks
```bash
curl http://localhost:5000/health  # Backend
curl http://localhost:8000/health  # AI Engine
```

## Common Issues

| Problem | Solution |
|---------|----------|
| Port in use | `lsof -ti:PORT \| xargs kill -9` |
| GEMINI_API_KEY error | `export GEMINI_API_KEY="key"` |
| vite not found | `cd client && npm install` |
| CORS error | Check AI Engine is on :8000 |

## File Locations

```
innovate-hack/
├── client/           Frontend (React)
├── server/           Backend (Node.js)
├── trashit-ai/       AI Engine (Python)
├── start-all.sh      🚀 Start script
├── stop-all.sh       ⏹️  Stop script
├── README.md         📖 Main docs
├── INTEGRATION_GUIDE.md   📚 Full guide
└── SETUP_CHECKLIST.md     ✅ Checklist
```

## Environment Variables

```bash
export GEMINI_API_KEY="your-gemini-key-here"
```

## Key Features to Test

1. ✅ Click "Collection Vendor"
2. ✅ See marketplace listings
3. ✅ Toggle Free/Premium
4. ✅ Click "AI Scan & Estimate"
5. ✅ See analysis results

## Production Checklist

- [ ] Update CORS origins in `trashit-ai/app.py`
- [ ] Set production environment variables
- [ ] Configure Firebase for production
- [ ] Add authentication
- [ ] Set up monitoring/logging
- [ ] Deploy AI Engine (Google Cloud Run)
- [ ] Deploy Backend (Railway/Heroku)
- [ ] Deploy Frontend (Vercel/Netlify)

## Support

- 📚 Full docs: [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
- ✅ Setup: [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
- 🏗️ Architecture: [ARCHITECTURE.md](./ARCHITECTURE.md)
- 📊 Summary: [INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md)

---

**Quick Tip:** Bookmark http://localhost:8000/docs for API testing!
