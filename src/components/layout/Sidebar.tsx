"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Bed, Users, FileText, CreditCard,
  BookOpen, BarChart3, Bell, Settings, UserPlus
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Bed, label: "Rooms & Beds", href: "/rooms", badge: 0 },
  { icon: Users, label: "Residents", href: "/residents", badge: 0 },
  { icon: FileText, label: "Applications", href: "/applications", badge: 4 },
  { icon: CreditCard, label: "Fees & Payments", href: "/payments", badge: 0 },
  { icon: BookOpen, label: "Rules & Regulations", href: "/rules", badge: 0 },
  { icon: BarChart3, label: "Reports & Export", href: "/reports", badge: 0 },
  { icon: Bell, label: "Notifications", href: "/notifications", badge: 3 },
  { icon: Settings, label: "PG Settings", href: "/settings", badge: 0 },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("w-64 bg-white border-r border-gray-200 min-h-screen flex-col", className)}>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">PG</div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 leading-tight">ABC DEF PG</h1>
            <p className="text-xs text-gray-500">PG Operations & Management</p>
          </div>
        </div>
      </div>

      {/* Invite Button */}
      <div className="px-4 py-4">
        <Link
          href="?invite=true"
          className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-4 py-3 rounded-xl transition-colors shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          + Invite New Resident
        </Link>
      </div>


      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-5 h-5", isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600")} />
                {item.label}
              </div>
              {item.badge > 0 && (
                <span className={cn(
                  "text-xs font-bold px-2 py-0.5 rounded-full",
                  isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Storage Quota at Bottom */}
      <div className="px-4 py-4 border-t border-gray-100 mt-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-600">Storage Quota</span>
          <span className="text-xs font-bold text-gray-900">19.71/500 MB</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "3.9%" }}></div>
        </div>
        <p className="text-xs text-gray-400 mt-1.5">3.9% Used · 480 MB Available</p>
      </div>
    </aside>
  );
}
