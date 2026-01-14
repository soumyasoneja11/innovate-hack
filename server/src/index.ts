import express, { Request, Response } from 'express';
import cors from 'cors';
import { db } from './firebaseAdmin';

const app = express();
app.use(cors());
app.use(express.json());

// --- TYPES ---
interface Listing {
  sellerId: string;
  wasteType: string;
  quantity: number;
  imageUrl: string;
  region: string;
  status: 'AVAILABLE' | 'SOLD';
  createdAt: string;
  sellerName?: string;
  pickupWindow?: string;
  bids?: number;
  estimatedValue?: number;
  category?: string;
  description?: string;
}

// --- ROUTES ---

// 1. SELLER: List Waste
app.post('/api/listings', async (req: Request, res: Response) => {
  try {
    const data: Listing = {
      ...req.body,
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      bids: 0, // Initialize with 0 bids
      estimatedValue: req.body.estimatedValue || 0,
      category: req.body.category || 'general',
      sellerName: req.body.sellerName || 'Anonymous Seller'
    };
    
    // Validate required fields
    if (!data.sellerId || !data.wasteType || !data.quantity || !data.imageUrl || !data.region) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Save to "listings" collection
    const docRef = await db.collection('listings').add(data);
    res.status(200).json({ 
      id: docRef.id, 
      message: 'Listed successfully',
      listing: { id: docRef.id, ...data }
    });
  } catch (error) {
    console.error('Error listing waste:', error);
    res.status(500).json({ error: 'Failed to list waste' });
  }
});

// 2. VENDOR: Get Feed (Implements "Subscription Early Access" Logic)
app.get('/api/listings', async (req: Request, res: Response) => {
  try {
    const { region, tier } = req.query; // tier = 'free' or 'premium'
    
    if (!region) {
      return res.status(400).json({ error: 'Region is required' });
    }

    // Basic Query
    let query = db.collection('listings')
      .where('status', '==', 'AVAILABLE')
      .where('region', '==', region);

    const snapshot = await query.get();
    let listings = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      // Ensure all required fields exist
      sellerName: doc.data().sellerName || 'Corporate Seller',
      pickupWindow: doc.data().pickupWindow || '3_days',
      bids: doc.data().bids || 0,
      estimatedValue: doc.data().estimatedValue || 0,
      category: doc.data().category || 'general'
    })) as unknown as Listing[];

    // LOGIC: If Tier is FREE, hide listings created in the last 2 hours
    // (Premium users see them instantly)
    if (tier !== 'premium') {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
      listings = listings.filter(l => new Date(l.createdAt) < twoHoursAgo);
    }

    // Sort by newest first
    listings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

// 3. AI MODEL INTEGRATION (Implements "Better Accuracy" Logic)
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { imageUrl, tier } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'imageUrl is required' });
    }

    // SIMULATION: Your teammate will replace this with real model call
    console.log(`Analyzing image for ${tier} user...`);
    
    // Determine waste type based on image URL or content (simulated)
    const wasteTypes = [
      { type: 'Copper Wire', confidence: '98%', min: 42, max: 58 },
      { type: 'PET Plastic', confidence: '92%', min: 18, max: 25 },
      { type: 'Aluminum', confidence: '95%', min: 35, max: 48 },
      { type: 'Circuit Board', confidence: '88%', min: 150, max: 220 },
      { type: 'Cardboard', confidence: '96%', min: 3, max: 8 },
      { type: 'Glass Bottles', confidence: '94%', min: 2, max: 6 }
    ];
    
    const randomType = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
    
    // Logic: Premium users get a narrower (more precise) price range and better accuracy
    const baseMin = randomType.min;
    const baseMax = randomType.max;
    
    let minPrice, maxPrice, confidence;
    
    if (tier === 'premium') {
      // Premium: Narrower range, higher confidence
      minPrice = baseMin + 5; // Premium users see higher min price
      maxPrice = baseMax + 2; // Slightly higher max
      confidence = randomType.confidence;
      
      res.json({
        wasteType: randomType.type,
        confidence: confidence,
        priceRange: { min: minPrice, max: maxPrice },
        usability: "High-grade material suitable for industrial applications. Low contamination detected.",
        composition: {
          primaryMaterial: "90%",
          secondaryMaterials: "8%",
          contaminants: "2%"
        },
        recommendations: [
          "Best fit for: Manufacturing industries",
          "Processing required: Minimal cleaning needed",
          "Market demand: High"
        ]
      });
    } else {
      // Free: Wider range, lower confidence
      minPrice = baseMin - 5;
      maxPrice = baseMax + 5;
      confidence = `${parseInt(randomType.confidence) - 10}%`;
      
      res.json({
        wasteType: randomType.type,
        confidence: confidence,
        priceRange: { min: minPrice, max: maxPrice },
        usability: "Good quality material with moderate market value. Some processing may be required."
      });
    }
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

// 4. Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 5. Get regions endpoint (for dropdowns)
app.get('/api/regions', (req: Request, res: Response) => {
  const regions = ['Noida', 'Gurgaon', 'Delhi', 'Faridabad', 'Ghaziabad'];
  res.json(regions);
});

// 6. Get categories endpoint
app.get('/api/categories', (req: Request, res: Response) => {
  const categories = [
    { id: 'metal', name: 'Metal Scrap', icon: '⚙️' },
    { id: 'plastic', name: 'Plastic Waste', icon: '♻️' },
    { id: 'paper', name: 'Paper & Cardboard', icon: '📄' },
    { id: 'ewaste', name: 'E-Waste', icon: '💻' },
    { id: 'hazardous', name: 'Hazardous Waste', icon: '⚠️' },
    { id: 'organic', name: 'Organic Waste', icon: '🌱' },
    { id: 'glass', name: 'Glass', icon: '🍶' }
  ];
  res.json(categories);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));