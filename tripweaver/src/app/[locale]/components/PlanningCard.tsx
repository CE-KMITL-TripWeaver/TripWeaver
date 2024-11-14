import React from "react";
import { Icon } from "@iconify/react";
import locationPlaning from "../interface/locationPlan";
import Image from "next/image";
export default function PlanningCard({
    id,
    title,
    type,
    rating,
    ratingCount,
    img,
    latitude,
    longitude,
    dateOpen,
    onDelete,
    index,
    duration,
    distance
  }: locationPlaning & { onDelete: (id: number) => void } & { index: number, distance: number, duration: number}) {

    const formattedDistance = distance >= 1000
    ? `${(distance / 1000).toFixed(1)} กม.`
    : `${distance} ม.`;

    const formattedDuration = duration >= 3600
    ? `${Math.floor(duration / 3600)} ชม.${Math.floor((duration % 3600) / 60) !== 0 ? ` ${Math.floor((duration % 3600) / 60)} น.` : ""}`
    : `${Math.floor(duration / 60)} น.`;


    return (
        <>
            <div className="relative group flex w-full h-full flex-row justify-between">
                <div className="flex w-[55%] flex-col h-auto p-4 rounded-lg bg-[#F2F2F2] justify-between">
                    <div className="flex flex-col">
                        <div className="flex text-lg kanit text-[#595959]">
                            {title}
                        </div>
                        <div className="flex kanit text-[#9B9B9B]">
                            {type}
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-row mr-1">
                                {Array.from({ length: Math.round(rating) }).map((_, index) => (
                                    <div key={index} className="flex justify-center items-center">
                                        <Icon
                                            icon="mynaui:star-solid"
                                            className="text-lg text-[#666666]"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex kanit items-center justify-center font-bold text-[#666666] mr-1">
                                {rating}
                            </div>
                            <div className="flex kanit items-center justify-center font-bold text-[#8A8A8A]">
                                ({ratingCount})
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row mt-2 justify-between">
                        <div className="flex flex-row">
                            <div className="flex items-center justify-center mr-1">
                                <Icon
                                    icon="material-symbols:flag-outline"
                                    className="text-lg text-[#9B9B9B]"
                                />
                            </div>
                            <div className="flex items-center justify-center kanit text-[#9B9B9B]">
                                {index === 0 ? "จุดเริ่มต้น" : `${formattedDuration}`}
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex items-center justify-center mr-1">
                                <Icon
                                    icon="teenyicons:pin-outline"
                                    className="text-lg text-[#9B9B9B]"
                                />
                            </div>
                            <div className="flex items-center justify-center kanit text-[#9B9B9B]">
                                {index === 0 ? "จุดเริ่มต้น" : `${formattedDistance}`}
                            </div>
                        </div>
                        <div className="flex flex-row cursor-pointer hover:text-[#595959] text-[#9B9B9B]">
                            <div className="flex items-center justify-center mr-1">
                                <Icon
                                    icon="mdi:clock-outline"
                                    className="text-lg"
                                />
                            </div>
                            <div className="flex items-center justify-center kanit">
                               120 นาที
                            </div>
                        </div>
                    </div>
                </div>
                <Image
                    alt="img-planning-card"
                    src={img}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-xl mr-5"
                    style={{ width: '30%', height: 'auto' }}
                />
                <div className="flex absolute -top-3 -left-3">
                    <Icon
                        icon="fontisto:map-marker"
                        className="text-lg text-[#9B9B9B]"
                        width={36}
                        height={36}
                    />
                </div>
                <div className="flex absolute kanit font-bold text-white -top-2 left-[2px]">
                    {index+1}
                </div>
                <div className="flex absolute top-[40%] -right-5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => onDelete(id)}>
                    <Icon
                        icon="gravity-ui:trash-bin"
                        className="text-lg text-[#9B9B9B]"
                        width={24}
                        height={24}
                    />
                </div>
            </div>
        </>
    );
}