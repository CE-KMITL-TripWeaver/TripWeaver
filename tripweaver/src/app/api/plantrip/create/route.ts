import { NextResponse, NextRequest } from "next/server"
import { connectMongoDB } from '../../../../../lib/mongodb'
import PlanTrips from "../../../../../models/plans";

export async function POST(req: NextRequest) {
    try {
        const { tripName, travelers, startDate, dayDuration, accommodations, plans} = await req.json();
        
        await connectMongoDB();
        const createdPlan = await PlanTrips.create({
            tripName,
            travelers,
            startDate,
            dayDuration,
            accommodations,
            plans
        });

        return NextResponse.json(
            {
                message: "Create Data Plantrip",
                planID: createdPlan._id.toString(),
            },
            { status: 201 }
        );
    } catch(error) {
        return NextResponse.json({ message: `An error occured while insert data plantrip ${error}`}, {status: 500})
    }
}