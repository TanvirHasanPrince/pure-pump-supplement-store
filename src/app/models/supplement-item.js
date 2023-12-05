import { Schema, models } from "mongoose";

const SupplementItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    basePrice: { type: Number },
  },
  { timestamps: true }
);

export const SupplementItem =
  models?.SupplementItem || model("SupplementItem", SupplementItemSchema);
