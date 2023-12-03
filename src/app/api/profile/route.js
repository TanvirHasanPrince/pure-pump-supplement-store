import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/user";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const session = await getServerSession(authOptions);
  console.log(session);
  const email = session?.user?.email;
  console.log(email, data);

  if ("name" in data) {
    const user = await User.findOne({ email });
    user.name = data.name;
    await user.save();
  }

  return Response.json(true);
}
