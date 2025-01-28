import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import UserRating from "../../../../../../models/userRating";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();

  const { id } = params;
  const { rating } = await request.json();

  if (!id || !Array.isArray(rating)) {
    return NextResponse.json(
      { message: "User ID and a valid rating array are required." },
      { status: 400 }
    );
  }

  try {
    const updatedUserRating = await UserRating.findOneAndUpdate(
      { userId: id },
      { userId: id, rating },
      { new: true, upsert: true }
    );

    return NextResponse.json(updatedUserRating, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "An unknown error occurred." },
      { status: 500 }
    );
  }
}
