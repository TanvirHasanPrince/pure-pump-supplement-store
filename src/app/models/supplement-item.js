import mongoose, { model, Schema, models } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});

const SupplementItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: mongoose.Types.ObjectId },
    basePrice: { type: Number },
    sizes: { type: [ExtraPriceSchema] },
    flavour: { type: [ExtraPriceSchema] },
  },
  { timestamps: true }
);

export const SupplementItem =
  models?.SupplementItem || model("SupplementItem", SupplementItemSchema);
