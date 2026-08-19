import { Home, Users, Bed, Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  className?: string;
}

export function BottomNav({ className }: BottomNavProps) {
  return (
    <nav className={cn("fixed bottom-0 w-full bg-white border-t border-gray-200 z-50 px-6 py-3 flex justify-between items-center", className)}>
      <Link href="/" className="flex flex-col items-center text-blue-600">
        <Home className="h-6 w-6" />
        <span className="text-xs font-medium mt-1">Home</span>
      </Link>
      
      <Link href="/residents" className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors">
        <Users className="h-6 w-6" />
        <span className="text-xs font-medium mt-1">Residents</span>
      </Link>
      
      <Link href="/rooms" className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors">
        <Bed className="h-6 w-6" />
        <span className="text-xs font-medium mt-1">Rooms</span>
      </Link>
      
      <button className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors">
        <Menu className="h-6 w-6" />
        <span className="text-xs font-medium mt-1">More</span>
      </button>
    </nav>
  );
}
