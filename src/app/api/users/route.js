import mongoose from "mongoose";
import { User } from "../../models/user";
import { isAdmin } from "../auth/[...nextauth]/authOptions";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const users = await User.find();
    console.log(users);
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}
