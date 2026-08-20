"use client";

import { useState, useEffect } from "react";
import { getResidents } from "@/actions/residents";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Pending");

  useEffect(() => {
    getResidents().then((data) => {
      setApplications(data);
      setLoading(false);
    });
  }, []);

  const tabs = [
    { label: "Pending", filter: (r: any) => r.status === "Application Pending" },
    { label: "Approved", filter: (r: any) => r.status === "Active" },
    { label: "Rejected", filter: (r: any) => r.status === "Rejected" },
    { label: "All", filter: () => true },
  ];

  const filtered = applications.filter(
    tabs.find((t) => t.label === activeTab)?.filter || (() => true)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tenant Applications</h1>
            <p className="text-gray-500 text-sm mt-1">KYC review, ID generation & room allocation</p>
          </div>

          {/* Tab Pills */}
          <div className="flex gap-2 bg-white border border-gray-200 rounded-xl p-1 self-start">
            {tabs.map((tab) => {
              const count = applications.filter(tab.filter).length;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap",
                    activeTab === tab.label ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl">
            <p className="text-5xl mb-4">📋</p>
            <p className="text-gray-600 font-semibold">No {activeTab.toLowerCase()} applications</p>
            <Link href="?invite=true" className="mt-5 inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-green-700 transition-colors">
              + Invite New Resident
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map((app: any) => (
              <div key={app._id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shrink-0">
                      {app.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900 text-lg">{app.name}</h3>
                        <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{app.residentId}</span>
                      </div>
                      <p className="text-sm text-gray-500">{app.email}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0",
                    app.status === "Application Pending" ? "bg-orange-100 text-orange-700" :
                    app.status === "Active" ? "bg-green-100 text-green-700" :
                    "bg-red-100 text-red-700"
                  )}>
                    {app.status === "Application Pending" ? "PENDING" :
                     app.status === "Active" ? "APPROVED" : "REJECTED"}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-28 shrink-0 font-medium">Contact:</span>
                    <span className="text-gray-700 font-semibold">{app.phone}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-28 shrink-0 font-medium">Email:</span>
                    <span className="text-gray-700 font-semibold">{app.email}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-28 shrink-0 font-medium">Aadhaar (Masked):</span>
                    <span className="text-gray-700 font-semibold">XXXX-XXXX-XXXX</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-28 shrink-0 font-medium">Rules Accepted:</span>
                    <span className="text-green-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> v1.0 (Aug 2026)
                    </span>
                  </div>
                </div>

                {/* Emergency Contact */}
                {app.emergencyContact && (
                  <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 mb-4">
                    <strong>Emergency:</strong> {app.emergencyContact.name} ({app.emergencyContact.relation}) • +91 {app.emergencyContact.phone}
                  </p>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400 font-medium">Submitted recently</span>
                  {app.status === "Application Pending" && (
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1.5 text-red-600 hover:text-red-700 text-sm font-bold transition-colors px-3 py-1.5">
                        Reject
                      </button>
                      <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors shadow-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        Approve & Allocate
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
