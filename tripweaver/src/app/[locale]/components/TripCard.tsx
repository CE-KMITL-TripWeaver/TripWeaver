"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { PlanSummaryInterface } from "../interface/plantripObject";
import { TripCardInterface } from "../interface/plantripObject";
import { PlanningInformationDataInterface } from "../interface/plantripObject";

import {
  fetchAccommodationData,
  fetchAttractionData,
  fetchRestaurantData,
} from "@/utils/apiService";
import axios from "axios";

interface TripCardProps {
  dayIndex: number;
  plans: PlanSummaryInterface;
  tripData: TripCardInterface;
  dataTravel: PlanningInformationDataInterface[];
}

const TripCard: React.FC<TripCardProps> = ({ dayIndex, plans, tripData, dataTravel }) => {
  const [isOpen, setIsOpen] = useState<boolean>(dayIndex === 1);

  console.log(tripData);
  console.log("------------");
  console.log(plans)
  console.log("------------");
  console.log(dataTravel)
  console.log("------------");

  return (
    <>
      {
        plans && (
            <div className="flex px-5 kanit flex-col w-full h-full">
            <div className="flex flex-row justify-between">
              <div className="flex text-black font-bold text-3xl">
                Day {dayIndex}
              </div>
              <div
                className="flex justify-center items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Icon
                  icon={
                    isOpen ? "icon-park-outline:down" : "icon-park-outline:right"
                  }
                  className="text-lg text-black"
                  height={24}
                  width={23}
                />
              </div>
            </div>
            <div className="flex w-full items-center text-[#878787] font-bold mt-2">
              {plans.plans.planName}
            </div>
            <div className="w-full border-t border-[#adadad] mt-5"></div>
    
            {/* Content Section */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-full" : "max-h-0"
              }`}
            >
              <div className="p-5">
                <p>เนื้อหาสำหรับ Day {dayIndex} ที่จะถูกซ่อนได้เมื่อไม่เปิด</p>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default TripCard;
