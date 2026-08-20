"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Bed, CreditCard, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  className?: string;
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname();

  const items = [
    { icon: LayoutDashboard, label: "Home", href: "/" },
    { icon: Users, label: "Residents", href: "/residents" },
    { icon: Bed, label: "Rooms", href: "/rooms" },
    { icon: CreditCard, label: "Payments", href: "/payments" },
    { icon: MoreHorizontal, label: "More", href: "/settings" },
  ];

  return (
    <nav className={cn("fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-inset-bottom", className)}>
      <div className="flex justify-around items-center px-2 py-2">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 min-w-[56px] py-1 px-2 rounded-xl transition-colors",
                isActive ? "text-blue-600" : "text-gray-400"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
