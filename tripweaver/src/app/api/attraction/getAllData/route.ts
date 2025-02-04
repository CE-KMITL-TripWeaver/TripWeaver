import { NextResponse,NextRequest } from "next/server"
import { connectMongoDB } from '../../../../../lib/mongodb'
import Attraction from "../../../../../models/attraction";

export async function POST(req: NextRequest) {
    try {

        await connectMongoDB();

        const attractions = await Attraction.aggregate([
            {
                $project: {
                    _id: 1,
                    name: 1,
                    latitude: 1,
                    longitude: 1,
                    attractionTag: 1
                }
            }
        ])

        
        return NextResponse.json({ attractions }, {status: 201})
    } catch(error) {
        return NextResponse.json({ message: `An error occured while get data district ${error}`}, {status: 500})
    }
}