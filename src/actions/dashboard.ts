"use server";

import connectToDatabase from "@/lib/mongodb";
import { RoomModel, ResidentModel, PaymentModel, ApplicationModel } from "@/models/index";

export async function getDashboardStats() {
  try {
    await connectToDatabase();
    
    const rooms = await RoomModel.find({}).lean();
    const residents = await ResidentModel.find({ status: "ACTIVE" }).lean();
    const applications = await ApplicationModel.find({ status: "PENDING" }).lean();
    
    // For payments, the Vite logic was using "August 2026" as the current month. Let's make it dynamic.
    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    
    const payments = await PaymentModel.find({ billingMonth: currentMonth, paymentType: "Rent" }).lean();

    // Calculate Beds
    let totalBeds = 0;
    let occupiedBeds = 0;
    let maintenanceBeds = 0;
    
    rooms.forEach((room: any) => {
      totalBeds += room.beds.length;
      occupiedBeds += room.beds.filter((b: any) => b.status === "Occupied").length;
      maintenanceBeds += room.beds.filter((b: any) => b.status === "Maintenance").length;
    });
    const vacantBeds = totalBeds - occupiedBeds - maintenanceBeds;

    // Calculate Applications
    const pendingApps = applications.length;

    // Calculate Payments
    const expected = residents.reduce((sum: number, r: any) => sum + (r.monthlyRent || 0), 0);
    const collected = payments.reduce((sum: number, p: any) => sum + (p.amountPaid || 0), 0);
    const due = Math.max(0, expected - collected);

    // List of residents with dues for current month
    const residentsWithDues = residents.map((res: any) => {
      const resPayments = payments.filter((p: any) => p.residentId === res.id);
      const paid = resPayments.reduce((sum: number, p: any) => sum + p.amountPaid, 0);
      const amountDue = Math.max(0, (res.monthlyRent || 0) - paid);
      return {
        ...res,
        paidForMonth: paid,
        dueForMonth: amountDue
      };
    }).filter((r: any) => r.dueForMonth > 0);

    const recentPayments = residentsWithDues.map((res: any) => ({
      id: res.id,
      tenantName: res.fullName,
      status: res.paidForMonth > 0 ? "Partially Paid" : "Due",
      amount: res.dueForMonth,
      roomName: `${res.roomNumber}-${res.bedNumber}`
    }));

    return {
      totalBeds,
      occupiedBeds,
      vacantBeds,
      maintenanceBeds,
      pendingApps,
      payment: {
        expected,
        collected,
        due,
        currentMonth
      },
      recentPayments: JSON.parse(JSON.stringify(recentPayments))
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return null;
  }
}
