import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  residentId: mongoose.Types.ObjectId;
  amountExpected: number;
  amountPaid: number;
  amountRemaining: number;
  status: "Paid" | "Partially Paid" | "Due" | "Overdue";
  paymentMethod?: "Cash" | "UPI" | "Bank Transfer" | "Cheque";
  paymentDate?: Date;
  dueDate: Date;
  notes?: string;
}

const PaymentSchema = new Schema<IPayment>(
  {
    residentId: { type: Schema.Types.ObjectId, ref: "Resident", required: true },
    amountExpected: { type: Number, required: true },
    amountPaid: { type: Number, default: 0 },
    amountRemaining: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ["Paid", "Partially Paid", "Due", "Overdue"], 
      default: "Due" 
    },
    paymentMethod: { 
      type: String, 
      enum: ["Cash", "UPI", "Bank Transfer", "Cheque"] 
    },
    paymentDate: { type: Date },
    dueDate: { type: Date, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Payment = mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);
