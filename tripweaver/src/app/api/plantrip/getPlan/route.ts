import { NextResponse,NextRequest } from "next/server"
import { connectMongoDB } from '../../../../../lib/mongodb'
import PlanTrips from "../../../../../models/plans";

export async function POST(req: NextRequest) {
    try {

        await connectMongoDB();

        const plans = await PlanTrips.find({});

        
        return NextResponse.json({ plans }, {status: 201})
    } catch(error) {
        return NextResponse.json({ message: `An error occured while get data district ${error}`}, {status: 500})
    }
}