import Link from "next/link";
import { getDashboardStats } from "@/actions/dashboard";
import { cn } from "@/lib/utils";
import { UserPlus, CreditCard, Share2, Bed, Eye, Clock } from "lucide-react";

export default async function Dashboard() {
  const stats = await getDashboardStats() || {
    totalBeds: 0, occupiedBeds: 0, vacantBeds: 0, pendingApps: 0,
    payment: { expected: 0, collected: 0, due: 0 },
    recentPayments: []
  };

  const occupancyPct = stats.totalBeds > 0 ? Math.round((stats.occupiedBeds / stats.totalBeds) * 100) : 0;
  const collectedPct = stats.payment.expected > 0 ? Math.round((stats.payment.collected / stats.payment.expected) * 100) : 0;

  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="md:hidden flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">PG</div>
          <span className="font-bold text-gray-900 text-sm">ABC DEF PG</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold",
            occupancyPct > 80 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"
          )}>
            <span className={cn("w-2 h-2 rounded-full", occupancyPct > 80 ? "bg-red-500" : "bg-green-500")}></span>
            {stats.occupiedBeds}/{stats.totalBeds} Beds ({occupancyPct}%)
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="?invite=true" className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
            <UserPlus className="w-4 h-4" />
            Invite Tenant
          </Link>

          <Link href="/notifications" className="relative w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
            <span className="text-gray-600">🔔</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
          </Link>
          <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl text-sm font-semibold text-gray-700">
            👤 Admin Mode
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{greeting}, Admin 🔥</h1>
            <p className="text-gray-500 mt-1 text-sm">ABC DEF PG • {today}</p>
          </div>
          <div className="flex items-center gap-3 self-start">
            <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
              <Share2 className="w-4 h-4" />
              Share Link
            </button>
            <Link href="/payments" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
              <CreditCard className="w-4 h-4" />
              Record Payment
            </Link>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Occupancy */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Occupancy</p>
              <Bed className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.occupiedBeds}<span className="text-lg text-gray-400 font-medium">/{stats.totalBeds}</span></p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-bold text-blue-600">{occupancyPct}%</span>
            </div>
            <div className="flex gap-3 mt-2 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400"></span>{stats.vacantBeds} Available</span>
            </div>
          </div>

          {/* Active Residents */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Active Residents</p>
              <span className="text-blue-500 text-lg">👥</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.occupiedBeds}</p>
            <p className="text-sm text-gray-500 mt-2 font-medium">Tenants</p>
            <p className="text-xs text-gray-400 mt-1">Verified KYC records</p>
          </div>

          {/* Applications */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Applications</p>
              <span className="text-orange-500 text-lg">📋</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.pendingApps}</p>
            {stats.pendingApps > 0 ? (
              <span className="inline-block mt-2 text-xs font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Needs Review</span>
            ) : (
              <span className="inline-block mt-2 text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">All Clear</span>
            )}
            <p className="text-xs text-gray-400 mt-1">Ready for room allocation</p>
          </div>

          {/* Amount Due */}
          <div className={cn("rounded-2xl p-5 border shadow-sm", stats.payment.due > 0 ? "bg-red-50 border-red-200" : "bg-white border-gray-200")}>
            <div className="flex items-center justify-between mb-3">
              <p className={cn("text-xs font-bold uppercase tracking-wider", stats.payment.due > 0 ? "text-red-400" : "text-gray-400")}>Amount Due</p>
              <CreditCard className={cn("w-5 h-5", stats.payment.due > 0 ? "text-red-500" : "text-gray-400")} />
            </div>
            <p className={cn("text-3xl font-bold", stats.payment.due > 0 ? "text-red-600" : "text-gray-900")}>
              ₹{stats.payment.due.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-gray-500 mt-2 font-medium">{stats.recentPayments.length} residents pending</p>
          </div>
        </div>

        {/* Payment Overview + Storage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
          {/* Payment Overview */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Payment Overview</h3>
                  <p className="text-xs text-gray-400">{stats.payment.currentMonth}</p>
                </div>
              </div>
              <Link href="/payments" className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
                View Ledger →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 font-medium mb-1">Expected</p>
                <p className="text-xl font-bold text-gray-900">₹{stats.payment.expected.toLocaleString("en-IN")}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 font-medium mb-1">Collected</p>
                <p className="text-xl font-bold text-green-600">₹{stats.payment.collected.toLocaleString("en-IN")}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 font-medium mb-1">Due</p>
                <p className="text-xl font-bold text-red-600">₹{stats.payment.due.toLocaleString("en-IN")}</p>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
              <div className="bg-green-500 h-2.5 rounded-full transition-all" style={{ width: `${collectedPct}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span className="text-green-600 font-bold">{collectedPct}% Collected</span>
              <span>Due day: 5th of every month</span>
            </div>
          </div>

          {/* Storage Usage */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-blue-600">💾</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Storage Usage</h3>
                  <p className="text-xs text-gray-400">Application File Quota</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-bold bg-green-100 text-green-700 px-3 py-1.5 rounded-full">
                ✓ Storage Healthy
              </span>
            </div>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-bold text-gray-900">19.71</span>
              <span className="text-gray-500 font-medium mb-1">MB</span>
              <span className="text-gray-400 mb-1 text-sm">/ 500 MB</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-3">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "3.9%" }}></div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-gray-700">3.9% Used</p>
                <p className="text-xs text-gray-400 mt-0.5">480.3 MB Available</p>
              </div>
              <button className="text-blue-600 text-sm font-semibold hover:underline">Manage Files →</button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Quick Actions</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link href="?invite=true" className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-3.5 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-colors shadow-sm">
              <UserPlus className="w-4 h-4" /> + Resident
            </Link>

            <Link href="/payments" className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-3.5 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-colors shadow-sm">
              <CreditCard className="w-4 h-4" /> + Payment
            </Link>
            <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-3.5 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-colors shadow-sm">
              <Share2 className="w-4 h-4" /> Share Link
            </button>
            <Link href="/rooms" className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-3.5 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-colors shadow-sm">
              <Bed className="w-4 h-4" /> View Rooms
            </Link>
          </div>
        </div>

        {/* Bottom: Pending Applications + Payment Dues */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Pending Applications */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <span className="text-orange-500">📋</span>
                Pending Applications ({stats.pendingApps})
              </h3>
              <Link href="/applications" className="text-blue-600 text-sm font-semibold hover:underline">View All</Link>
            </div>
            <div className="divide-y divide-gray-100">
              {stats.pendingApps === 0 ? (
                <div className="px-5 py-8 text-center text-gray-500 text-sm">No pending applications</div>
              ) : (
                <div className="px-5 py-8 text-center text-gray-500 text-sm">
                  <p>{stats.pendingApps} application(s) pending review</p>
                  <Link href="/applications" className="text-blue-600 font-semibold mt-2 inline-block">Review Applications →</Link>
                </div>
              )}
            </div>
          </div>

          {/* Payment Dues */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <span className="text-red-500">⏰</span>
                Payment Dues ({stats.recentPayments.length})
              </h3>
              <Link href="/payments" className="text-blue-600 text-sm font-semibold hover:underline">Collect</Link>
            </div>
            <div className="divide-y divide-gray-100">
              {stats.recentPayments.length === 0 ? (
                <div className="px-5 py-8 text-center text-gray-500 text-sm">🎉 No pending dues</div>
              ) : (
                stats.recentPayments.map((p: any) => (
                  <div key={p.id} className="px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm shrink-0">
                        {p.tenantName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm leading-tight">{p.tenantName}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{p.roomName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600 text-sm">₹{p.amount.toLocaleString("en-IN")} Due</p>
                      <Link href="/payments" className="text-xs text-blue-600 font-semibold hover:underline">Record Payment</Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
