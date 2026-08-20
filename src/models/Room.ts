import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
  name: string; // e.g., "Room 203"
  building: string;
  floor: string;
  sharingType: string;
  beds: {
    id: string; // e.g., "B1", "B2"
    status: "available" | "occupied" | "maintenance";
    tenantId?: mongoose.Types.ObjectId; // References Resident if occupied
  }[];
}

const RoomSchema = new Schema<IRoom>(
  {
    name: { type: String, required: true },
    building: { type: String, required: true },
    floor: { type: String, required: true },
    sharingType: { type: String, required: true },
    beds: [
      {
        id: { type: String, required: true },
        status: { 
          type: String, 
          enum: ["available", "occupied", "maintenance"], 
          default: "available" 
        },
        tenantId: { type: Schema.Types.ObjectId, ref: "Resident" },
      }
    ]
  },
  { timestamps: true }
);

export const Room = mongoose.models.Room || mongoose.model<IRoom>("Room", RoomSchema);
