"use server";

import connectToDatabase from "@/lib/mongodb";
import { RoomModel, BuildingModel, FloorModel } from "@/models/index";
import { revalidatePath } from "next/cache";

export async function getRoomsData() {
  try {
    await connectToDatabase();
    const rooms = await RoomModel.find({}).lean();
    const buildings = await BuildingModel.find({}).lean();
    const floors = await FloorModel.find({}).lean();
    
    return {
      rooms: JSON.parse(JSON.stringify(rooms)),
      buildings: JSON.parse(JSON.stringify(buildings)),
      floors: JSON.parse(JSON.stringify(floors))
    };
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return { rooms: [], buildings: [], floors: [] };
  }
}
