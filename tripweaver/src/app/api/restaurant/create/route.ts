import { NextResponse, NextRequest } from "next/server"
import { connectMongoDB } from '../../../../lib/mongodb'
import Restaurant from '../../../../models/restaurant'

export async function POST(req: NextRequest) {
    try {
        const { name, sub_name, latitude, longitude, wongnai_url, restaurantTag, facility, openingHour, imgPath, phone, website, priceRange, location, rating } = await req.json();
        
        await connectMongoDB();
        await Restaurant.create({
            name,
            sub_name,
            latitude,
            longitude,
            imgPath,
            phone,
            website,
            openingHour,
            priceRange,
            location,
            rating,
            facility,
            restaurantTag,
            wongnai_url
        });

        return NextResponse.json({ message: "Create Data restaurant"}, {status: 201})
    } catch(error) {
        return NextResponse.json({ message: `An error occured while insert data restaurant ${error}`}, {status: 500})
    }
}