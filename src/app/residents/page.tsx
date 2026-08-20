import { Plus, Search, MoreVertical, Filter, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getResidents } from "@/actions/residents";

export default async function ResidentsPage() {
  const residents = await getResidents();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Residents</h1>
          <p className="text-gray-500 mt-1">Live data from MongoDB</p>
        </div>
        <Link href="/residents/new" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl px-5 py-3 text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          Add Resident
        </Link>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
          <button className="px-5 py-2.5 rounded-xl text-sm font-medium bg-gray-900 text-white shadow-sm">All</button>
        </div>
      </div>

      {residents.length === 0 ? (
        <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl">
          <p className="text-gray-500">No residents found in database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {residents.map((resident: any) => (
            <div key={resident._id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative group">
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
                      {resident.residentId}
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
                  <p className="font-semibold text-gray-900">{resident.roomName} <span className="text-gray-400 font-normal">({resident.bedId || "-"})</span></p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium mb-1">Joined</p>
                  <p className="font-semibold text-gray-900">{resident.joiningDate}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <a href={`tel:${resident.phone}`} className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors">
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
                <div className="text-right">
                  {resident.dueAmount > 0 ? (
                    <p className="text-sm font-bold text-red-600 flex flex-col">
                      <span className="text-[10px] font-medium text-red-400 uppercase tracking-wider">Due Amount</span>
                      ₹{resident.dueAmount.toLocaleString()}
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
      )}
    </div>
  );
}
