"use server";

import connectToDatabase from "@/lib/mongodb";
import { ResidentModel, RoomModel, ApplicationModel, InvitationModel, PaymentModel, NotificationModel, AuditLogModel } from "@/models/index";
import { revalidatePath } from "next/cache";

export async function submitApplication(formData: FormData) {
  try {
    await connectToDatabase();

    const fullName = formData.get("name") as string;
    const email = formData.get("email") as string;
    const mobile = formData.get("phone") as string;
    const emergencyName = formData.get("emergencyName") as string;
    const emergencyPhone = formData.get("emergencyPhone") as string;
    const emergencyRelation = formData.get("emergencyRelation") as string;
    const invitationToken = formData.get("invitationToken") as string;

    if (!fullName || !email || !mobile || !emergencyName || !emergencyPhone) {
      return { success: false, error: "All fields are required including emergency contact." };
    }

    const count = (await ApplicationModel.countDocuments()) + (await ResidentModel.countDocuments());
    const appId = `APP-${8220 + count}`;

    const newApp = await ApplicationModel.create({
      id: appId,
      invitationToken,
      status: 'PENDING',
      fullName,
      mobile,
      email,
      gender: 'Male', // Default or from form
      permanentAddress: 'Pending Address', // From form
      emergencyContact: {
        relationship: emergencyRelation || 'Other',
        name: emergencyName,
        phone: emergencyPhone
      },
      submittedAt: new Date().toISOString(),
    });

    if (invitationToken) {
      await InvitationModel.findOneAndUpdate(
        { token: invitationToken },
        { used: true, usedByApplicationId: appId }
      );
    }

    await NotificationModel.create({
      id: `notif-${Date.now()}`,
      recipientType: 'ADMIN',
      title: 'New Resident Application Received',
      message: `${fullName} has submitted an onboarding application (${appId}) for review.`,
      channel: 'IN_APP',
      type: 'APPLICATION',
      linkUrl: 'applications',
      timestamp: new Date().toISOString(),
      read: false,
    });

    await AuditLogModel.create({
      id: `aud-${Date.now()}`,
      action: 'APPLICATION_SUBMITTED',
      actor: fullName,
      target: appId,
      details: `Submitted onboarding application from public portal`,
      timestamp: new Date().toISOString(),
    });

    revalidatePath("/applications");
    revalidatePath("/");

    return { success: true, appId };
  } catch (error: any) {
    console.error("Application submission error:", error);
    return { success: false, error: error.message || "Failed to submit application." };
  }
}

export async function getResidents() {
  try {
    await connectToDatabase();
    const residents = await ResidentModel.find({}).lean();
    return JSON.parse(JSON.stringify(residents));
  } catch (error) {
    return [];
  }
}

export async function getApplications() {
  try {
    await connectToDatabase();
    const applications = await ApplicationModel.find({}).lean();
    return JSON.parse(JSON.stringify(applications));
  } catch (error) {
    return [];
  }
}

export async function approveApplication(appId: string, allocation: any) {
  try {
    await connectToDatabase();
    
    const appDoc = await ApplicationModel.findOne({ id: appId });
    if (!appDoc) return { success: false, error: 'Application not found' };

    const room = await RoomModel.findOne({ id: allocation.roomId });
    if (!room) return { success: false, error: 'Room not found' };

    const bed = room.beds.find((b: any) => b.id === allocation.bedId);
    if (!bed) return { success: false, error: 'Bed not found' };

    const residentCount = await ResidentModel.countDocuments();
    const residentId = `RES-${1040 + residentCount + 1}`;

    const resident = await ResidentModel.create({
      id: residentId,
      applicationId: appDoc.id,
      fullName: appDoc.fullName,
      mobile: appDoc.mobile,
      email: appDoc.email,
      gender: appDoc.gender,
      permanentAddress: appDoc.permanentAddress,
      occupation: appDoc.occupation,
      emergencyContact: appDoc.emergencyContact,
      buildingId: allocation.buildingId || 'bld-default',
      floorId: allocation.floorId || 'flr-default',
      roomId: allocation.roomId,
      bedId: allocation.bedId,
      roomNumber: room.roomNumber,
      bedNumber: bed.bedNumber,
      sharingType: room.sharingType,
      moveInDate: allocation.moveInDate || new Date().toISOString(),
      monthlyRent: allocation.monthlyRent,
      securityDeposit: allocation.securityDeposit || 0,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      notes: allocation.notes || '',
    });

    // Update Bed Status
    bed.status = 'Occupied';
    bed.residentId = residentId;
    bed.residentName = appDoc.fullName;
    
    // Mongoose subdocument modification saving
    await RoomModel.updateOne(
      { id: allocation.roomId, "beds.id": allocation.bedId },
      { $set: { "beds.$.status": 'Occupied', "beds.$.residentId": residentId, "beds.$.residentName": appDoc.fullName } }
    );

    appDoc.status = 'APPROVED';
    await appDoc.save();

    if (allocation.securityDeposit > 0) {
      await PaymentModel.create({
        id: `PAY-${Date.now().toString().slice(-4)}`,
        residentId,
        residentName: appDoc.fullName,
        roomNumber: room.roomNumber,
        bedNumber: bed.bedNumber,
        billingMonth: 'Security Deposit',
        totalDueForMonth: allocation.securityDeposit,
        amountPaid: allocation.securityDeposit,
        remainingBalance: 0,
        paymentType: 'Security Deposit',
        paymentMethod: 'Bank Transfer',
        status: 'Paid',
        notes: 'Security deposit collected on admission.',
        paidAt: new Date().toISOString(),
        recordedBy: 'Admin',
      });
    }

    revalidatePath("/applications");
    revalidatePath("/residents");
    revalidatePath("/rooms");
    revalidatePath("/payments");
    revalidatePath("/");

    return { success: true, residentId };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function rejectApplication(appId: string, reason: string) {
  try {
    await connectToDatabase();
    await ApplicationModel.findOneAndUpdate(
      { id: appId },
      { status: 'REJECTED', rejectionReason: reason }
    );
    revalidatePath("/applications");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
