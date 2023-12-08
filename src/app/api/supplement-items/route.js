import mongoose from "mongoose";
import { SupplementItem } from "../../models/supplement-item";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const supplementItemDocument = await SupplementItem.create(data);

  return Response.json(supplementItemDocument);
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, ...data } = await req.json();

  await SupplementItem.findByIdAndUpdate(_id, data);
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(await SupplementItem.find());
}
