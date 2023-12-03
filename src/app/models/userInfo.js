import { model, Schema, models } from "mongoose";

const UserInfoSchema = new Schema(
  {
    email: { type: String, required: true },
    phone: { type: String },
    houseAddress: { type: String },
    city: { type: String },
    postCode: { type: String },
    country: { type: String },
    admin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const UserInfo = models?.UserInfo || model("UserInfo", UserInfoSchema);
