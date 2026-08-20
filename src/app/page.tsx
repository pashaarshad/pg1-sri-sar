import { Plus, Share2, Eye, UserPlus, CreditCard, ChevronRight, AlertCircle } from "lucide-react";
import { getDashboardStats } from "@/actions/dashboard";
import { seedAllData, clearAllData } from "@/actions/seed";
import { cn } from "@/lib/utils";


export default async function Dashboard() {
  const stats = await getDashboardStats() || {
    totalBeds: 0, occupiedBeds: 0, vacantBeds: 0, pendingApps: 0,
    payment: { expected: 0, collected: 0, due: 0 },
    recentPayments: []
  };

  const isEmpty = stats.totalBeds === 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <header className="mb-8 md:hidden">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">ABC DEF PG</h1>
        <p className="text-gray-500 mt-1">Good evening, Admin 👋</p>
      </header>
      
      <header className="hidden md:flex mb-10 justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h2>
          <p className="text-gray-500 mt-1">Good evening, Admin 👋</p>
        </div>
        {isEmpty ? (
          <form action={seedAllData}>
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow hover:bg-indigo-700">Seed Database</button>
          </form>
        ) : (
          <form action={clearAllData}>
            <button className="bg-red-50 text-red-600 px-5 py-2 rounded-xl text-sm font-bold shadow-sm border border-red-100 hover:bg-red-100">Clear Data</button>
          </form>
        )}
      </header>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Beds</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalBeds}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Occupied</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.occupiedBeds}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Vacant</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.vacantBeds}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Applications</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.pendingApps}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Expected</span>
              <span className="font-medium text-gray-900">₹{stats.payment.expected.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Collected</span>
              <span className="font-semibold text-green-600">₹{stats.payment.collected.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="text-gray-900 font-medium">Due Amount</span>
              <span className={cn("font-bold", stats.payment.due > 0 ? "text-red-600" : "text-gray-900")}>
                ₹{stats.payment.due.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

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

      <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase mb-4 px-1">Quick Actions</h3>
      <div className="flex overflow-x-auto gap-4 pb-6 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        <button className="flex-none flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-xl px-5 py-3 text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors">
          <UserPlus className="w-4 h-4 text-blue-600" /> Add Resident
        </button>
        <button className="flex-none flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-xl px-5 py-3 text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors">
          <CreditCard className="w-4 h-4 text-blue-600" /> Record Payment
        </button>
        <button className="flex-none flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-xl px-5 py-3 text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors">
          <Share2 className="w-4 h-4 text-blue-600" /> Share Link
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {/* Simplified due list for dashboard */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase">Payment Due</h3>
          </div>
          {stats.recentPayments.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
              No pending payments.
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {stats.recentPayments.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">{p.tenantName.charAt(0)}</div>
                    <div>
                      <p className="font-medium text-gray-900">{p.tenantName}</p>
                      <p className="text-xs text-red-500 font-medium mt-0.5">{p.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{p.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{p.roomName}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
