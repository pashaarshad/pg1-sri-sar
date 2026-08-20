"use server";

import connectToDatabase from "@/lib/mongodb";
import { Room } from "@/models/Room";
import { Resident } from "@/models/Resident";
import { Payment } from "@/models/Payment";

export async function getDashboardStats() {
  try {
    await connectToDatabase();
    
    const rooms = await Room.find({}).lean();
    const residents = await Resident.find({}).lean();
    const payments = await Payment.find({}).lean();

    // Calculate Beds
    let totalBeds = 0;
    let occupiedBeds = 0;
    rooms.forEach((room: any) => {
      totalBeds += room.beds.length;
      occupiedBeds += room.beds.filter((b: any) => b.status === "occupied").length;
    });
    const vacantBeds = totalBeds - occupiedBeds;

    // Calculate Applications
    const pendingApps = residents.filter((r: any) => r.status === "Application Pending").length;

    // Calculate Payments
    let expected = 0;
    let collected = 0;
    let due = 0;
    
    payments.forEach((p: any) => {
      expected += (p.amountExpected || 0);
      collected += (p.amountPaid || 0);
      due += (p.amountRemaining || 0);
    });

    // Recent Payments List
    const recentPayments = payments
      .filter((p: any) => p.status === "Due" || p.status === "Overdue")
      .map((p: any) => {
        const res = residents.find((r: any) => r._id.toString() === p.residentId.toString());
        const room = res ? rooms.find((r: any) => r._id.toString() === res.roomId?.toString()) : null;
        return {
          id: p._id.toString(),
          tenantName: res ? res.name : "Unknown",
          status: p.status,
          amount: p.amountRemaining,
          roomName: room ? room.name : "-"
        }
      });

    return {
      totalBeds,
      occupiedBeds,
      vacantBeds,
      pendingApps,
      payment: {
        expected,
        collected,
        due
      },
      recentPayments: JSON.parse(JSON.stringify(recentPayments))
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return null;
  }
}
