import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from '../../../../../lib/mongodb';
import Attraction from "../../../../../models/attraction";
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    const { recommendIDList, currentPage } = await req.json();

    const pageSize = 10;
    const limitData = pageSize * currentPage;
    await connectMongoDB();

    const slicedRecommendIDList = recommendIDList.slice(0, limitData);

    const idList = slicedRecommendIDList.map((id: string) => {
        if (!ObjectId.isValid(id)) {
            throw new Error(`Invalid ObjectId: ${id}`);
        }
        return new ObjectId(id);
    });

    if (limitData <= recommendIDList.length) {
        const attractions = await Attraction.find({
            _id: { $in: idList }
        });

        const sortedAttractions = attractions.sort((a, b) => {
            return slicedRecommendIDList.indexOf(a._id.toString()) - slicedRecommendIDList.indexOf(b._id.toString());
        });

        return NextResponse.json({ attractions: sortedAttractions }, { status: 200 });
    }

    const attractionsRecommend = await Attraction.find({
        _id: { $in: idList }
    });

    const attractions = await Attraction.aggregate([
        {
          $match: {
            _id: { $nin: idList },
          },
        },
        {
          $limit: limitData - attractionsRecommend.length,
        }
    ]);
    
    const sortedAttractions = attractionsRecommend.sort((a, b) => {
        return slicedRecommendIDList.indexOf(a._id.toString()) - slicedRecommendIDList.indexOf(b._id.toString());
    });

    sortedAttractions.push(...attractions);

    return NextResponse.json({ attractions: attractionsRecommend }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `An error occurred while getting data: ${error}` }, { status: 500 });
  }
}
