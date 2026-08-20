import mongoose, { Schema, Document } from "mongoose";

export interface IRule extends Document {
  number: number;
  title: string;
  content: string;
  isActive: boolean;
}

const RuleSchema = new Schema<IRule>(
  {
    number: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Rule = mongoose.models.Rule || mongoose.model<IRule>("Rule", RuleSchema);
