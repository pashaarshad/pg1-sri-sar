"use client";

import { useState, useEffect } from "react";
import { getApplications } from "@/actions/residents";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Pending");

  useEffect(() => {
    getApplications().then((data) => {
      setApplications(data);
      setLoading(false);
    });
  }, []);

  const tabs = [
    { label: "Pending", filter: (a: any) => a.status === "PENDING" },
    { label: "Approved", filter: (a: any) => a.status === "APPROVED" },
    { label: "Rejected", filter: (a: any) => a.status === "REJECTED" },
    { label: "All", filter: () => true },
  ];

  const filtered = applications.filter(
    tabs.find((t) => t.label === activeTab)?.filter || (() => true)
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tenant Applications</h1>
            <p className="text-gray-500 text-sm mt-1">KYC review, ID generation & room allocation</p>
          </div>

          <div className="flex gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1 self-start">
            {tabs.map((tab) => {
              const count = applications.filter(tab.filter).length;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap",
                    activeTab === tab.label ? "bg-white text-gray-900 shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-900 border border-transparent"
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
            <div className="animate-spin w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl">
            <p className="text-5xl mb-4">📋</p>
            <p className="text-gray-600 font-semibold">No {activeTab.toLowerCase()} applications</p>
            <Link href="?invite=true" className="mt-5 inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
              + Invite New Resident
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map((app: any) => (
              <div key={app.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 transition-colors">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold text-xl shrink-0">
                      {app.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900 text-lg">{app.fullName}</h3>
                        <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{app.id}</span>
                      </div>
                      <p className="text-sm text-gray-500">{app.email}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-md shrink-0 uppercase tracking-wider",
                    app.status === "PENDING" ? "bg-gray-100 text-gray-700" :
                    app.status === "APPROVED" ? "bg-green-50 text-green-700 border border-green-200" :
                    "bg-red-50 text-red-700 border border-red-200"
                  )}>
                    {app.status}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex gap-2">
                    <span className="text-gray-500 w-28 shrink-0">Contact:</span>
                    <span className="text-gray-900 font-medium">{app.mobile}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-500 w-28 shrink-0">Aadhaar:</span>
                    <span className="text-gray-900 font-medium">{app.aadharNumberMasked || 'XXXX-XXXX-XXXX'}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-500 w-28 shrink-0">Rules Accepted:</span>
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {app.acceptedRulesVersion || 'v1.0'}
                    </span>
                  </div>
                </div>

                {/* Emergency Contact */}
                {app.emergencyContact && (
                  <p className="text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2.5 mb-4 border border-gray-100">
                    <strong>Emergency:</strong> {app.emergencyContact.name} ({app.emergencyContact.relationship}) • +91 {app.emergencyContact.phone}
                  </p>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400 font-medium">Submitted {new Date(app.submittedAt).toLocaleDateString()}</span>
                  {app.status === "PENDING" && (
                    <div className="flex gap-2">
                      <button 
                        onClick={async () => {
                          if(confirm("Reject application?")) {
                            const { rejectApplication } = await import("@/actions/residents");
                            await rejectApplication(app.id, "Rejected by admin");
                            const { getApplications } = await import("@/actions/residents");
                            const data = await getApplications();
                            setApplications(data);
                          }
                        }}
                        className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                      >
                        Reject
                      </button>
                      <button 
                        onClick={async () => {
                          const { getRoomsData } = await import("@/actions/rooms");
                          const { rooms, buildings, floors } = await getRoomsData();
                          const availableRooms = rooms.filter((r: any) => r.beds.some((b: any) => b.status === "Available"));
                          if (availableRooms.length === 0) {
                            alert("No available beds to allocate!");
                            return;
                          }
                          const targetRoom = availableRooms[0];
                          const targetBed = targetRoom.beds.find((b: any) => b.status === "Available");
                          
                          if (confirm(`Approve ${app.fullName} and assign to Room ${targetRoom.roomNumber} (Bed ${targetBed.bedNumber})?`)) {
                            const { approveApplication, getApplications } = await import("@/actions/residents");
                            await approveApplication(app.id, {
                              buildingId: targetRoom.buildingId,
                              floorId: targetRoom.floorId,
                              roomId: targetRoom.id,
                              bedId: targetBed.id,
                              monthlyRent: targetRoom.baseRent,
                              securityDeposit: 10000,
                              moveInDate: new Date().toISOString()
                            });
                            alert("Approved and Allocated successfully!");
                            const data = await getApplications();
                            setApplications(data);
                          }
                        }}
                        className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
                      >
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
