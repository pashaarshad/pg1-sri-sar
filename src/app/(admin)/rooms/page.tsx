import { Plus, Search, SlidersHorizontal, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { getRoomsData } from "@/actions/rooms";
import { revalidatePath } from "next/cache";

export default async function RoomsPage() {
  const { rooms, buildings, floors } = await getRoomsData();

  // Helper map for building and floor names
  const buildingMap = new Map(buildings.map((b: any) => [b.id, b.name]));
  const floorMap = new Map(floors.map((f: any) => [f.id, f.name]));

  const buildingNames = ["All", ...Array.from(new Set(buildings.map((b: any) => b.name)))];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Rooms & Beds</h1>
          <p className="text-gray-500 mt-1">Manage allocations and maintenance</p>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <button className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl px-5 py-3 text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Add Room
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search rooms..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
          {buildingNames.length > 1 ? buildingNames.map((b: any, i: number) => (
            <button 
              key={b} 
              className={cn(
                "px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors",
                i === 0 
                  ? "bg-gray-900 text-white" 
                  : "bg-white border border-gray-200 text-gray-700 hover:border-blue-600"
              )}
            >
              {b}
            </button>
          )) : (
            <button className="px-5 py-3 rounded-xl text-sm font-medium bg-gray-900 text-white">All</button>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-6 px-1 text-sm font-medium text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span> Available
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span> Occupied
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span> Maintenance
        </div>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl">
          <p className="text-gray-500 mb-4">No rooms found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room: any) => {
            const availableCount = room.beds.filter((b: any) => b.status === "Available").length;
            const occupiedCount = room.beds.filter((b: any) => b.status === "Occupied").length;
            
            return (
              <div key={room.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Room {room.roomNumber}</h3>
                    <p className="text-sm text-gray-500">{buildingMap.get(room.buildingId)} • {floorMap.get(room.floorId)}</p>
                  </div>
                  <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {room.sharingType}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-x-6 gap-y-4 py-4 border-y border-gray-100 mb-4">
                  {room.beds.map((bed: any) => (
                    <div key={bed.id} className="flex items-center gap-2">
                      <span className={cn(
                        "w-3 h-3 rounded-full",
                        bed.status === "Available" && "bg-green-500",
                        bed.status === "Occupied" && "bg-red-500",
                        bed.status === "Maintenance" && "bg-yellow-500",
                      )}></span>
                      <span className="text-sm font-medium text-gray-700">{bed.bedNumber}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    <span className={cn("font-semibold", availableCount > 0 ? "text-green-600" : "")}>{availableCount} Available</span>
                  </span>
                  <span className="text-gray-500">
                    <span className="font-semibold text-gray-900">{occupiedCount}</span> Occupied
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}
