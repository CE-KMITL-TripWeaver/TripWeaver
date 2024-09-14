"use client";
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import {useTranslations} from 'next-intl';
import SearchComponent from "../components/SearchComponent";
import CheckBoxComponent from "../components/CheckBoxComponent";
import RatingComponent from "../components/RatingComponent";
import TagCheckBoxComponent from "../components/TagCheckBoxComponent";
import District from '../interface/district'
import Rating from "../interface/rating";
import Tags from "../interface/tags";
import axios from "axios";


export default function Home() {
    const t = useTranslations();

    const [selectedProvince, setSelectedProvince] = useState("กรุงเทพมหานคร");
    const [selectedDistrict, setSelectedDistrict] = useState<District[]>([]);
    const [ratingObject, setRatingObject] = useState<Rating[]>([]);
    const [tagsList, setTagList] = useState<Tags[]>([]);

    const handleProvinceSelect = (province: string) => {
        setSelectedProvince(province); 
    };

    const handleDistrictSelect = (districts: District[]) => {
        setSelectedDistrict(districts); 
    };

    const handleRating = (ratings: Rating[]) => {
        setRatingObject(ratings); 
    };

    const handleTag = (tags: Tags[]) => {
        setTagList(tags); 
    };

    useEffect(() => {

        if(selectedProvince && selectedDistrict) {
            const fetchData = async () => {
                try {
                    const response = await axios.post('http://localhost:3000/api/attraction/rating', {
                        provinceName: selectedProvince,
                        districtList: selectedDistrict
                                    .filter((district) => district.selected)
                                    .map((district) => district.name)
                    });

                    setRatingObject(response.data.attractionRatings.map((rating: any) => ({
                        star: rating._id,
                        count: rating.count,
                        selected: false
                    })))
                    

                } catch(error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }

    }, [selectedProvince,selectedDistrict]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/attraction/tags');

                const tagWithDefaultSelected = response.data.attractionTagKeys.map((tag: Tags) => ({
                    name: tag,
                    selected: false,
                }));
                
                setTagList(tagWithDefaultSelected)

            } catch(error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);

    return (
        <>
            <div className="flex flex-col bg-[#F4F4F4] w-screen h-screen">
                <NavBar/> 
                <div className="flex px-20 mt-10 flex-col">
                    <div className="flex flex-row text-lg">
                        <div className="kanit">
                            {t('AttractionPages.infoMain')}
                            
                        </div>
                        <div className="kanit font-bold">
                            {t('AttractionPages.attraction')}
                        </div>
                    </div>
                    <div className="flex w-full flex-row justify-end">
                        <div className="flex flex-row mr-5">
                            <SearchComponent defaultValue={selectedProvince} onProvinceSelect={handleProvinceSelect}/>
                        </div>
                        <div className="flex flex-row ">
                            <CheckBoxComponent provinceName={selectedProvince} onCheckBoxSelect={handleDistrictSelect}/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-20">
                    <div className="flex kanit text-center text-xl font-bold mb-2">
                        {t('AttractionPages.filter')}
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col w-[14%]">
                            <div className="flex mb-5">
                                <RatingComponent ratingProps={ratingObject} onCheckBoxSelect={handleRating}/>
                            </div>
                            <div className="flex mb-5">
                                <TagCheckBoxComponent tagsList={tagsList} onCheckBoxSelect={handleTag}/>
                            </div>
                        </div>
                        <div className="flex w-[86%]">
                            444
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </>
    );
}