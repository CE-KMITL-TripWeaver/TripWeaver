import React from "react";
import { Icon } from "@iconify/react";
import OpenDateComponent from "./OpenDateComponent";
import dateOpen from "../interface/dateOpen";
import PerfectScrollbar from "react-perfect-scrollbar";
import "../plantrip/carousel.css";

interface PlanningCardDetailsProps {
  title: string;
  type: string;
  address: string;
  dateOpen: dateOpen[];
}

export default function PlanningCardDetails({
  title,
  type,
  address,
  dateOpen,
}: PlanningCardDetailsProps) {
  const splitAddress = address.split(" ").slice(1).join(" ");

  return (
    <>
      <div className="flex w-full h-full px-8">
        <PerfectScrollbar
          className="flex w-full h-72 flex-row rounded-xl bg-white p-5 kanit"
          style={{
            overflow: "hidden",
          }}
        >
          <div className="flex flex-col">
            <div className="flex font-bold text-lg">{title}</div>
            <div className="flex -mt-2 text-[#9B9B9B]">{type}</div>
            <div className="flex flex-row gap-x-1">
              <div className="flex justify-center items-center">
                <Icon
                  icon="tabler:map-pin-filled"
                  className="text-lg text-[#636363]"
                  width={16}
                  height={16}
                />
              </div>
              <div className="flex text-[#9B9B9B]">Address: {splitAddress}</div>
            </div>
            {
                dateOpen.length > 0 && (
                    <OpenDateComponent dateOpen={dateOpen} />
                )
            }
            
          </div>
        </PerfectScrollbar>
      </div>
    </>
  );
}
