import { Bell, CreditCard, UserPlus, Info, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const notifications = [
  { id: 1, type: "payment", title: "Payment Due", desc: "Suresh Verma's rent (₹8,500) is due today.", time: "2 hours ago", read: false, icon: CreditCard, color: "text-orange-600", bg: "bg-orange-100" },
  { id: 2, type: "application", title: "New Application", desc: "Amit Kumar submitted a new resident application.", time: "5 hours ago", read: false, icon: UserPlus, color: "text-blue-600", bg: "bg-blue-100" },
  { id: 3, type: "overdue", title: "Payment Overdue", desc: "Mohit Das's rent is overdue by 3 days.", time: "1 day ago", read: true, icon: Bell, color: "text-red-600", bg: "bg-red-100" },
  { id: 4, type: "success", title: "Payment Received", desc: "Received ₹8,500 from Rahul Sharma via UPI.", time: "2 days ago", read: true, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
  { id: 5, type: "system", title: "Storage Alert", desc: "Your storage quota is healthy (4% used).", time: "1 week ago", read: true, icon: Info, color: "text-gray-600", bg: "bg-gray-100" },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Notifications</h1>
          <p className="text-gray-500 mt-1">Updates on payments, applications, and system alerts</p>
        </div>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg self-start sm:self-auto">
          Mark all as read
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className={cn(
              "p-5 flex gap-4 hover:bg-gray-50 transition-colors relative",
              !notif.read ? "bg-blue-50/30" : ""
            )}
          >
            {!notif.read && (
              <span className="absolute top-5 right-5 w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
            )}
            
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0", notif.bg)}>
              <notif.icon className={cn("w-6 h-6", notif.color)} />
            </div>
            
            <div className="pr-6">
              <h3 className={cn("text-sm font-bold", !notif.read ? "text-gray-900" : "text-gray-700")}>
                {notif.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">{notif.desc}</p>
              <p className="text-xs font-medium text-gray-400 mt-2">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="text-sm font-medium text-gray-500 hover:text-gray-800">
          Load older notifications
        </button>
      </div>
    </div>
  );
}
