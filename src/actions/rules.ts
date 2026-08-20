"use server";

import connectToDatabase from "@/lib/mongodb";
import { RuleModel } from "@/models/index";
import { revalidatePath } from "next/cache";

export async function getRules() {
  try {
    await connectToDatabase();
    const rules = await RuleModel.find({}).sort({ order: 1 }).lean();
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
    
    const count = await RuleModel.countDocuments();
    await RuleModel.create({ 
      id: `rule-${Date.now()}`,
      order: count + 1, 
      title, 
      description: content,
      category: 'General',
      isMandatory: true
    });
    revalidatePath("/rules");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to add rule" };
  }
}

export async function updateRule(id: string, title: string, content: string) {
  try {
    await connectToDatabase();
    await RuleModel.findOneAndUpdate({ id }, { title, description: content });
    revalidatePath("/rules");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update rule" };
  }
}

export async function deleteRule(id: string) {
  try {
    await connectToDatabase();
    await RuleModel.findOneAndDelete({ id });
    revalidatePath("/rules");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete rule" };
  }
}

export async function seedDefaultRules() {
  try {
    await connectToDatabase();
    const count = await RuleModel.countDocuments();
    if (count > 0) return { success: false };
    
    const defaultRules = [
      { id: "rule-1", order: 1, category: "Payment", isMandatory: true, title: "Rent Payment", description: "Rent must be paid on or before the 5th of every month. Late payments may attract a penalty." },
      { id: "rule-2", order: 2, category: "Visitors", isMandatory: true, title: "Visitors Policy", description: "No visitors are allowed in the rooms after 9:00 PM without prior permission from the management." },
      { id: "rule-3", order: 3, category: "Cleanliness", isMandatory: true, title: "Electricity Usage", description: "Please turn off lights, fans, and ACs when leaving the room. Excessive usage will be billed separately." },
      { id: "rule-4", order: 4, category: "General", isMandatory: true, title: "Notice Period", description: "A 30-day notice period is required before vacating to claim the security deposit." },
      { id: "rule-5", order: 5, category: "General", isMandatory: true, title: "Property Maintenance", description: "Any damages to the property or furniture will be deducted from the security deposit." },
    ];
    await RuleModel.insertMany(defaultRules);
    revalidatePath("/rules");
    return { success: true };
  } catch {
    return { success: false };
  }
}
