"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { PlanSummaryInterface } from "../interface/plantripObject";
import { TripCardInterface } from "../interface/plantripObject";
import { PlanningInformationDataInterface } from "../interface/plantripObject";

interface TripCardProps {
  dayIndex: number;
  openIndex: number|null;
  plans: PlanSummaryInterface;
  tripData: TripCardInterface;
  dataTravel: PlanningInformationDataInterface[];
  setOpenIndex: (index: number|null) => void;
}

const TripCard: React.FC<TripCardProps> = ({ dayIndex, plans, tripData,openIndex, dataTravel,setOpenIndex }) => {

  const isOpen = openIndex === (dayIndex-1);

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
                onClick={() => setOpenIndex(isOpen ? null : (dayIndex-1))} 
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
              className={`overflow-hidden transition-all duration-300 flex-col ${
                isOpen ? "max-h-screen" : "max-h-0"
              }`}
            >
                {
                    tripData && tripData.location.map((data,index) => (
                        <div className="flex" key={index}>
                        {data.name}
                        </div>
                    ))
                }
                {
                   tripData && tripData.accommodation && (
                        <div className="flex" key={tripData.accommodation._id}>
                        {tripData.accommodation.name}
                        </div>
                    )
                }

            </div>
          </div>
        )
      }
    </>
  );
};

export default TripCard;
