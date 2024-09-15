"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import SearchRadiusComponentElement from "./SearchRadiusComponentElement";

export default function SearchRadiusComponent() {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedMarkRadius, setSelectedMarkRadius] = useState<string>('');

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  const handleSelectMarkRadius = (name: string) => {
    setSelectedMarkRadius(name);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex relative flex-col bg-[#F8F8F8] border border-[#E0E0E0] shadow-xl kanit w-full rounded-xl">
        <div className="flex-col p-5">
            <div className="flex text-sm mb-1">
            {t("AttractionPages.title_search_radius")}
            </div>
            <div className="flex flex-col">
            <div className="flex mb-1">
                <input
                type="text"
                id="default-search"
                className="block w-full p-2 text-sm text-black border border-[#B9B9B9] rounded-xl bg-[#F0F0F0] focus:outline-none"
                placeholder={t("AttractionPages.placeholder_search_radius")}
                onFocus={handleFocus}
                onBlur={handleBlur}
                />
            </div>
            <div className="flex">10km</div>
            </div>
        </div>
        <div
            className={`z-10 absolute bg-white top-[136px] rounded-xl ${
              isOpen ? "flex w-full flex-col" : "hidden"
            }`}
          >
            <div className="relative w-full">
              <SearchRadiusComponentElement elementName="ทดสอบ" onClick={handleSelectMarkRadius}/>
            </div>
          </div>
      </div>
    </>
  );
}
