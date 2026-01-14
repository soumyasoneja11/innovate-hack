# 🚀 TrashIT AI Integration - Setup Checklist

Follow these steps to get the AI-powered waste analysis working on your website.

## ✅ Pre-Setup Checklist

- [ ] Node.js 16+ installed (`node --version`)
- [ ] Python 3.8+ installed (`python3 --version`)
- [ ] npm installed (`npm --version`)
- [ ] pip installed (`pip --version`)
- [ ] Google Gemini API key obtained

## 📋 Step-by-Step Setup

### 1️⃣ Get Gemini API Key
- [ ] Go to https://makersuite.google.com/app/apikey
- [ ] Sign in with Google account
- [ ] Create a new API key
- [ ] Copy the API key

### 2️⃣ Set Environment Variable
- [ ] Open terminal
- [ ] Run: `export GEMINI_API_KEY="your-api-key-here"`
- [ ] Verify: `echo $GEMINI_API_KEY` (should show your key)

### 3️⃣ Install AI Engine Dependencies
```bash
cd trashit-ai
pip install -r requirements.txt
```
- [ ] All packages installed successfully
- [ ] No error messages

### 4️⃣ Install Backend Dependencies
```bash
cd ../server
npm install
```
- [ ] All packages installed successfully
- [ ] `node_modules` folder created

### 5️⃣ Install Frontend Dependencies
```bash
cd ../client
npm install
```
- [ ] All packages installed successfully
- [ ] `node_modules` folder created

### 6️⃣ Start AI Engine
```bash
cd ../trashit-ai
uvicorn app:app --reload --port 8000
```
- [ ] Server started without errors
- [ ] See message: "Application startup complete"
- [ ] Can access http://localhost:8000/docs

### 7️⃣ Start Backend (New Terminal)
```bash
cd server
npm run dev
```
- [ ] Server started on port 5000
- [ ] No TypeScript errors

### 8️⃣ Start Frontend (New Terminal)
```bash
cd client
npm run dev
```
- [ ] Vite dev server started
- [ ] Can access http://localhost:5173
- [ ] No compilation errors

## 🧪 Testing the Integration

### Test 1: Access the Website
- [ ] Go to http://localhost:5173
- [ ] Page loads successfully
- [ ] No console errors

### Test 2: Navigate to Vendor Dashboard
- [ ] Click "Collection Vendor" card
- [ ] Vendor Marketplace dashboard loads
- [ ] Waste listings are visible

### Test 3: Test AI Scan (Free Plan)
- [ ] Click "🔍 AI Scan & Estimate" on any listing
- [ ] Modal shows "Analyzing waste composition..."
- [ ] After 2-3 seconds, results appear with:
  - [ ] Waste Type
  - [ ] Confidence percentage
  - [ ] Price Range
  - [ ] Usability Assessment

### Test 4: Test AI Scan (Premium Plan)
- [ ] Click the "Premium" toggle button
- [ ] Click "🔍 AI Scan & Estimate" on any listing
- [ ] Results show additional data:
  - [ ] Material Composition breakdown
  - [ ] Recommendations list
  - [ ] Higher confidence (98%)

### Test 5: Check AI Engine Logs
- [ ] Look at the terminal running AI Engine
- [ ] Should see POST requests to `/analyze-waste`
- [ ] No error messages

## 🔍 Verification Checklist

### All Services Running
- [ ] Frontend: http://localhost:5173 ✅
- [ ] Backend: http://localhost:5000 ✅
- [ ] AI Engine: http://localhost:8000 ✅
- [ ] AI Docs: http://localhost:8000/docs ✅

### Key Features Working
- [ ] Dashboard loads with waste listings
- [ ] Filters work (Category, Location, etc.)
- [ ] Free/Premium toggle works
- [ ] AI Scan button appears on each listing
- [ ] Clicking AI Scan triggers analysis
- [ ] Results modal displays properly
- [ ] All data fields populated

### Browser Console
- [ ] No CORS errors
- [ ] No 404 errors
- [ ] Successful POST to `http://localhost:8000/analyze-waste`

## 🐛 Common Issues & Solutions

### Issue: "GEMINI_API_KEY not found"
**Solution:**
```bash
export GEMINI_API_KEY="your-key-here"
# Then restart the AI Engine
```

### Issue: "vite: command not found"
**Solution:**
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: "Port 8000 already in use"
**Solution:**
```bash
lsof -ti:8000 | xargs kill -9
# Then restart AI Engine
```

### Issue: CORS error in browser
**Solution:**
- Check AI Engine is running on port 8000
- Verify CORS middleware in `trashit-ai/app.py`
- Clear browser cache and reload

### Issue: AI returns error
**Solution:**
- Check terminal logs for AI Engine
- Verify image URL is accessible
- Check Gemini API quota/limits

## 📊 Success Indicators

You know everything is working when:
1. ✅ All 3 terminals show servers running
2. ✅ Website loads at localhost:5173
3. ✅ Clicking AI Scan shows loading state
4. ✅ Results appear with waste type, pricing, etc.
5. ✅ Premium features show extra data
6. ✅ No errors in browser console
7. ✅ AI Engine logs show successful requests

## 🎉 You're Done!

If all checkboxes are ticked, your AI integration is complete!

### Next Steps:
- [ ] Test with different waste images
- [ ] Try all dashboard features
- [ ] Check the other dashboards (Seller, Industry)
- [ ] Customize the UI as needed
- [ ] Deploy to production

## 📞 Need Help?

1. Check the terminal logs for all 3 services
2. Review [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
3. Check API documentation at http://localhost:8000/docs
4. Look for errors in browser DevTools → Console

---

**Pro Tip:** Use the quick start script to run everything at once:
```bash
./start-all.sh
```
