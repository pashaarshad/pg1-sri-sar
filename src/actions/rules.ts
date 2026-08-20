"use server";

import connectToDatabase from "@/lib/mongodb";
import { Rule } from "@/models/Rule";
import { revalidatePath } from "next/cache";

export async function getRules() {
  try {
    await connectToDatabase();
    const rules = await Rule.find({ isActive: true }).sort({ number: 1 }).lean();
    return JSON.parse(JSON.stringify(rules));
  } catch (error) {
    return [];
  }
}

export async function addRule(formData: FormData) {
  try {
    await connectToDatabase();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    if (!title || !content) return { success: false, error: "Title and content are required" };
    
    const count = await Rule.countDocuments();
    await Rule.create({ number: count + 1, title, content });
    revalidatePath("/rules");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to add rule" };
  }
}

export async function updateRule(id: string, title: string, content: string) {
  try {
    await connectToDatabase();
    await Rule.findByIdAndUpdate(id, { title, content });
    revalidatePath("/rules");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update rule" };
  }
}

export async function deleteRule(id: string) {
  try {
    await connectToDatabase();
    await Rule.findByIdAndUpdate(id, { isActive: false });
    revalidatePath("/rules");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete rule" };
  }
}

export async function seedDefaultRules() {
  try {
    await connectToDatabase();
    const count = await Rule.countDocuments();
    if (count > 0) return { success: false };
    
    const defaultRules = [
      { number: 1, title: "Rent Payment", content: "Rent must be paid on or before the 5th of every month. Late payments may attract a penalty." },
      { number: 2, title: "Visitors Policy", content: "No visitors are allowed in the rooms after 9:00 PM without prior permission from the management." },
      { number: 3, title: "Electricity Usage", content: "Please turn off lights, fans, and ACs when leaving the room. Excessive usage will be billed separately." },
      { number: 4, title: "Notice Period", content: "A 30-day notice period is required before vacating to claim the security deposit." },
      { number: 5, title: "Property Maintenance", content: "Any damages to the property or furniture will be deducted from the security deposit." },
    ];
    await Rule.insertMany(defaultRules);
    revalidatePath("/rules");
    return { success: true };
  } catch {
    return { success: false };
  }
}
