import { useState } from 'react';

interface MaterialRequest {
  id: string;
  materialType: string;
  quantity: number;
  qualityGrade: string;
  maxPrice: number;
  location: string;
  urgency: string;
  status: 'open' | 'in_progress' | 'fulfilled';
}

interface Supplier {
  id: string;
  name: string;
  rating: number;
  reliability: number;
  materials: string[];
}

export default function IndustryDashboard() {
  const [activeTab, setActiveTab] = useState<'sourcing' | 'suppliers' | 'sustainability'>('sourcing');
  const materialRequests : MaterialRequest[] = ([
    {
      id: '1',
      materialType: 'Copper Wire',
      quantity: 1000,
      qualityGrade: 'A+',
      maxPrice: 55,
      location: 'Noida',
      urgency: 'high',
      status: 'open'
    },
    {
      id: '2',
      materialType: 'PET Flakes',
      quantity: 5000,
      qualityGrade: 'A',
      maxPrice: 25,
      location: 'Gurgaon',
      urgency: 'medium',
      status: 'in_progress'
    },
    {
      id: '3',
      materialType: 'Aluminum Scrap',
      quantity: 2000,
      qualityGrade: 'B+',
      maxPrice: 40,
      location: 'Delhi',
      urgency: 'low',
      status: 'open'
    }
  ]);

  const suppliers : Supplier[] = ([
    {
      id: '1',
      name: 'GreenScrap Ventures',
      rating: 4.8,
      reliability: 98,
      materials: ['Copper', 'Aluminum', 'Steel']
    },
    {
      id: '2',
      name: 'EcoProcess Corp',
      rating: 4.6,
      reliability: 95,
      materials: ['PET', 'HDPE', 'PVC']
    },
    {
      id: '3',
      name: 'MetalMasters',
      rating: 4.9,
      reliability: 99,
      materials: ['Copper', 'Brass', 'Stainless Steel']
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Industry Procurement Portal</h1>
            <p className="text-gray-600 mt-2">Source quality waste materials and track sustainability metrics</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-amber-700">Monthly Procurement</div>
                  <div className="text-xl font-bold text-amber-900">₹15,84,500</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-2">
            {[
              { id: 'sourcing', label: 'Material Sourcing' },
              { id: 'suppliers', label: 'Supplier Network' },
              { id: 'sustainability', label: 'Sustainability' },
              { id: 'analytics', label: 'Analytics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 font-medium rounded-t-lg border-b-2 transition-all ${activeTab === tab.id ? 'border-amber-600 text-amber-700 bg-amber-50' : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'sourcing' && (
        <div className="space-y-6">
          {/* Material Requirements */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Material Requirements</h2>
              <button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold px-6 py-2 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all flex items-center gap-2">
                <span>+</span>
                <span>New Requirement</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Material Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Quantity</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Quality Grade</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Max Price/kg</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Urgency</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {materialRequests.map((request) => (
                    <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{request.materialType}</div>
                        <div className="text-sm text-gray-500">{request.location}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium">{request.quantity.toLocaleString()} kg</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${request.qualityGrade === 'A+' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                          {request.qualityGrade}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-gray-900">₹{request.maxPrice}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          request.urgency === 'high' ? 'bg-red-100 text-red-800' :
                          request.urgency === 'medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {request.urgency}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          request.status === 'open' ? 'bg-blue-100 text-blue-800' :
                          request.status === 'in_progress' ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {request.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800 font-medium">
                            View Bids
                          </button>
                          <button className="text-amber-600 hover:text-amber-800 font-medium">
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommended Suppliers */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended Suppliers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliers.map((supplier) => (
                <div key={supplier.id} className="border border-gray-200 rounded-xl p-5 hover:border-amber-300 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{supplier.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < Math.floor(supplier.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                        <span className="text-sm text-gray-600 ml-1">{supplier.rating}</span>
                      </div>
                    </div>
                    <div className="bg-emerald-50 rounded-lg px-3 py-1">
                      <div className="text-emerald-700 font-bold">{supplier.reliability}%</div>
                      <div className="text-xs text-emerald-600">Reliability</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">Specializes in:</div>
                    <div className="flex flex-wrap gap-2">
                      {supplier.materials.map((material) => (
                        <span key={material} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full border border-amber-600 text-amber-700 font-medium py-2 rounded-lg hover:bg-amber-50 transition-colors">
                    Send Inquiry
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sustainability' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
              <div className="text-4xl font-bold mb-2">1,250</div>
              <div className="text-lg font-medium mb-1">Tons Recycled</div>
              <div className="text-emerald-100 text-sm">Equivalent to 25,000 trees saved</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
              <div className="text-4xl font-bold mb-2">84%</div>
              <div className="text-lg font-medium mb-1">Waste Diversion</div>
              <div className="text-blue-100 text-sm">From landfill to circular economy</div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
              <div className="text-4xl font-bold mb-2">₹42L</div>
              <div className="text-lg font-medium mb-1">Cost Savings</div>
              <div className="text-amber-100 text-sm">Through sustainable procurement</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Carbon Footprint Tracking</h2>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Carbon footprint visualization chart would appear here
            </div>
          </div>
        </div>
      )}
    </div>
  );
}