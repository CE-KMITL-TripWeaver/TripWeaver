import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";  // Import bcrypt for password hashing
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import UserRating from "../../../../../models/userRating";

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("Authorization");
  const isApiKeyValid = apiKey === process.env.API_KEY;

  if (!isApiKeyValid) {
    return NextResponse.json({ message: "Invalid API key" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Username, email, and password are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const displayName = `${username}_${Math.floor(1000 + Math.random() * 9000)}`;

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      displayName: displayName
    });
    const savedUser = await newUser.save();

    const newUserRating = new UserRating({
      userId: savedUser._id,
      rating: [],
    });
    await newUserRating.save();

    return NextResponse.json(
      {
        message: "User and UserRating created successfully",
        user: savedUser,
        userRating: newUserRating,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
