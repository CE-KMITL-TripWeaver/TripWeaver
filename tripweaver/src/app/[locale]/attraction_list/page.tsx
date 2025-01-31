"use client";
import React, { useState, useEffect, useRef } from "react";
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
import { fetchAttractionTags, fetchAttractionKeyList, fetchAttraction, fetchPlanAllData, fetchUserPlans, addLocationToTrip} from '@/utils/apiService';
import { useQuery } from "react-query";
import PaginationComponent from "../components/PaginationComponent";
import AddToTripModal from "../components/modals/AddToTripModals";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { PlanObject } from "../interface/plantripObject";
import Swal from "sweetalert2";

interface LocationCardInterface {
    _id: string;
    name: string;
    imgPath: string[];
}

export default function Home() {
    const t = useTranslations();
    const router = useRouter();

    const [selectedProvince, setSelectedProvince] = useState("ภูเก็ต");
    const [selectedDistrict, setSelectedDistrict] = useState<District[]>([]);
    const [locationCardList, setLocationCardList] = useState<LocationCardInterface[]>([]);
    const [plantripList, setPlantripList] = useState<PlanObject[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedLocation, setSelectedLocation] = useState<string>("");
    const [selectedPlan, setSelectedPlan] = useState<PlanObject|null>(null);
    const [searchPlan, setSearchPlan] = useState<string>("");
    const [indexDate, setIndexDate] = useState<number>(0);
    const [isDropdownPlanOpen, setIsDropdownPlanOpen] = useState<boolean>(false);

    const [selectedMarkRadiusValue, setSelectedMarkRadiusValue] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [maxPage, setMaxPage] = useState<number>(1);
    const [selectedMarkRadiusAttraction, setSelectedMarkRadiusAttraction] = useState<AttractionInfo|null>(null);

    const [ratingObject, setRatingObject] = useState<Rating[]>([]);
    const [ratingCheckData, setRatingCheckData] = useState<boolean[]>(Array(6).fill(false));
    
    const [tagsList, setTagList] = useState<Tags[]>([]);
    const [searchRadiusMarker,setSearchRadiusMarker] = useState<AttractionInfo[]>([])

  const { data: session, status } = useSession();

    const {
        data: userPlans,
        isLoading: isUserPlansLoading,
        isError: isUserPlansError,
    } = useQuery(
        ["userPlans", session?.user?.id],
        () => fetchUserPlans(session?.user?.id!),
        {
        enabled: !!session?.user?.id,
        }
    );

    const {
        data: planListData,
        isLoading: isPlanListLoading,
        isError: isPlanListError,
    } = useQuery(["planData", userPlans], () => fetchPlanAllData({"planList": userPlans}), {
        enabled: !!userPlans,
        retry: 0
    });

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

    const {
        data: attractionDataFromFilter,
        isLoading: isAttractionDataFromFilterLoading,
        isError: isAttractionDataFromFilterError,
    } = useQuery(
        ["attractionDataFromFilter", selectedProvince, selectedDistrict, tagsList, ratingCheckData,selectedMarkRadiusAttraction,selectedMarkRadiusValue
            ,currentPage
        ],
        () => fetchAttraction(
            selectedProvince,
            selectedDistrict
                .filter((district) => district.selected)
                .map((district) => district.name),
            tagsList.filter((tag) => tag.selected).map((tag) => tag.name),
            ratingObject.filter((rating) => rating.selected).map((rating) => rating.star),
            currentPage,
            selectedMarkRadiusValue*1000,
            selectedMarkRadiusAttraction?.latitude,
            selectedMarkRadiusAttraction?.longitude
        ),
        {
            retry: 0
        }
    );

    useEffect(() => {
        if (planListData) {
            const mappedPlans: PlanObject[] = planListData.plans.map((plan: PlanObject) => ({
                _id: plan._id,
                startDate: plan.startDate,
                dayDuration: plan.dayDuration,
                accommodations: plan.accommodations,
                tripName: plan.tripName
            }));
    
            setPlantripList(mappedPlans);
        }
    }, [planListData]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProvince, selectedDistrict, tagsList, ratingCheckData,selectedMarkRadiusAttraction,selectedMarkRadiusValue]);

    useEffect(() => {
        if (attractionDataFromFilter) {
            setRatingObject(
                attractionDataFromFilter.completeAttractionRatings.map((rating: any,index: number) => ({
                    star: rating._id,
                    count: rating.count,
                    selected: ratingCheckData[index],
                }))
            );

            setLocationCardList(attractionDataFromFilter.attractions.map((data: LocationCardInterface)=>({
                _id: data._id,
                name: data.name,
                imgPath: data.imgPath
            }))

            );
            setMaxPage(attractionDataFromFilter.totalPages);
        }
    }, [attractionDataFromFilter]);

    useEffect(() => {
        if (attractionList) {
            setSearchRadiusMarker(attractionList.attractions);
        }

        if (attractionTags) {
            setTagList(
                attractionTags.attractionTagKeys.map((tag: string) => ({
                    name: tag,
                    selected: false,
                }))
            );
        }
    }, [attractionList, attractionTags]);
    

    const handleProvinceSelect = (province: string) => {
        setSelectedProvince(province); 
    };

    const handleMarkRadiusAttractionSelect = (markAttaction: AttractionInfo|null) => {
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
        setRatingCheckData(ratings.map((rating) => {
            return rating.selected;
        }))
    };

    const handleChangeDateIndex= (dateIndex: number) => {
        setIndexDate(dateIndex);
    }

    const handleTag = (tags: Tags[]) => {
        setTagList(tags); 
    };

    const handleSelectPage = (page: number) => {
        if(page==currentPage) {
            return;
        }
        if(page > maxPage) {
            return;
        }

        if(page <= 0) {
            return;
        }

        setCurrentPage(page);
    }

    const handleAddTrip = (locationID: string) => {
        if(planListData.length == 0) { 
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You dont have any trip create first"
              }).then((result) => {
                if (result.isConfirmed) {
                    router.push("/plantrip/create");
                }
              });
            
            return;
        }

        setSearchPlan("");
        setSelectedPlan(null);
        setIndexDate(0);

        setIsModalOpen(true);
        setSelectedLocation(locationID);
    }

    const handleAddTripToPlan = (planID: string,locationID: string) => {
        setIsModalOpen(false);
        setSelectedLocation("");
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "This location has been added to your trip"
          });
        
       addLocationToTrip(planID,locationID,indexDate,"ATTRACTION");
    }

    const handleSetPlanID = (planID: string) => {
        const selectedTrip = plantripList.find((plan) => plan._id === planID);
        if (selectedTrip) {
            setSelectedPlan(selectedTrip);
            setSearchPlan(selectedTrip.tripName);
        } else {
            setSelectedPlan(null);
        }
        setIndexDate(0);
    }

    
    const handleSetSearchPlan = (planName: string) => {
        setSearchPlan(planName);
    }

    const handleChangeDropdown = (isOpen: boolean) => {
        setIsDropdownPlanOpen(isOpen);
    }

    if (status === "unauthenticated") {
        redirect("/login");
    }


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
                    <div className="flex flex-row">
                        <div className="flex flex-col w-[15%]">
                            <div className="flex mb-5">
                                <SearchRadiusComponent attractionList={searchRadiusMarker} onSelectAttractionMark={handleMarkRadiusAttractionSelect} onSelectAttractionValue={handleMarkRadiusValueSelect}/>
                            </div>
                            <div className="flex mb-5">
                                <RatingComponent ratingProps={ratingObject} onCheckBoxSelect={handleRating}/>
                            </div>
                            <div className="flex">
                                <TagCheckBoxComponent tagsList={tagsList} onCheckBoxSelect={handleTag}/>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-[85%] pl-16 h-full">
                        {
                            locationCardList.map((location, index) => (
                                <div className="w-1/4 p-2 max-h-56 justify-end items-end" key={index}>
                                    <LocationCard 
                                        placeImage={location.imgPath[0]} 
                                        placeID={location._id}
                                        placeName={location.name}
                                        onClickAddTrip={handleAddTrip}
                                    />
                                </div>
                            ))
                        }
                    </div>
                    </div>
                    
                </div>
                <div className="flex px-20 justify-end w-full h-full mb-5">
                    <PaginationComponent currentPage={currentPage} maxPage={maxPage} onSelectPage={handleSelectPage} />
                </div>
                <AddToTripModal
                    isOpen={isModalOpen}
                    searchPlan={searchPlan}
                    selectedPlan={selectedPlan}
                    onClose={() => setIsModalOpen(false)}
                    onAddTrip={handleAddTripToPlan}
                    onSelectPlan={handleSetPlanID}
                    onInputPlanName={handleSetSearchPlan}
                    selectedLocation={selectedLocation}
                    planList={plantripList}
                    isDropdownPlanOpen={isDropdownPlanOpen}
                    onChangeDropdown={handleChangeDropdown}
                    onChangeDate={handleChangeDateIndex}
                />
            </div>
            
        </>
    );
}