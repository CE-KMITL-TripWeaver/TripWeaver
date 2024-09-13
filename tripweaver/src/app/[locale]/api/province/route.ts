import { NextResponse, NextRequest } from "next/server"
import { connectMongoDB } from '../../../../../lib/mongodb'
import Province from '../../../../../models/province'

export async function POST(req: NextRequest) {
    try {
        const { name, idRef } = await req.json();
        
        await connectMongoDB();
        await Province.create({
            name,
            idRef
        });

        return NextResponse.json({ message: "Create Data Province"}, {status: 201})
    } catch(error) {
        return NextResponse.json({ message: `An error occured while insert data province ${error}`}, {status: 500})
    }
}