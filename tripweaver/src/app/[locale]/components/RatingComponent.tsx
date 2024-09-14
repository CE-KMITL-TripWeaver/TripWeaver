'use client'
import React , { useState } from "react";
import {useTranslations} from 'next-intl';
import Rating from "../interface/rating";
import RatingComponentElement from "./RatingComponentElement";

interface RatingComponentProps {
    ratingProps: Rating[]
}

export default function RatingComponent({ratingProps}: RatingComponentProps) {
    const t = useTranslations();
    const [ratings, setRatings] = useState<Rating[]>(ratingProps);

    const handleCheckboxChange = (star: number) => {
        setRatings((prevRatings) =>
            prevRatings.map((rating) =>
                rating.star === star
                    ? { ...rating, selected: !rating.selected }
                    : rating
            )
        );
    };

    return(
        <>
            <div className="flex flex-col bg-[#F8F8F8] border border-[#E0E0E0] shadow-2xl kanit p-5 w-full">
                <div className="flex">
                    {t('AttractionPages.title_star')}
                </div>
                <div className="flex flex-col">
                    {
                        ratingProps.map((rating,index) => (
                            <RatingComponentElement key={index} ratingObject={rating} isSelect={rating.selected} onChange={handleCheckboxChange}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}