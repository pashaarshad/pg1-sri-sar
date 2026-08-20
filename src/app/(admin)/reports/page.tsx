import { BarChart3, Download, Users, CreditCard, Bed, TrendingUp } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reports & Export</h1>
          <p className="text-gray-500 mt-1">Download and view detailed reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          { icon: Bed, title: "Occupancy Report", desc: "Total beds, occupied, vacant by building and floor", color: "bg-blue-50 text-blue-600" },
          { icon: CreditCard, title: "Payment Report", desc: "Expected vs collected vs due, per month", color: "bg-green-50 text-green-600" },
          { icon: Users, title: "Resident List", desc: "All active and vacated residents with details", color: "bg-purple-50 text-purple-600" },
          { icon: BarChart3, title: "Application History", desc: "All applications: approved, rejected, pending", color: "bg-orange-50 text-orange-600" },
          { icon: TrendingUp, title: "Revenue Report", desc: "Monthly revenue trends and collection rate", color: "bg-indigo-50 text-indigo-600" },
          { icon: Download, title: "Full Export", desc: "Export all data as CSV for backup or analysis", color: "bg-gray-50 text-gray-600" },
        ].map((r) => (
          <div key={r.title} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${r.color}`}>
              <r.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{r.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{r.desc}</p>
            <div className="flex gap-2">
              <button className="flex-1 text-xs font-semibold bg-gray-50 border border-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">View</button>
              <button className="flex-1 text-xs font-semibold bg-blue-50 border border-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1">
                <Download className="w-3 h-3" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
