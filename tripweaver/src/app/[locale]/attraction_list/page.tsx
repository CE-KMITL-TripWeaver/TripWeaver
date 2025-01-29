"use client";
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import {useTranslations} from 'next-intl';
import SearchComponent from "../components/SearchComponent";
import CheckBoxComponent from "../components/CheckBoxComponent";
import RatingComponent from "../components/RatingComponent";
import TagCheckBoxComponent from "../components/TagCheckBoxComponent";
import SearchRadiusComponent from "../components/SearchRadiusComponent";
import District from '../interface/district'
import Rating from "../interface/rating";
import Tags from "../interface/tags";
import AttractionInfo from "../interface/attractionInfo";
import LocationCard from "../components/LocationCard";
import { fetchAttractionRating, fetchAttractionTags, fetchAttractionKeyList} from '@/utils/apiService';
import { useQuery } from "react-query";

export default function Home() {
    const t = useTranslations();

    const [selectedProvince, setSelectedProvince] = useState("กรุงเทพมหานคร");
    const [selectedDistrict, setSelectedDistrict] = useState<District[]>([]);
    const [selectedMarkRadiusValue, setSelectedMarkRadiusValue] = useState<number>(5);
    const [selectedMarkRadiusAttraction, setSelectedMarkRadiusAttraction] = useState<string>("");

    const [ratingObject, setRatingObject] = useState<Rating[]>([]);
    const [tagsList, setTagList] = useState<Tags[]>([]);
    const [searchRadiusMarker,setSearchRadiusMarker] = useState<AttractionInfo[]>([])

    const {
        data: ratingData,
        isLoading: isRatingDataLoading,
        isError: isRatingError,
    } = useQuery(
        ["ratingData", selectedProvince, selectedDistrict],
        () => fetchAttractionRating(
            selectedProvince,
            selectedDistrict
                .filter((district) => district.selected)
                .map((district) => district.name)
        ),
        {
            enabled: !!selectedProvince && selectedDistrict.length > 0,
            retry: 0
        }
    );

    const {
        data: attractionList,
        isLoading: isAttractionListLoading,
        isError: isAttractionListError,
    } = useQuery(
        ["attractionData", selectedProvince, selectedDistrict],
        () => fetchAttractionKeyList(
            selectedProvince,
            selectedDistrict
                .filter((district) => district.selected)
                .map((district) => district.name)
        ),
        {
            enabled: !!selectedProvince && selectedDistrict.length > 0,
            retry: 0
        }
    );

    const {
        data: attractionTags,
        isLoading: isAttractionTagsLoading,
        isError: isAttractionTagsError,
    } = useQuery(
        ["attractionTags"],
        () => fetchAttractionTags(),
        {
            retry: 0
        }
    );
    

    const handleProvinceSelect = (province: string) => {
        setSelectedProvince(province); 
    };

    const handleMarkRadiusAttractionSelect = (markAttaction: string) => {
        setSelectedMarkRadiusAttraction(markAttaction); 
    };

    const handleMarkRadiusValueSelect = (markValue: number) => {
        setSelectedMarkRadiusValue(markValue); 
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
        if (attractionList) {
            setSearchRadiusMarker(attractionList.attractions)
        }
    }, [attractionList]);

    useEffect(() => {
        if (ratingData) {
            setRatingObject(
                ratingData.attractionRatings.map((rating: any) => ({
                    star: rating._id,
                    count: rating.count,
                    selected: false,
                }))
            );
        }
    }, [ratingData]);

    useEffect(() => {
        if (attractionTags) {
            const tagWithDefaultSelected = attractionTags.attractionTagKeys.map((tag: Tags) => ({
                name: tag,
                selected: false,
            }));
            setTagList(tagWithDefaultSelected)
        }
    }, [attractionTags]);

    return (
        <>
            <div className="flex flex-col bg-[#F4F4F4] w-full h-full">
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
                    <div className="flex flex-row mb-64">
                        <div className="flex flex-col w-[15%]">
                            <div className="flex mb-5">
                                <RatingComponent ratingProps={ratingObject} onCheckBoxSelect={handleRating}/>
                            </div>
                            <div className="flex mb-5">
                                <TagCheckBoxComponent tagsList={tagsList} onCheckBoxSelect={handleTag}/>
                            </div>
                            <div className="flex">
                                <SearchRadiusComponent attractionList={searchRadiusMarker} onSelectAttractionMark={handleMarkRadiusAttractionSelect} onSelectAttractionValue={handleMarkRadiusValueSelect}/>
                            </div>
                        </div>
                        <div className="flex w-[85%] pl-16">
                            <LocationCard placeImage="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/db/c9/08/beautiful-dive.jpg?w=1200&h=900&s=1" placeID="675c202f9f570448ebeb4831" placeName="ซันไรซ์ ไดเวอส์"/>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </>
    );
}