"use server";

import connectToDatabase from "@/lib/mongodb";
import { Resident } from "@/models/Resident";
import { Room } from "@/models/Room";
import { revalidatePath } from "next/cache";

function generateResidentId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `R${num}`;
}

export async function submitApplication(formData: FormData) {
  try {
    await connectToDatabase();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const emergencyName = formData.get("emergencyName") as string;
    const emergencyPhone = formData.get("emergencyPhone") as string;
    const emergencyRelation = formData.get("emergencyRelation") as string;

    if (!name || !email || !phone || !emergencyName || !emergencyPhone || !emergencyRelation) {
      return { success: false, error: "All fields are required including emergency contact." };
    }

    const residentId = generateResidentId();

    const resident = await Resident.create({
      residentId,
      name,
      email,
      phone,
      emergencyContact: {
        name: emergencyName,
        phone: emergencyPhone,
        relation: emergencyRelation,
      },
      status: "Application Pending",
      dueAmount: 0,
      monthlyFee: 0,
      securityDeposit: 0,
    });

    revalidatePath("/residents");
    revalidatePath("/");

    return { success: true, residentId, id: resident._id.toString() };
  } catch (error: any) {
    console.error("Application submission error:", error);
    return { success: false, error: error.message || "Failed to submit application." };
  }
}

export async function getResidents() {
  try {
    await connectToDatabase();
    const residents = await Resident.find({}).lean();
    const rooms = await Room.find({}).lean();

    const enriched = residents.map((res: any) => {
      const room = rooms.find((r: any) => r._id.toString() === res.roomId?.toString());
      return {
        ...res,
        _id: res._id.toString(),
        roomId: res.roomId?.toString() || null,
        roomName: room ? room.name : "Unassigned",
        joiningDate: res.joiningDate
          ? new Date(res.joiningDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
          : "-",
        createdAt: res.createdAt?.toString(),
        updatedAt: res.updatedAt?.toString(),
      };
    });

    return JSON.parse(JSON.stringify(enriched));
  } catch (error) {
    return [];
  }
}

export async function clearAllResidents() {
  try {
    await connectToDatabase();
    await Resident.deleteMany({});
    revalidatePath("/residents");
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false };
  }
}
