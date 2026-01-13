import { useState } from 'react';
import { storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface WasteCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const wasteCategories: WasteCategory[] = [
  { id: 'metal', name: 'Metal Scrap', icon: '⚙️', description: 'Copper, Steel, Aluminum, Brass' },
  { id: 'plastic', name: 'Plastic Waste', icon: '♻️', description: 'PET, HDPE, PVC, LDPE' },
  { id: 'paper', name: 'Paper & Cardboard', icon: '📄', description: 'Corrugated, Office Paper, Newsprint' },
  { id: 'ewaste', name: 'E-Waste', icon: '💻', description: 'Circuit Boards, Cables, Electronics' },
  { id: 'hazardous', name: 'Hazardous Waste', icon: '⚠️', description: 'Chemicals, Batteries, Fluorescent' },
  { id: 'organic', name: 'Organic Waste', icon: '🌱', description: 'Food Waste, Agricultural Residue' },
];

export default function SellerDashboard() {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [formData, setFormData] = useState({
    wasteType: '',
    quantity: '',
    description: '',
    pickupWindow: '3_days',
    location: 'Noida',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.currentTarget;
    const file = (form.elements.namedItem('image') as HTMLInputElement).files?.[0];
    
    if (!file) {
      alert('Please upload an image');
      setLoading(false);
      return;
    }

    try {
      // Upload simulation with progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 20, 100));
      }, 200);

      // 1. Upload to Firebase
      const storageRef = ref(storage, `waste/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      clearInterval(interval);
      setUploadProgress(100);

      // 2. Send to Backend
      await fetch('http://localhost:5000/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sellerId: "demo_corp_id",
          wasteType: selectedCategory || formData.wasteType,
          quantity: Number(formData.quantity),
          description: formData.description,
          region: formData.location,
          pickupWindow: formData.pickupWindow,
          imageUrl: url,
          status: 'active',
          listedAt: new Date().toISOString()
        })
      });

      setLoading(false);
      
      // Show success modal
      const successModal = document.getElementById('success-modal');
      if (successModal) {
        (successModal as any).showModal();
      }
      
      // Reset form
      setFormData({
        wasteType: '',
        quantity: '',
        description: '',
        pickupWindow: '3_days',
        location: 'Noida',
      });
      setSelectedCategory('');
      setUploadProgress(0);
      
    } catch (error) {
      console.error('Upload failed:', error);
      setLoading(false);
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Waste Listing Dashboard</h1>
            <p className="text-gray-600 mt-2">List your industrial waste materials for verified vendors</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2">
              <div className="text-sm text-emerald-700">Active Listings</div>
              <div className="text-xl font-bold text-emerald-800">24</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
              <div className="text-sm text-blue-700">Total Revenue</div>
              <div className="text-xl font-bold text-blue-800">₹1,84,500</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Quick Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Avg. Response Time</span>
                  <span className="font-medium">2.4 hrs</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-3/4"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Success Rate</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-11/12"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Avg. Price/kg</span>
                  <span className="font-medium">₹42.5</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-2/3"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Waste Categories</h3>
            <div className="space-y-3">
              {wasteCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${selectedCategory === category.id ? 'bg-emerald-50 border-emerald-300' : 'hover:bg-gray-50'}`}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">{category.name}</div>
                    <div className="text-sm text-gray-500">{category.description}</div>
                  </div>
                  {selectedCategory === category.id && (
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Listing Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl text-white">+</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Create New Listing</h2>
                <p className="text-gray-600">Fill in details about your waste material</p>
              </div>
            </div>

            <form onSubmit={handleList} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Waste Type *
                  </label>
                  <input
                    name="wasteType"
                    value={formData.wasteType}
                    onChange={handleInputChange}
                    placeholder="e.g., Copper Wire, PET Bottles, Circuit Boards"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-2">Select from categories or specify custom type</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity (kg) *
                  </label>
                  <div className="relative">
                    <input
                      name="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="Estimated weight in kilograms"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                    <div className="absolute right-3 top-3 text-gray-400">kg</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Window *
                  </label>
                  <select
                    name="pickupWindow"
                    value={formData.pickupWindow}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="1_day">Within 24 hours</option>
                    <option value="3_days">Within 3 days</option>
                    <option value="1_week">Within 1 week</option>
                    <option value="2_weeks">Within 2 weeks</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="Noida">Noida</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Faridabad">Faridabad</option>
                    <option value="Ghaziabad">Ghaziabad</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Add details about quality, storage conditions, packaging, etc."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Images *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors">
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    required
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-medium mb-2">Click to upload images</p>
                    <p className="text-gray-500 text-sm">High-quality photos help vendors assess better</p>
                  </label>
                </div>
                {uploadProgress > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing Listing...
                    </>
                  ) : (
                    <>
                      <span>Publish Listing</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="text-center text-gray-500 text-sm mt-3">
                  Listing will be visible to verified vendors in your region
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <dialog id="success-modal" className="modal">
        <div className="modal-box bg-white p-0 rounded-2xl max-w-md">
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Listing Published!</h3>
            <p className="text-gray-600 mb-6">
              Your waste listing is now live and visible to vendors. You'll receive bids soon.
            </p>
            <div className="flex gap-3">
              <form method="dialog" className="flex-1">
                <button className="w-full bg-emerald-600 text-white font-medium py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                  Done
                </button>
              </form>
              <button 
                onClick={() => window.location.reload()}
                className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Create Another
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}