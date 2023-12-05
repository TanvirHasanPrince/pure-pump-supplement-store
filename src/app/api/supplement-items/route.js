import mongoose from "mongoose";
import { SupplementItem } from "../../models/supplement-item";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  console.log(data);
  const supplementItemDocument = await SupplementItem.create(data);

  return Response.json(supplementItemDocument);
}
