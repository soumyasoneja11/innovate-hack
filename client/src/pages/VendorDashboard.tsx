import { useEffect, useState, type ReactNode } from 'react';

interface Listing {
  id: string;
  wasteType: string;
  quantity: number;
  imageUrl: string;
  createdAt: string;
  location: string;
  sellerName: string;
  pickupWindow: string;
  bids: number;
  estimatedValue?: number;
  category: string;
}

interface Filter {
  category: string;
  location: string;
  minQuantity: number;
  maxQuantity: number;
  sortBy: string;
}

export default function VendorDashboard() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [scanning, setScanning] = useState(false);
  const [filters, setFilters] = useState<Filter>({
    category: 'all',
    location: 'all',
    minQuantity: 0,
    maxQuantity: 1000,
    sortBy: 'newest'
  });
  const [activeTab, setActiveTab] = useState<'marketplace' | 'my_bids' | 'analytics'>('marketplace');

  // Mock data
  const mockListings: Listing[] = [
    {
      id: '1',
      wasteType: 'Copper Wire Scrap',
      quantity: 250,
      imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400',
      createdAt: '2024-01-13T10:30:00Z',
      location: 'Noida',
      sellerName: 'TechCorp Industries',
      pickupWindow: '3_days',
      bids: 8,
      estimatedValue: 12500,
      category: 'metal'
    },
    {
      id: '2',
      wasteType: 'PET Plastic Bottles',
      quantity: 500,
      imageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w-400',
      createdAt: '2024-01-13T09:15:00Z',
      location: 'Gurgaon',
      sellerName: 'Beverage Co.',
      pickupWindow: '1_week',
      bids: 12,
      estimatedValue: 8500,
      category: 'plastic'
    },
    {
      id: '3',
      wasteType: 'Circuit Boards',
      quantity: 120,
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w-400',
      createdAt: '2024-01-12T14:20:00Z',
      location: 'Delhi',
      sellerName: 'ElectroTech Ltd',
      pickupWindow: '1_day',
      bids: 15,
      estimatedValue: 24000,
      category: 'ewaste'
    },
    {
      id: '4',
      wasteType: 'Corrugated Cardboard',
      quantity: 800,
      imageUrl: 'https://images.unsplash.com/photo-1592921870789-04563d55041c?w=400',
      createdAt: '2024-01-12T11:45:00Z',
      location: 'Noida',
      sellerName: 'E-Commerce Giant',
      pickupWindow: '2_weeks',
      bids: 6,
      estimatedValue: 3200,
      category: 'paper'
    },
  ];

  // VendorDashboard.tsx - Updated useEffect for API integration

useEffect(() => {
  const fetchListings = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/listings?region=${filters.location !== 'all' ? filters.location : 'Noida'}&tier=${isPremium ? 'premium' : 'free'}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        // Apply additional filters on frontend
        let filteredData = data.filter(item => {
          if (filters.category !== 'all' && item.category !== filters.category) return false;
          if (item.quantity < filters.minQuantity || item.quantity > filters.maxQuantity) return false;
          return true;
        });

        // Apply sorting
        filteredData.sort((a, b) => {
          switch (filters.sortBy) {
            case 'newest':
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'quantity_high':
              return b.quantity - a.quantity;
            case 'quantity_low':
              return a.quantity - b.quantity;
            case 'bids_high':
              return (b.bids || 0) - (a.bids || 0);
            default:
              return 0;
          }
        });

        setListings(filteredData);
      } else {
        console.error('API returned non-array data:', data);
        setListings([]);
      }
    } catch (error) {
      console.error('Failed to fetch listings:', error);
      // Fallback to mock data if API fails
      setListings(mockListings);
    } finally {
    }
  };

  fetchListings();
}, [isPremium, filters]);

  const handleScan = async () => {
    setScanning(true);
    setScanResult("scanning");
    
    setTimeout(() => {
      setScanResult({
        wasteType: "Copper Wire",
        confidence: isPremium ? "98%" : "85%",
        priceRange: { min: isPremium ? 42 : 38, max: isPremium ? 58 : 52 },
        usability: isPremium 
          ? "High-grade copper suitable for electrical applications. 95% purity detected."
          : "Good quality copper wire with estimated 90% purity.",
        composition: isPremium ? {
          copper: "92%",
          insulation: "8%",
          impurities: "<1%"
        } : undefined,
        recommendations: isPremium ? [
          "Best fit for: Electrical component manufacturers",
          "Processing required: Insulation stripping",
          "Market demand: High"
        ] : undefined
      });
      setScanning(false);
    }, 2000);
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      metal: 'MT',
      plastic: 'PL',
      paper: 'PP',
      ewaste: 'EW',
      hazardous: 'HZ',
      organic: 'OR'
    };
    return icons[category] || 'GN';
  };

  const getPickupBadge = (window: string) => {
    const config: { [key: string]: { text: string; color: string } } = {
      '1_day': { text: '24h', color: 'bg-red-100 text-red-800' },
      '3_days': { text: '3 days', color: 'bg-amber-100 text-amber-800' },
      '1_week': { text: '1 week', color: 'bg-blue-100 text-blue-800' },
      '2_weeks': { text: '2 weeks', color: 'bg-emerald-100 text-emerald-800' }
    };
    return config[window] || { text: window, color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Vendor Marketplace</h1>
            <p className="text-gray-600 mt-2">Discover waste listings, analyze quality, and place bids</p>
          </div>
          
          {/* Premium Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className={`p-1 rounded-full flex ${isPremium ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : 'bg-gray-200'}`}>
              <button
                onClick={() => setIsPremium(false)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${!isPremium ? 'bg-white shadow' : 'text-gray-700 hover:text-gray-900'}`}
              >
                Free Plan
              </button>
              <button
                onClick={() => setIsPremium(true)}
                className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-1 ${isPremium ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'}`}
              >
                <span className="text-xs font-bold">★</span> Premium
              </button>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-blue-700">Monthly Revenue</div>
                  <div className="text-xl font-bold text-blue-900">₹2,34,500</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-2">
            {[
              { id: 'marketplace', label: 'Marketplace' },
              { id: 'my_bids', label: 'My Bids' },
              { id: 'analytics', label: 'Analytics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 font-medium rounded-t-lg border-b-2 transition-all ${activeTab === tab.id ? 'border-blue-600 text-blue-700 bg-blue-50' : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="all">All Categories</option>
              <option value="metal">Metal Scrap</option>
              <option value="plastic">Plastic Waste</option>
              <option value="paper">Paper & Cardboard</option>
              <option value="ewaste">E-Waste</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            >
              <option value="all">All Locations</option>
              <option value="noida">Noida</option>
              <option value="gurgaon">Gurgaon</option>
              <option value="delhi">Delhi</option>
              <option value="faridabad">Faridabad</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity Range (kg)</label>
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="Min"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={filters.minQuantity}
                onChange={(e) => setFilters({...filters, minQuantity: Number(e.target.value)})}
              />
              <input 
                type="number" 
                placeholder="Max"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={filters.maxQuantity}
                onChange={(e) => setFilters({...filters, maxQuantity: Number(e.target.value)})}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
            >
              <option value="newest">Newest First</option>
              <option value="quantity_high">Quantity: High to Low</option>
              <option value="quantity_low">Quantity: Low to High</option>
              <option value="bids_high">Most Bids</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-6 border-t">
          <div className="text-sm text-gray-600">
            Showing <span className="font-bold">{listings.length}</span> listings
            {isPremium && <span className="ml-2 text-blue-600">👑 Premium access active</span>}
          </div>
          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Custom Alert
          </button>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings &&(listings ?? []).map((item) => {
          const pickupBadge = getPickupBadge(item.pickupWindow);
          return (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-300">
              {/* Image with category badge */}
              <div className="relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.wasteType}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm border border-gray-100">
                    <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white ${
                      item.category === 'metal' ? 'bg-gradient-to-br from-gray-600 to-gray-700' :
                      item.category === 'plastic' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                      item.category === 'paper' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                      item.category === 'ewaste' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                      item.category === 'hazardous' ? 'bg-gradient-to-br from-red-500 to-red-600' :
                      'bg-gradient-to-br from-green-500 to-green-600'
                    }`}>
                      {getCategoryIcon(item.category)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className={`text-xs font-semibold px-2 py-1 rounded-full ${pickupBadge.color}`}>
                    {pickupBadge.text}
                  </div>
                </div>
              </div>
              
              {/* Listing Details */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{item.wasteType}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {item.sellerName}
                      </span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {item.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{item.quantity} kg</div>
                    <div className="text-sm text-gray-500">Quantity</div>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Active Bids</div>
                    <div className="text-lg font-bold text-blue-700">{item.bids}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Est. Value</div>
                    <div className="text-lg font-bold text-emerald-700">₹{item.estimatedValue?.toLocaleString()}</div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  <button 
                    onClick={() => handleScan()}
                    disabled={scanning}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {scanning ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Scanning...
                      </>
                    ) : (
                      <>
                        <span>🔍 AI Scan & Estimate</span>
                        {isPremium && <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full">PREMIUM</span>}
                      </>
                    )}
                  </button>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 border border-emerald-600 text-emerald-700 font-medium py-3 rounded-lg hover:bg-emerald-50 transition-colors">
                      Place Bid
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Result Modal */}
      {(scanResult || scanning) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">AI Analysis Result</h2>
                <button 
                  onClick={() => {
                    setScanResult(null);
                    setScanning(false);
                  }}
                  className="text-white/80 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <span className="flex items-center gap-1">
                  {isPremium && <span className="text-yellow-300">★</span>}
                  {isPremium ? 'Premium Analysis' : 'Basic Analysis'}
                </span>
                <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                <span>Powered by TrashIT AI</span>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              {scanResult === "scanning" || scanning ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-700">Analyzing waste composition...</p>
                  <p className="text-sm text-gray-500 mt-2">Our AI is examining the material</p>
                </div>
              ) : scanResult && (
                <div className="space-y-6">
                  {/* Main Result */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-sm text-blue-700 mb-1">Waste Type</div>
                      <div className="font-bold text-lg text-gray-900">{scanResult.wasteType}</div>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4">
                      <div className="text-sm text-emerald-700 mb-1">Confidence</div>
                      <div className="font-bold text-lg text-gray-900">{scanResult.confidence}</div>
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div className="bg-amber-50 rounded-xl p-4">
                    <div className="text-sm text-amber-700 mb-2">Estimated Price Range</div>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">₹{scanResult.priceRange.min}</div>
                        <div className="text-xs text-gray-600">Min per kg</div>
                      </div>
                      <div className="text-gray-400">→</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">₹{scanResult.priceRange.max}</div>
                        <div className="text-xs text-gray-600">Max per kg</div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-amber-800">
                      Market average: ₹{(scanResult.priceRange.min + scanResult.priceRange.max) / 2} per kg
                    </div>
                  </div>
                  
                  {/* Usability */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-700 mb-2">Usability Assessment</div>
                    <p className="text-gray-900">{scanResult.usability}</p>
                  </div>
                  
                  {/* Premium Features */}
                  {isPremium && scanResult.composition && (
                    <>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Material Composition</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {Object.entries(scanResult.composition).map(([key, value]) => (
                            <div key={key} className="bg-white border rounded-lg p-3 text-center">
                              <div className="text-lg font-bold text-gray-900">{value as unknown as ReactNode}</div>
                              <div className="text-xs text-gray-600 capitalize">{key}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Recommendations</h4>
                        <ul className="space-y-2">
                          {scanResult.recommendations?.map((rec: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-emerald-500 mt-0.5">✓</span>
                              <span className="text-gray-700">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    <button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all">
                      Use for Bid Calculation
                    </button>
                    <button className="px-6 border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors">
                      Save Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}