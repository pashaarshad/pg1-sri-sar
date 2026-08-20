import mongoose, { Schema, Document } from "mongoose";

export interface IResident extends Document {
  residentId: string; // e.g. R001
  name: string;
  email: string;
  phone: string;
  dob?: Date;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  roomId?: string; // Reference to Room Model
  bedId?: string; // Reference to Bed string/identifier
  monthlyFee: number;
  securityDeposit: number;
  status: "Application Pending" | "Active" | "Notice Period" | "Vacated";
  dueAmount: number;
  joiningDate?: Date;
  vacateDate?: Date;
}

const ResidentSchema = new Schema<IResident>(
  {
    residentId: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date },
    emergencyContact: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      relation: { type: String, required: true },
    },
    roomId: { type: String }, // Optional until assigned
    bedId: { type: String },
    monthlyFee: { type: Number, default: 0 },
    securityDeposit: { type: Number, default: 0 },
    status: { 
      type: String, 
      enum: ["Application Pending", "Active", "Notice Period", "Vacated"],
      default: "Application Pending" 
    },
    dueAmount: { type: Number, default: 0 },
    joiningDate: { type: Date },
    vacateDate: { type: Date },
  },
  { timestamps: true }
);

export const Resident = mongoose.models.Resident || mongoose.model<IResident>("Resident", ResidentSchema);
