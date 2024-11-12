"use client";
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";

export default function Home() {
  const t = useTranslations();
  // รายละเอียดของสวนน้ำอันดามันดา
  const attraction = {
    name: "สวนน้ำอันดามันดา",
    star: 4.4,
    reviewer: 45664,
    tags: ["สวนน้ำ"],
    image:
      "https://img5.pic.in.th/file/secure-sv1/cfe27c1071fe6268360f06649bb042ca.jpg",
    map: "https://img5.pic.in.th/file/secure-sv1/map_.jpg",
    openHour: "10:00 - 19:00",
    ticketPrice: "1090-2982",
    tel: "076746777",
  };

  const reviewer = {};
  //

  useEffect(() => {}, []);

  const renderStars = (rating: number) => {
    const stars = [];
    const fillPercentage = rating % 1;
    for (let i = 1; i <= attraction.star; i++) {
      stars.push(
        <span key={i}>
          <Icon icon="typcn:star-full-outline" />
        </span>
      );
    }
    if (fillPercentage) {
      console.log(fillPercentage);
      stars.push(
        <span key={rating}>
          <Icon icon="typcn:star-half" />
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      <div className="flex flex-col bg-[#F4F4F4] w-screen h-full">
        <NavBar />
        <div className="flex px-20 mt-10 flex-col">
          <div className="flex flex-row text-lg">
            <div className="kanit">{t("AttractionPages.infoMain")}</div>
            <div className="kanit font-regular">
              {t("AttractionPages.attraction")}
            </div>
            <div className="kanit font-bold">
              {attraction.name}
            </div>
          </div>
        </div>
        <div className="flex flex-col px-20 mt-10">
          <div className="flex flex-col justify-self-center bg-white shadow-md rounded-lg">
            <img
              src={attraction.image}
              alt="attraction"
              className="w-full h-[350px] object-cover object-center rounded-t-lg"
            />
            <div className="flex flex-col mx-12 mt-4">
              <div className="flex justify-between items-center">
                <div className="kanit font-bold text-5xl">
                  {attraction.name}
                </div>
                <div className="flex gap-x-2 mr-2">
                <button className="kanit bg-[#EE6527] hover:bg-[#DDDDDD] hover:text-black text-white text-xl px-4 rounded-full font-regular h-10 flex items-center space-x-2">
                    <Icon icon="bi:heart" />
                    <span>{t("DetailPages.like")}</span>
                  </button>
                  <button className="kanit bg-[#DDDDDD] hover:bg-[#484848] hover:text-white text-black text-xl px-4 rounded-full font-regular h-10 flex items-center space-x-2">
                    <Icon icon="lucide:edit" />
                    <span>{t("DetailPages.editInfo")}</span>
                  </button>
                  <button className="kanit bg-[#484848] hover:bg-[#DDDDDD] hover:text-black text-white text-xl px-4 rounded-full font-regular h-10 flex items-center space-x-2">
                    <Icon icon="ic:outline-plus" />
                    <span>{t("DetailPages.addToTrip")}</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-row mt-5 items-center text-2xl">
                {renderStars(attraction.star)} {attraction.star} (
                {attraction.reviewer})
              </div>
              <div className="flex gap-x-2 mt-5">
                {attraction.tags.map((tag, index) => (
                  <button
                    key={index}
                    className="kanit bg-[#F0F0F0] hover:bg-[#DDDDDD] hover:text-black text-[#636363] text-xl px-4 rounded-full font-regular h-10 flex items-center space-x-2"
                  >
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
              <div className="kanit font-bold text-2xl mt-5">
                {t("DetailPages.map")}
              </div>
              {/* แผนที่ */}
              <div className="flex justify-center">
                <img
                  src={attraction.map}
                  alt="map"
                  className="w-1/5 object-cover object-center rounded-t-lg"
                />
              </div>
              <div className="kanit font-bold text-2xl mt-5">
                {t("DetailPages.info")}
              </div>
              <div className="flex mb-20">
                <div className=" mr-12">
                  <div className="flex">
                    <div className="kanit font-regular text-xl mt-3">
                      {t("DetailPages.openHour")}
                    </div>
                    <div className="kanit font-regular text-xl mt-3 ml-3">
                      <div className="flex">
                        <div className="mr-12 w-32">วันจันทร์</div>
                        <div>{attraction.openHour}</div>
                      </div>
                      <div className="flex">
                        <div className="mr-12 w-32">วันอังคาร</div>
                        <div>{attraction.openHour}</div>
                      </div>
                      <div className="flex">
                        <div className="mr-12 w-32">วันพุธ</div>
                        <div>{attraction.openHour}</div>
                      </div>
                      <div className="flex">
                        <div className="mr-12 w-32">วันพฤหัส</div>
                        <div>{attraction.openHour}</div>
                      </div>
                      <div className="flex">
                        <div className="mr-12 w-32">วันศุกร์</div>
                        <div>{attraction.openHour}</div>
                      </div>
                      <div className="flex">
                        <div className="mr-12 w-32">วันเสาร์</div>
                        <div>{attraction.openHour}</div>
                      </div>
                      <div className="flex">
                        <div className="mr-12 w-32">วันอาทิตย์</div>
                        <div>{attraction.openHour}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <div className="kanit font-regular text-xl mt-3 mr-10 w-40">
                      {t("DetailPages.ticketPrice")}
                    </div>
                    <div className="kanit font-regular text-xl mt-3">
                      {attraction.ticketPrice}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="kanit font-regular text-xl mt-3 mr-10 w-40">
                      {t("DetailPages.contact")}
                    </div>
                    <div className="kanit font-regular text-xl mt-3">
                      {attraction.tel}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-self-center bg-white shadow-md rounded-lg mt-8">
            <div className="flex flex-col mx-12 mt-4">
              <div className="flex justify-between items-center"></div>
              <div className="kanit font-bold text-2xl mt-3">
                {t("DetailPages.review")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
