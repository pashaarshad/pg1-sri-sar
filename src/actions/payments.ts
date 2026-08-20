"use server";

import connectToDatabase from "@/lib/mongodb";
import { Payment } from "@/models/Payment";
import { Resident } from "@/models/Resident";
import { Room } from "@/models/Room";

export async function getPayments() {
  try {
    await connectToDatabase();
    const payments = await Payment.find({}).sort({ dueDate: -1 }).lean();
    const residents = await Resident.find({}).lean();
    const rooms = await Room.find({}).lean();

    const enrichedPayments = payments.map((pay: any) => {
      const res = residents.find((r: any) => r._id.toString() === pay.residentId?.toString());
      const room = res ? rooms.find((r: any) => r._id.toString() === res.roomId?.toString()) : null;
      
      let dateString = "Unknown";
      if (pay.status === "Paid" || pay.status === "Partially Paid") {
        dateString = pay.paymentDate ? new Date(pay.paymentDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "-";
      } else if (pay.status === "Due" || pay.status === "Overdue") {
        dateString = pay.dueDate ? `Due ${new Date(pay.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}` : "-";
      }

      return {
        ...pay,
        _id: pay._id.toString(),
        residentId: pay.residentId?.toString(),
        tenantName: res ? res.name : "Unknown",
        roomInfo: room ? `${room.name} (${res?.bedId})` : "-",
        dateString
      };
    });

    return JSON.parse(JSON.stringify(enrichedPayments));
  } catch (error) {
    console.error("Error fetching payments:", error);
    return [];
  }
}
