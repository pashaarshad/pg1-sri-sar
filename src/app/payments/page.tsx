"use client";

import { useState } from "react";
import { Search, Plus, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const payments = [
  { id: "P1", tenant: "Rahul Sharma", room: "203 (B2)", amount: 8500, status: "Paid", date: "19 Aug 2026", method: "UPI" },
  { id: "P2", tenant: "Amit Kumar", room: "101 (B1)", amount: 4000, expected: 8500, status: "Partially Paid", date: "18 Aug 2026", method: "Cash" },
  { id: "P3", tenant: "Suresh Verma", room: "102 (B1)", amount: 8500, status: "Overdue", date: "Due 15 Aug 2026", method: "-" },
  { id: "P4", tenant: "Ravi Teja", room: "102 (B3)", amount: 8500, status: "Due", date: "Due Today", method: "-" },
];

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Payments & Dues</h1>
          <p className="text-gray-500 mt-1">Manage monthly collections and history</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl px-5 py-3 text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          Record Payment
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col-reverse sm:flex-row gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {["All", "Due", "Overdue", "Paid"].map((tab) => (
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
        </div>
        <div className="relative flex-1 sm:max-w-md ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search tenant..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          />
        </div>
      </div>

      {/* Payments List (Mobile Cards, Desktop Table) */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-6 gap-4 p-4 border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="col-span-2">Resident</div>
          <div>Amount / Status</div>
          <div>Method</div>
          <div>Date</div>
          <div className="text-right">Action</div>
        </div>

        {/* List Items */}
        <div className="divide-y divide-gray-100">
          {payments.map((payment) => (
            <div key={payment.id} className="p-4 sm:p-5 hover:bg-gray-50/50 transition-colors flex flex-col md:grid md:grid-cols-6 md:gap-4 md:items-center">
              
              {/* Mobile layout top row / Desktop col 1-2 */}
              <div className="flex items-start justify-between md:col-span-2 mb-3 md:mb-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                    {payment.tenant.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 leading-tight">{payment.tenant}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Room {payment.room}</p>
                  </div>
                </div>
                {/* Status dot for mobile only */}
                <div className="md:hidden">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full",
                    payment.status === "Paid" && "bg-green-100 text-green-700",
                    payment.status === "Partially Paid" && "bg-blue-100 text-blue-700",
                    payment.status === "Due" && "bg-orange-100 text-orange-700",
                    payment.status === "Overdue" && "bg-red-100 text-red-700",
                  )}>
                    {payment.status}
                  </span>
                </div>
              </div>

              {/* Amount & Status Desktop */}
              <div className="flex justify-between items-end md:block md:col-span-1 mb-2 md:mb-0">
                <span className="text-sm font-medium text-gray-500 md:hidden">Amount:</span>
                <div>
                  <p className="font-bold text-gray-900 text-lg md:text-base">
                    ₹{payment.amount.toLocaleString()}
                  </p>
                  {payment.status === "Partially Paid" && payment.expected && (
                    <p className="text-xs text-gray-500">of ₹{payment.expected.toLocaleString()}</p>
                  )}
                  {/* Status badge for desktop */}
                  <span className={cn(
                    "hidden md:inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                    payment.status === "Paid" && "bg-green-100 text-green-700",
                    payment.status === "Partially Paid" && "bg-blue-100 text-blue-700",
                    payment.status === "Due" && "bg-orange-100 text-orange-700",
                    payment.status === "Overdue" && "bg-red-100 text-red-700",
                  )}>
                    {payment.status}
                  </span>
                </div>
              </div>

              {/* Method & Date */}
              <div className="flex justify-between md:block md:col-span-1 mb-1 md:mb-0">
                <span className="text-sm font-medium text-gray-500 md:hidden">Method:</span>
                <span className="text-sm text-gray-700 font-medium">{payment.method}</span>
              </div>
              
              <div className="flex justify-between md:block md:col-span-1 mb-4 md:mb-0">
                <span className="text-sm font-medium text-gray-500 md:hidden">Date:</span>
                <span className={cn(
                  "text-sm font-medium flex items-center gap-1.5",
                  payment.status === "Overdue" ? "text-red-600" : "text-gray-500"
                )}>
                  {payment.status === "Overdue" && <AlertCircle className="w-3.5 h-3.5" />}
                  {payment.status === "Due" && <Clock className="w-3.5 h-3.5" />}
                  {payment.status === "Paid" && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                  {payment.date}
                </span>
              </div>

              {/* Actions */}
              <div className="md:col-span-1 md:text-right border-t border-gray-100 pt-3 md:border-0 md:pt-0">
                {payment.status === "Paid" ? (
                  <button className="w-full md:w-auto flex justify-center items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-sm font-medium transition-colors border border-gray-200">
                    <FileText className="w-4 h-4" />
                    Receipt
                  </button>
                ) : (
                  <button className="w-full md:w-auto px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-bold transition-colors">
                    Collect
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
