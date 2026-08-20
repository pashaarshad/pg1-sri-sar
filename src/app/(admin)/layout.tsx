import { BottomNav } from "@/components/layout/BottomNav";
import { Sidebar } from "@/components/layout/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Desktop Sidebar — hidden on mobile */}
      <Sidebar className="hidden md:flex md:flex-col w-64 shrink-0" />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-x-hidden pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav className="md:hidden" />
    </div>
  );
}
