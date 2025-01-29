import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Attraction from "../../../../../models/attraction";
import Province from "../../../../../models/province";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const { provinceName, districtList, radius, centerLatitude, centerLongitude, tagLists, rating, page } = await req.json();
        await connectMongoDB();

        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        if (!page) {
            return NextResponse.json({ message: `page in request body not found` }, { status: 400 });
        }

        const province = await Province.findOne({ name: provinceName });

        if (!province) {
            return NextResponse.json({ message: `province not found in database` }, { status: 404 });
        }

        const tagMatchConditions = tagLists.map((tag: string) => ({
            [`attractionTag.attractionTagFields.${tag}`]: { $gte: 0.7 }
        }));

        let aggregationPipeline: any[] = [
            {
                $match: {
                    "location.province": province.name,
                    "location.district": { $in: districtList },
                    $or: tagMatchConditions,
                    $expr: {
                        $in: [{ $floor: "$rating.score" }, rating]
                    }
                }
            },
            { $sort: { createdAt: -1 } }
        ];

        let allAttractions = await Attraction.aggregate(aggregationPipeline);

        if (radius && centerLongitude && centerLatitude) {
            const attractionPromises = allAttractions.map(async (attraction) => {
                const { longitude, latitude } = attraction;
            
                try {
                    const response = await axios.post(
                        `${process.env.OSRM_API_HOST}/route/v1/driving/${longitude},${latitude};${centerLongitude},${centerLatitude}`
                    );
            
                    const distance = response.data.routes[0].distance;
                    if (distance <= radius) {
                        return attraction;
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
                return null; 
            });
            
            const resolvedAttractions = await Promise.all(attractionPromises);
            
            const attractionsWithinRadius = resolvedAttractions.filter((attraction) => attraction !== null);
            
            const totalCount = attractionsWithinRadius.length;
            const totalPages = Math.ceil(totalCount / pageSize);
            
            const paginatedData = attractionsWithinRadius.slice(skip, skip + pageSize);
            
            return NextResponse.json(
                { attractions: paginatedData, totalCount, totalPages, currentPage: page, pageSize },
                { status: 200 }
            );
        }


        aggregationPipeline.push(
            {
                $facet: {
                    totalCount: [{ $count: "count" }],
                    data: [{ $skip: skip }, { $limit: pageSize }]
                }
            }
        );

        const aggregationResult = await Attraction.aggregate(aggregationPipeline);
        const totalCount = aggregationResult[0].totalCount[0]?.count || 0;
        const totalPages = Math.ceil(totalCount / pageSize);
        const attractionsData = aggregationResult[0].data;

        return NextResponse.json(
            { attractions: attractionsData, totalCount, totalPages, currentPage: page, pageSize },
            { status: 200 }
        );

    } catch (error) {
        console.error("An error occurred:", error);
        return NextResponse.json(
            { message: `An error occurred while getting district data: ${error}` },
            { status: 500 }
        );
    }
}
