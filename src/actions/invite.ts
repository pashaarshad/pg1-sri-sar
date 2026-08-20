"use server";

import connectToDatabase from "@/lib/mongodb";
import { InvitationModel, SettingModel } from "@/models/index";

export async function generateInviteLink() {
  try {
    await connectToDatabase();
    
    const token = `inv-${Math.random().toString(36).substring(2, 10)}`;
    const settings = await SettingModel.findOne().lean();
    const pgName = settings?.name || 'ABC DEF PG';

    await InvitationModel.create({
      token,
      pgName,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      used: false,
    });

    return { success: true, token };
  } catch (error: any) {
    console.error("Error generating invite link:", error);
    return { success: false, error: error.message };
  }
}
