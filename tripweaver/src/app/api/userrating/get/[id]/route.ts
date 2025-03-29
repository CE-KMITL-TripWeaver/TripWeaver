export const revalidate = 0;
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import UserRating from "../../../../../../models/userRating";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();

  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "User ID is required." }, { status: 400 });
  }

  try {
    const userRating = await UserRating.findOne({ userId: id });

    if (!userRating) {
      return NextResponse.json({ message: "UserRating not found." }, { status: 404 });
    }

    return NextResponse.json(userRating, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "An unknown error occurred." },
      { status: 500 }
    );
  }
}
