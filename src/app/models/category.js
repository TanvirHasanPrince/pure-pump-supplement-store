import { model, Schema, models } from "mongoose";

const CategroySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);


export const Category = models?.Category || model("Category", CategroySchema);
