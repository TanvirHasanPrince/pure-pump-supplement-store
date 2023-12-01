import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function PUT(req) {
 mongoose.connect(process.env.MONGO_URL);
 const session = await getServerSession();
 const data = await req.json();
 if ('name' in data) {

 }
}