import { NextResponse, NextRequest } from "next/server"
import { connectMongoDB } from '../../../../../lib/mongodb'
import PlanTrips from "../../../../../models/plans";

export async function POST(req: NextRequest) {
    try {
        const { travelers, startDate,  dayDuration, accommodations, plans} = await req.json();
        
        await connectMongoDB();
        await PlanTrips.create({
            travelers,
            startDate,
            dayDuration,
            accommodations,
            plans
        });

        return NextResponse.json({ message: "Create Data Plantrip"}, {status: 201})
    } catch(error) {
        return NextResponse.json({ message: `An error occured while insert data plantrip ${error}`}, {status: 500})
    }
}