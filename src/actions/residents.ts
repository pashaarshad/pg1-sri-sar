"use server";

import connectToDatabase from "@/lib/mongodb";
import { Resident } from "@/models/Resident";
import { Room } from "@/models/Room";

export async function getResidents() {
  try {
    await connectToDatabase();
    const residents = await Resident.find({}).lean();
    
    // For the UI, we need to join with room data (since we store roomId)
    const rooms = await Room.find({}).lean();
    
    const enrichedResidents = residents.map((res: any) => {
      const room = rooms.find((r: any) => r._id.toString() === res.roomId?.toString());
      return {
        ...res,
        _id: res._id.toString(),
        roomId: res.roomId?.toString(),
        roomName: room ? room.name : "Unassigned",
        joiningDate: res.joiningDate ? new Date(res.joiningDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "-"
      };
    });

    return JSON.parse(JSON.stringify(enrichedResidents));
  } catch (error) {
    console.error("Error fetching residents:", error);
    return [];
  }
}
