import React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import AccommodationData from "../interface/accommodation";

export default function AccommodationCard({
  data,
  distance,
  duration,
}: {
  data: AccommodationData;
  distance: number;
  duration: number;
}) {
  const formattedDistance =
    distance >= 1000
      ? `${(distance / 1000).toFixed(1)} กม.`
      : `${distance} ม.`;

  const formattedDuration =
    duration >= 3600
      ? `${Math.floor(duration / 3600)} ชม.${
          Math.floor((duration % 3600) / 60) !== 0
            ? ` ${Math.floor((duration % 3600) / 60)} น.`
            : ""
        }`
      : `${Math.floor(duration / 60)} น.`;

  return (
    <>
      <div className="relative group flex w-full h-full flex-row justify-between pr-5">
        <div className="flex w-[55%] flex-col h-auto p-4 rounded-lg bg-[#F2F2F2] justify-between">
          <div className="flex flex-col">
            <div className="flex text-lg kanit text-[#595959]">{data.name}</div>
            <div className="flex kanit text-[#9B9B9B]">{data.type}</div>
            <div className="flex flex-row">
              <div className="flex flex-row mr-1">
                {Array.from({ length: Math.round(data.star) }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center"
                    >
                      <Icon
                        icon="mynaui:star-solid"
                        className="text-lg text-[#666666]"
                      />
                    </div>
                  )
                )}
              </div>
              <div className="flex kanit items-center justify-center font-bold text-[#666666] mr-1">
                {data.star}
              </div>
              <div className="flex kanit items-center justify-center font-bold text-[#8A8A8A]">
                ({data.rating.ratingCount})
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
                {formattedDuration}
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
                {formattedDistance}
              </div>
            </div>
            <div className="flex flex-row cursor-pointer hover:text-[#595959] text-[#9B9B9B]">
              <div className="flex items-center justify-center mr-1">
                <Icon icon="mdi:clock-outline" className="text-lg" />
              </div>
              <div className="flex items-center justify-center kanit">
                120 นาที
              </div>
            </div>
          </div>
        </div>
        <Image
          alt="img-planning-card"
          src={data.imgPath[0]}
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-xl "
          style={{ width: "30%", height: "auto" }}
        />
      </div>
    </>
  );
}
