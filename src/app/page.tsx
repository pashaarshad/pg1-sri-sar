import { Plus, Share2, Eye, UserPlus, CreditCard, ChevronRight } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      
      {/* Mobile Header */}
      <header className="mb-8 md:hidden">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">ABC DEF PG</h1>
        <p className="text-gray-500 mt-1">Good evening, Admin 👋</p>
      </header>
      
      {/* Desktop Header */}
      <header className="hidden md:block mb-10">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h2>
        <p className="text-gray-500 mt-1">Good evening, Admin 👋</p>
      </header>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Beds</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">60</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Occupied</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">48</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Vacant</p>
          <p className="text-3xl font-bold text-green-600 mt-2">12</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Applications</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">4</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Payment Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Expected</span>
              <span className="font-medium text-gray-900">₹4,80,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Collected</span>
              <span className="font-semibold text-green-600">₹4,18,500</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="text-gray-900 font-medium">Due Amount</span>
              <span className="font-bold text-red-600">₹61,500</span>
            </div>
          </div>
        </div>

        {/* Storage */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Storage Usage</h3>
          <div className="mb-2 flex justify-between items-end">
            <span className="text-3xl font-bold text-gray-900">20 <span className="text-lg text-gray-500 font-medium">MB</span></span>
            <span className="text-sm font-medium text-gray-500">/ 500 MB</span>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-3 mt-4 mb-3">
            <div className="bg-green-500 h-3 rounded-full" style={{ width: '4%' }}></div>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">4% Used</span>
            <span className="text-green-600 font-medium flex items-center gap-1">✓ Storage Healthy</span>
          </div>
        </div>
      </div>

      {/* Quick Actions (Scrollable on mobile) */}
      <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase mb-4 px-1">Quick Actions</h3>
      <div className="flex overflow-x-auto gap-4 pb-6 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        <button className="flex-none flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-xl px-5 py-3 text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors">
          <UserPlus className="w-4 h-4 text-blue-600" />
          Add Resident
        </button>
        <button className="flex-none flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-xl px-5 py-3 text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors">
          <CreditCard className="w-4 h-4 text-blue-600" />
          Record Payment
        </button>
        <button className="flex-none flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-xl px-5 py-3 text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors">
          <Share2 className="w-4 h-4 text-blue-600" />
          Share Link
        </button>
        <button className="flex-none flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-xl px-5 py-3 text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors">
          <Eye className="w-4 h-4 text-blue-600" />
          View Rooms
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {/* Pending Applications List */}
        <div>
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase">Pending Applications</h3>
            <button className="text-sm font-medium text-blue-600">View all</button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">R</div>
                <div>
                  <p className="font-medium text-gray-900">Rahul Sharma</p>
                  <p className="text-xs text-gray-500 mt-0.5">Applied 2 hours ago</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">A</div>
                <div>
                  <p className="font-medium text-gray-900">Amit Kumar</p>
                  <p className="text-xs text-gray-500 mt-0.5">Applied yesterday</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Payment Due List */}
        <div>
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase">Payment Due</h3>
            <button className="text-sm font-medium text-blue-600">View all</button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">S</div>
                <div>
                  <p className="font-medium text-gray-900">Suresh Verma</p>
                  <p className="text-xs text-red-500 font-medium mt-0.5">Overdue by 3 days</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">₹4,500</p>
                <p className="text-xs text-gray-500 mt-0.5">Room 101</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">M</div>
                <div>
                  <p className="font-medium text-gray-900">Mohit Das</p>
                  <p className="text-xs text-orange-500 font-medium mt-0.5">Due today</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">₹8,500</p>
                <p className="text-xs text-gray-500 mt-0.5">Room 203</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
