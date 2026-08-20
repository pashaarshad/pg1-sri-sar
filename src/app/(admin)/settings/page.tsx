"use client";

import { useState } from "react";
import { Save, BellRing, Lock, Building2, User, Key } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("property");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your PG configurations and preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 flex flex-row md:flex-col gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
          <button 
            onClick={() => setActiveTab("property")}
            className={cn("flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap md:whitespace-normal text-left", 
              activeTab === "property" ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100")}
          >
            <Building2 className="w-4 h-4" />
            Property Details
          </button>
          <button 
            onClick={() => setActiveTab("notifications")}
            className={cn("flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap md:whitespace-normal text-left", 
              activeTab === "notifications" ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100")}
          >
            <BellRing className="w-4 h-4" />
            Notification Settings
          </button>
          <button 
            onClick={() => setActiveTab("security")}
            className={cn("flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap md:whitespace-normal text-left", 
              activeTab === "security" ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100")}
          >
            <Lock className="w-4 h-4" />
            Security & Access
          </button>
          <button 
            onClick={() => setActiveTab("account")}
            className={cn("flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap md:whitespace-normal text-left", 
              activeTab === "account" ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100")}
          >
            <User className="w-4 h-4" />
            Admin Account
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          
          {activeTab === "property" && (
            <div className="animate-in fade-in space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Property Details</h2>
              <div className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">PG Name</label>
                  <input type="text" defaultValue="ABC DEF PG" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <textarea defaultValue="123, Main Street, Bangalore" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none" rows={3}></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Email</label>
                  <input type="email" defaultValue="admin@abcdefpg.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="animate-in fade-in space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Payment Reminders</h2>
              
              <div className="space-y-6 max-w-lg">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-900">First Reminder</p>
                    <p className="text-sm text-gray-500">Sent before the due date</p>
                  </div>
                  <select className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                    <option>2 days before</option>
                    <option>3 days before</option>
                    <option>5 days before</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-900">Due Date Reminder</p>
                    <p className="text-sm text-gray-500">Sent on the exact due date</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-900">Overdue Reminder</p>
                    <p className="text-sm text-gray-500">Sent after the due date</p>
                  </div>
                  <select className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                    <option>Every 1 day</option>
                    <option>Every 3 days</option>
                    <option>Every 5 days</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="animate-in fade-in space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Edit Protection</h2>
              <div className="max-w-lg text-sm text-gray-600 mb-6 leading-relaxed">
                The Edit Password is required whenever you try to modify sensitive information such as rent amounts, security deposits, or resident records.
              </div>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Edit Password</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="password" placeholder="Enter current password" defaultValue="6565" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                  <input type="password" placeholder="Enter new password" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" />
                </div>
                <button className="mt-4 bg-gray-900 text-white font-medium px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="animate-in fade-in space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Admin Account</h2>
              <p className="text-gray-500 text-sm">Account details and session management.</p>
              <button className="text-red-600 bg-red-50 hover:bg-red-100 font-semibold px-5 py-3 rounded-xl transition-colors mt-4">
                Sign Out
              </button>
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
            <button className="flex items-center gap-2 bg-blue-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
