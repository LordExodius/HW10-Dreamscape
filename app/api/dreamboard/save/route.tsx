import connectMongoDB from "@utils/mongodb";
import User from "@models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id, dreamboard } = await request.json();

  await connectMongoDB();
  await User.create({ dreamboard });
  return NextResponse.json(
    { message: "Successfully saved dreamboard" },
    { status: 200 }
  );
}

export async function GET(request: Request) {
  await connectMongoDB();
  const user_dreamboards = await User.find();
  return NextResponse.json({ user_dreamboards }, { status: 200 });
}
