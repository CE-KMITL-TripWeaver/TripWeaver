import React from "react";
import Rating from "../interface/rating";

interface RatingComponentElementProps {
    ratingObject: Rating;
    checked: boolean;
}

export default function RatingComponentElement({ ratingObject, checked }: RatingComponentElementProps) {

    return (
        <div className="flex items-center kanit py-2 mr-2 px-2 rounded-lg hover:bg-[#E9ECEE] cursor-pointer">
            <input
                id={`checkbox-item-${ratingObject.star}`}
                type="checkbox"
                checked={checked}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label
                htmlFor={`checkbox-item-${ratingObject.star}`}
                className="kanit w-full ms-2 text-sm font-medium rounded text-black cursor-pointer"
            >
                {ratingObject.star} 
            </label>
        </div>
    );
}
