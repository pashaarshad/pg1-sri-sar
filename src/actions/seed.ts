"use server";

import connectToDatabase from "@/lib/mongodb";
import { Room } from "@/models/Room";
import { Resident } from "@/models/Resident";
import { Payment } from "@/models/Payment";
import { Rule } from "@/models/Rule";
import { revalidatePath } from "next/cache";

export async function clearAllData() {
  try {
    await connectToDatabase();
    await Room.deleteMany({});
    await Resident.deleteMany({});
    await Payment.deleteMany({});
    revalidatePath("/");
    revalidatePath("/rooms");
    revalidatePath("/residents");
    revalidatePath("/payments");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
