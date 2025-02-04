import { NextResponse, NextRequest } from "next/server"
import { connectMongoDB } from '../../../../../lib/mongodb'
import Attraction from '../../../../../models/attraction'

export async function POST(req: NextRequest) {
    try {
        const { name, type, description, latitude, longitude, imgPath, phone, website, openingHour, attractionTag, location, rating } = await req.json();
        
        await connectMongoDB();
        await Attraction.create({
            name,
            type,
            description,
            latitude,
            longitude,
            imgPath,
            phone,
            website,
            openingHour,
            attractionTag,
            location,
            rating
        });

        return NextResponse.json({ message: "Create Data attraction"}, {status: 201})
    } catch(error) {
        return NextResponse.json({ message: `An error occured while insert data attraction ${error}`}, {status: 500})
    }
}