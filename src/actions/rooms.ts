"use server";

import connectToDatabase from "@/lib/mongodb";
import { Room } from "@/models/Room";
import { revalidatePath } from "next/cache";

export async function getRooms() {
  try {
    await connectToDatabase();
    const rooms = await Room.find({}).sort({ building: 1, floor: 1, name: 1 }).lean();
    return JSON.parse(JSON.stringify(rooms)); // Serialize for client components
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
}

export async function seedInitialRooms() {
  try {
    await connectToDatabase();
    const count = await Room.countDocuments();
    
    if (count === 0) {
      await Room.insertMany([
        {
          name: "Room 101",
          building: "Building A",
          floor: "Ground Floor",
          sharingType: "3 Sharing",
          beds: [
            { id: "B1", status: "available" },
            { id: "B2", status: "available" },
            { id: "B3", status: "available" },
          ],
        },
        {
          name: "Room 102",
          building: "Building A",
          floor: "Ground Floor",
          sharingType: "4 Sharing",
          beds: [
            { id: "B1", status: "available" },
            { id: "B2", status: "available" },
            { id: "B3", status: "maintenance" },
            { id: "B4", status: "available" },
          ],
        },
      ]);
      revalidatePath("/rooms");
      return { success: true };
    }
    return { success: false, message: "Rooms already exist" };
  } catch (error) {
    console.error("Error seeding rooms:", error);
    return { success: false, error: "Failed to seed rooms" };
  }
}
