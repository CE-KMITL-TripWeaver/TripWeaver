import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import User from "../../../../../../models/user";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const apiKey = req.headers.get("Authorization");
    const isApiKeyValid = apiKey === process.env.API_KEY;

    if (isApiKeyValid) {
        try {
            await connectMongoDB();
            const result = await User.findByIdAndDelete(params.id);
            if (!result) {
                return NextResponse.json({ message: "User not found" }, { status: 404 });
            }

            return NextResponse.json({ message: "User deleted successfully" });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }
    }

    const session = await getServerSession({ req, ...authOptions });
    const user = session?.user as { id: string; name: string; email: string; image: string; role: string };

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "admin") {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    try {
        await connectMongoDB();
        const result = await User.findByIdAndDelete(params.id);
        if (!result) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
