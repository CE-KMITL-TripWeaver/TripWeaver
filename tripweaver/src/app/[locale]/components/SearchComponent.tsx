"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {useTranslations} from 'next-intl';
import SearchComponentElement from "./SearchComponentElement";

interface SearchComponentProps {
  defaultValue: string;
}

export default function SearchComponent({
  defaultValue,
}: SearchComponentProps) {
  
    const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex flex-col relative w-72">
        <div className="flex px-10">
            <div
            className="flex px-5 py-2.5 justify-center text-center items-center text-black shadow-xl bg-white rounded-2xl cursor-pointer"
            onClick={handleClickOpen}
            >
            <div className="flex flex-row">
                <div className="flex justify-center items-center mr-2">
                <Icon
                    icon="heroicons:map-pin"
                    className="text-xl text-[#828282]"
                />
                </div>
                <div className="flex kanit">{defaultValue}</div>
                <div className=" flex items-center justify-center ml-2">
                <Icon
                    icon="icon-park-outline:down-c"
                    className="text-lg text-[#828282] "
                />
                </div>
            </div>
            </div>
        </div>
        <div
          className={`z-10 absolute bg-white p-3 top-14 rounded-xl ${
            isOpen ? "flex w-full flex-col" : "hidden"
          }`}
        >
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Icon icon="material-symbols:search" className='text-2xl text-[#828282]' />
            </div>
            <input
              type="text"
              id="search-comp"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 focus:outline-none"
              placeholder={t('SearchComponent.infoSearch')}
            />
          </div>
          <div className="flex mt-2">
                <ul className="overflow-y-auto h-48 w-full">
                    <li><SearchComponentElement elementName={'ทดสอบ'}/></li>
                    <li><SearchComponentElement elementName={'ทดสอบ2'}/></li>
                    <li><SearchComponentElement elementName={'ทดสอบ3'}/></li>
                    <li><SearchComponentElement elementName={'ทดสอบ4'}/></li>
                    <li><SearchComponentElement elementName={'ทดสอบ5'}/></li>
                    <li><SearchComponentElement elementName={'ทดสอบ6'}/></li>
                    <li><SearchComponentElement elementName={'ทดสอบ7'}/></li>
                    <li><SearchComponentElement elementName={'ทดสอบ8'}/></li>
                    <li><SearchComponentElement elementName={'ทดสอบ9'}/></li>
                    <li><SearchComponentElement elementName={'ทดสอบ10'}/></li>
                    <li><SearchComponentElement elementName={'ทดสอบ11'}/></li>
                </ul>
          </div>
        </div>
      </div>
    </>
  );
}
