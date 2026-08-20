"use server";

import connectToDatabase from "@/lib/mongodb";
import { PaymentModel } from "@/models/index";

export async function getPayments() {
  try {
    await connectToDatabase();
    const payments = await PaymentModel.find({}).sort({ paidAt: -1 }).lean();

    const enrichedPayments = payments.map((pay: any) => {
      let dateString = "Unknown";
      if (pay.status === "Paid" || pay.status === "Partially Paid") {
        dateString = pay.paidAt ? new Date(pay.paidAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "-";
      } else {
        dateString = "-";
      }

      return {
        ...pay,
        id: pay.id,
        tenantName: pay.residentName || "Unknown",
        roomInfo: `${pay.roomNumber} (${pay.bedNumber})`,
        dateString,
        amountExpected: pay.totalDueForMonth,
        amountPaid: pay.amountPaid,
        amountRemaining: pay.remainingBalance
      };
    });

    return JSON.parse(JSON.stringify(enrichedPayments));
  } catch (error) {
    console.error("Error fetching payments:", error);
    return [];
  }
}
