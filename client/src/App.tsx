import { useState } from 'react';
import { IndustryDashboard, SellerDashboard, VendorDashboard } from './pages/Index';


function App() {
  const [userRole, setUserRole] = useState<'seller' | 'vendor' | 'industry' | null>(null);

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex flex-col items-center justify-center p-4">
        <div className="w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              TrashIT
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The B2B marketplace connecting waste sellers, collection vendors, and processing industries
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Corporate Sellers</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2.5k+</div>
              <div className="text-gray-600 font-medium">Verified Vendors</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">180+</div>
              <div className="text-gray-600 font-medium">Processing Industries</div>
            </div>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Seller Card */}
            <div 
              onClick={() => setUserRole('seller')}
              className="bg-white rounded-2xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl group border-2 border-emerald-100 hover:border-emerald-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all">
                  <span className="text-2xl font-bold text-white">CS</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Corporate Seller</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  List industrial waste materials, get competitive bids, and ensure sustainable disposal
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                  <span>List Waste</span>
                  <span>→</span>
                </div>
              </div>
            </div>

            {/* Vendor Card */}
            <div 
              onClick={() => setUserRole('vendor')}
              className="bg-white rounded-2xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl group border-2 border-blue-100 hover:border-blue-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all">
                  <span className="text-2xl font-bold text-white">CV</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Collection Vendor</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Discover waste listings, use AI-powered valuation, and connect with industries
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                  <span>Browse Marketplace</span>
                  <span>→</span>
                </div>
              </div>
            </div>

            {/* Industry Card */}
            <div 
              onClick={() => setUserRole('industry')}
              className="bg-white rounded-2xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl group border-2 border-amber-100 hover:border-amber-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all">
                  <span className="text-2xl font-bold text-white">PI</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Processing Industry</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Source quality waste materials, track sustainability metrics, and manage procurement
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-amber-600">
                  <span>Source Materials</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              Join 3000+ businesses transforming waste into value
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-base font-black text-white">T</span>
              </div>
              <span className="font-bold text-xl text-gray-800">
                TrashIT
              </span>
              <div className="ml-4 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
                {userRole === 'seller' ? 'Corporate Dashboard' : 
                 userRole === 'vendor' ? 'Vendor Marketplace' : 
                 'Industry Portal'}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
                <a href="#" className="hover:text-emerald-600 font-medium">Dashboard</a>
                <a href="#" className="hover:text-emerald-600 font-medium">Transactions</a>
                <a href="#" className="hover:text-emerald-600 font-medium">Analytics</a>
                <a href="#" className="hover:text-emerald-600 font-medium">Support</a>
              </div>
              
              <div className="relative group">
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                    {userRole === 'seller' ? 'CS' : userRole === 'vendor' ? 'CV' : 'PI'}
                  </div>
                  <span className="font-medium text-gray-700">Demo Account</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button 
                    onClick={() => setUserRole(null)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Switch Role / Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {userRole === 'seller' ? <SellerDashboard /> : 
       userRole === 'vendor' ? <VendorDashboard /> : 
       <IndustryDashboard />}
    </div>
  );
}

export default App;