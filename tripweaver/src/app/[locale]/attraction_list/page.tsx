"use client";
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import {useTranslations} from 'next-intl';
import SearchComponent from "../components/SearchComponent";
import CheckBoxComponent from "../components/CheckBoxComponent";
import RatingComponent from "../components/RatingComponent";
import District from '../interface/district'


export default function Home() {
    const t = useTranslations();

    const [selectedProvince, setSelectedProvince] = useState("กรุงเทพมหานคร");
    const [selectedDistrict, setSelectedDistrict] = useState<District[]>([]);

    const handleProvinceSelect = (province: string) => {
        setSelectedProvince(province); 
    };

    const handleDistrictSelect = (districts: District[]) => {
        setSelectedDistrict(districts); 
    };

    useEffect(() => {
        //console.log(selectedDistrict);
    }, [selectedDistrict]);

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
                    {/*<RangeSliderComponent
                    title={t('AttractionPages.title_star')}
                    initialMin={1}
                    initialMax={5}
                    min={1}
                    max={5}
                    step={1}
                    gap={0}
                    isStarComponent={true}
                    /> */}
                    <div className="flex flex-row">
                        <div className="flex w-[15%]">
                            
                            {/*<RatingComponent elementName="ttt"/>*/}
                        </div>
                        <div className="flex w-[85%]">
                            444
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </>
    );
}