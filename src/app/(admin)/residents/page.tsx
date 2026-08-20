"use client";

import { useState, useEffect } from "react";
import { getResidents } from "@/actions/residents";
import { cn } from "@/lib/utils";
import { Phone, Share2, CreditCard, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

function getStayDuration(joinDate: string) {
  if (!joinDate || joinDate === "-") return "New";
  const joined = new Date(joinDate);
  const now = new Date();
  const diff = Math.floor((now.getTime() - joined.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 30) return `${diff}d`;
  const months = Math.floor(diff / 30);
  const days = diff % 30;
  return `${months}m ${days}d (${diff} days)`;
}

export default function ResidentsPage() {
  const [residents, setResidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Active");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getResidents().then((data) => {
      setResidents(data);
      setLoading(false);
    });
  }, []);

  const tabs = [
    { label: "Active", filter: (r: any) => r.status === "Active" },
    { label: "On Notice", filter: (r: any) => r.status === "Notice Period" },
    { label: "Vacated", filter: (r: any) => r.status === "Vacated" },
    { label: "All", filter: () => true },
  ];

  const filtered = residents
    .filter(tabs.find((t) => t.label === activeTab)?.filter || (() => true))
    .filter((r) =>
      search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.residentId?.toLowerCase().includes(search.toLowerCase()) ||
      r.phone?.includes(search) ||
      r.roomName?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Residents Directory</h1>
            <p className="text-gray-500 text-sm mt-1">Active tenants, stay duration & payment history</p>
          </div>
          <Link href="?invite=true" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm self-start sm:self-auto">
            + Invite New Tenant
          </Link>

        </div>

        {/* Tabs + Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 self-start">
            {tabs.map((tab) => {
              const count = residents.filter(tab.filter).length;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap",
                    activeTab === tab.label ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>
          <div className="relative flex-1 sm:max-w-xs ml-auto">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, room, mobile, ID..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl">
            <p className="text-gray-500">No residents found.</p>
            <Link href="?invite=true" className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">
              + Invite New Resident
            </Link>

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((r: any) => (
              <div key={r._id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold text-lg shrink-0">
                      {r.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900 leading-tight">{r.fullName}</h3>
                        <span className="text-[9px] font-bold bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md">{r.id}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{r.email}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-full shrink-0",
                    r.status === "ACTIVE" ? "bg-green-100 text-green-700" :
                    r.status === "NOTICE_PERIOD" ? "bg-orange-100 text-orange-700" :
                    "bg-gray-100 text-gray-600"
                  )}>
                    {r.status}
                  </span>
                </div>

                {/* Room & Payment Info */}
                <div className="space-y-2 py-3 border-y border-gray-100 mb-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Room & Bed</span>
                    <span className="font-semibold text-gray-900 text-right">{r.roomNumber} • Bed {r.bedNumber || "-"}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Monthly Rent</span>
                    <span className="font-bold text-gray-900">₹{(r.monthlyRent || 0).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Stay Duration */}
                {r.moveInDate && (
                  <p className="text-xs text-gray-400 font-medium flex items-center gap-1.5 mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    Joined {new Date(r.moveInDate).toLocaleDateString()}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <a href={`tel:${r.phone}`} className="text-xs text-gray-500 font-medium flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                      {r.phone}
                    </a>
                    <button className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center hover:text-blue-600 hover:border-blue-200 transition-colors">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors border border-blue-100">
                    <CreditCard className="w-3.5 h-3.5" />
                    + Payment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
