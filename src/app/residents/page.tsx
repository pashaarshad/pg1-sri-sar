"use client";

import { useState } from "react";
import { Plus, Search, MoreVertical, Filter, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const residents = [
  { id: "R001", name: "Rahul Sharma", room: "203", bed: "B2", phone: "+91 9876543210", status: "Active", due: 0, joining: "19 Aug 2026" },
  { id: "R002", name: "Amit Kumar", room: "101", bed: "B1", phone: "+91 8765432109", status: "Active", due: 4500, joining: "10 Aug 2026" },
  { id: "R003", name: "Suresh Verma", room: "102", bed: "B1", phone: "+91 7654321098", status: "Active", due: 8500, joining: "1 Jan 2026" },
  { id: "R004", name: "Ravi Teja", room: "102", bed: "B3", phone: "+91 6543210987", status: "Active", due: 8500, joining: "5 Mar 2026" },
  { id: "R005", name: "Vikram Singh", room: "102", bed: "B4", phone: "+91 5432109876", status: "Notice", due: 0, joining: "15 Apr 2025" },
];

export default function ResidentsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Residents</h1>
          <p className="text-gray-500 mt-1">Manage tenants and allocations</p>
        </div>
        <Link href="/residents/new" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl px-5 py-3 text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          Add Resident
        </Link>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col-reverse sm:flex-row gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
          {["All", "Active", "Notice", "Vacated"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors",
                activeTab === tab 
                  ? "bg-gray-900 text-white shadow-sm" 
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900"
              )}
            >
              {tab}
            </button>
          ))}
          <button className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:border-gray-300 flex items-center justify-center">
            <Filter className="w-4 h-4" />
          </button>
        </div>
        <div className="relative flex-1 sm:max-w-md ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search name, room, phone..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          />
        </div>
      </div>

      {/* Residents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {residents.map((resident) => (
          <div key={resident.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative group">
            
            <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4 mb-4 pr-8">
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl shrink-0">
                {resident.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">{resident.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    {resident.id}
                  </span>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                    resident.status === "Active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                  )}>
                    {resident.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100 mb-4 text-sm">
              <div>
                <p className="text-gray-500 font-medium mb-1">Room Allocation</p>
                <p className="font-semibold text-gray-900">{resident.room} <span className="text-gray-400 font-normal">({resident.bed})</span></p>
              </div>
              <div>
                <p className="text-gray-500 font-medium mb-1">Joined</p>
                <p className="font-semibold text-gray-900">{resident.joining}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a href={`tel:${resident.phone}`} className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-colors">
                  <Phone className="w-4 h-4" />
                </a>
                <a href={`https://wa.me/${resident.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-green-600 hover:border-green-200 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
              
              <div className="text-right">
                {resident.due > 0 ? (
                  <p className="text-sm font-bold text-red-600 flex flex-col">
                    <span className="text-[10px] font-medium text-red-400 uppercase tracking-wider">Due Amount</span>
                    ₹{resident.due.toLocaleString()}
                  </p>
                ) : (
                  <p className="text-sm font-bold text-green-600 flex flex-col">
                    <span className="text-[10px] font-medium text-green-500 uppercase tracking-wider">Cleared</span>
                    No Dues
                  </p>
                )}
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
