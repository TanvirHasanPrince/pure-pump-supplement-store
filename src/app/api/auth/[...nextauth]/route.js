import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { getServerSession } from "next-auth";
import * as mongoose from "mongoose";
import { User } from "../../../models/user";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../libs/mongoConnect";
import { UserInfo } from "@/app/models/userInfo";
import { authOptions } from "./authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
