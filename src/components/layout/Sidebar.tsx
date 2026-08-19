import { Home, Users, Bed, CreditCard, FileText, Settings, Bell } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const items = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Users, label: "Residents", href: "/residents" },
    { icon: Bed, label: "Rooms", href: "/rooms" },
    { icon: CreditCard, label: "Payments", href: "/payments" },
    { icon: FileText, label: "Rules", href: "/rules" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside className={cn("w-64 bg-white border-r border-gray-200 min-h-screen flex-col pt-8", className)}>
      <div className="px-8 mb-10">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">ABC DEF PG</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 hover:text-blue-600 transition-colors"
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
