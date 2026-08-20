"use server";

import connectToDatabase from "@/lib/mongodb";
import { Room } from "@/models/Room";
import { Resident } from "@/models/Resident";
import { Payment } from "@/models/Payment";
import { revalidatePath } from "next/cache";

export async function seedAllData() {
  try {
    await connectToDatabase();
    
    // Check if we already seeded
    const roomCount = await Room.countDocuments();
    if (roomCount > 0) {
      return { success: false, message: "Data already seeded" };
    }

    // 1. Create Rooms
    const rooms = await Room.insertMany([
      {
        name: "Room 101", building: "Building A", floor: "Ground Floor", sharingType: "2 Sharing",
        beds: [{ id: "B1", status: "occupied" }, { id: "B2", status: "occupied" }]
      },
      {
        name: "Room 102", building: "Building A", floor: "Ground Floor", sharingType: "3 Sharing",
        beds: [{ id: "B1", status: "occupied" }, { id: "B2", status: "available" }, { id: "B3", status: "available" }]
      },
      {
        name: "Room 201", building: "Building B", floor: "First Floor", sharingType: "1 Sharing",
        beds: [{ id: "B1", status: "occupied" }]
      }
    ]);

    // 2. Create Residents
    const residents = await Resident.insertMany([
      {
        residentId: "R001", name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 9876543210",
        emergencyContact: { name: "Raj Sharma", phone: "9876543211", relation: "Father" },
        roomId: rooms[0]._id, bedId: "B1", monthlyFee: 8500, securityDeposit: 10000,
        status: "Active", dueAmount: 0, joiningDate: new Date("2026-08-01")
      },
      {
        residentId: "R002", name: "Amit Kumar", email: "amit@example.com", phone: "+91 8765432109",
        emergencyContact: { name: "Sunil Kumar", phone: "8765432110", relation: "Father" },
        roomId: rooms[0]._id, bedId: "B2", monthlyFee: 8500, securityDeposit: 10000,
        status: "Active", dueAmount: 4500, joiningDate: new Date("2026-08-10")
      },
      {
        residentId: "R003", name: "Suresh Verma", email: "suresh@example.com", phone: "+91 7654321098",
        emergencyContact: { name: "Ramesh Verma", phone: "7654321099", relation: "Brother" },
        roomId: rooms[1]._id, bedId: "B1", monthlyFee: 7500, securityDeposit: 8000,
        status: "Active", dueAmount: 7500, joiningDate: new Date("2026-08-15")
      },
      {
        residentId: "R004", name: "Vikram Singh", email: "vikram@example.com", phone: "+91 5432109876",
        emergencyContact: { name: "Pooja Singh", phone: "5432109877", relation: "Mother" },
        roomId: rooms[2]._id, bedId: "B1", monthlyFee: 12000, securityDeposit: 15000,
        status: "Notice Period", dueAmount: 0, joiningDate: new Date("2025-04-15")
      }
    ]);

    // 3. Create Payments
    await Payment.insertMany([
      {
        residentId: residents[0]._id, amountExpected: 8500, amountPaid: 8500, amountRemaining: 0,
        status: "Paid", paymentMethod: "UPI", paymentDate: new Date("2026-08-05"), dueDate: new Date("2026-08-05")
      },
      {
        residentId: residents[1]._id, amountExpected: 8500, amountPaid: 4000, amountRemaining: 4500,
        status: "Partially Paid", paymentMethod: "Cash", paymentDate: new Date("2026-08-10"), dueDate: new Date("2026-08-05")
      },
      {
        residentId: residents[2]._id, amountExpected: 7500, amountPaid: 0, amountRemaining: 7500,
        status: "Overdue", dueDate: new Date("2026-08-05")
      }
    ]);

    revalidatePath("/");
    revalidatePath("/rooms");
    revalidatePath("/residents");
    revalidatePath("/payments");
    
    return { success: true };
  } catch (error) {
    console.error("Error seeding data:", error);
    return { success: false, error: "Failed to seed data" };
  }
}

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
