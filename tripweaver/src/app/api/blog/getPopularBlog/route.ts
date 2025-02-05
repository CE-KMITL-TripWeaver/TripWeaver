import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Blogs from "../../../../../models/blogs";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();

        const aggregationPipeline = [
            {
                $sort: {
                    blogViews: -1 as const, 
                },
            },
            {
                $limit: 5, 
            },
        ];

        const popularBlogs = await Blogs.aggregate(aggregationPipeline);

        if (!popularBlogs || popularBlogs.length === 0) {
            return NextResponse.json({ message: `No popular blogs found` }, { status: 404 });
        }

        return NextResponse.json({ blogs: popularBlogs }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            { message: `An error occurred while fetching popular blogs: ${errorMessage}` },
            { status: 500 }
        );
    }
}