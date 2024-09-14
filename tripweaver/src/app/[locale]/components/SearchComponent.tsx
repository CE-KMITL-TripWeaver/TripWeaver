"use client";
import React, { useState, useEffect  } from "react";
import { Icon } from "@iconify/react";
import {useTranslations} from 'next-intl';
import SearchComponentElement from "./SearchComponentElement";
import axios from "axios";


interface SearchComponentProps {
  defaultValue: string;
  onProvinceSelect: (province: string) => void;
}

interface Province {
  name: string;
  idRef: number
}

export default function SearchComponent({
  defaultValue, onProvinceSelect
}: SearchComponentProps) {
  
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [provinceList, setProvinceList] = useState<Province[]>([]);
  const [provinceFromQuery, setProvinceFromQuery] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>(defaultValue);

  const handleClickOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filteredProvinces = provinceList.filter(province =>
      province.name.startsWith(searchQuery)
    );

    setProvinceFromQuery(filteredProvinces)

  }, [searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
       const response = await axios.post('http://localhost:3000/api/province/listProvince');
       setProvinceList(response.data.provinces);
       setProvinceFromQuery(response.data.provinces);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSelectProvince = (name: string) => {
    setSelectedProvince(name);
    onProvinceSelect(name)
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col relative w-52">
        <div className="flex justify-center">
            <div
            className="flex px-2.5 py-2.5 justify-center text-center items-center text-black shadow-xl bg-white rounded-2xl cursor-pointer min-w-52"
            onClick={handleClickOpen}
            >
            <div className="flex flex-row justify-between w-full">
                <div className="flex justify-between items-center mr-2">
                  <Icon
                      icon="heroicons:map-pin"
                      className="text-xl text-[#828282]"
                  />
                  </div>
                  <div className="flex kanit">{selectedProvince}</div>
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
              onChange={handleInputChange}
            />
          </div>
          <div className="flex mt-2">
                <ul className="overflow-y-auto max-h-48 w-full">
                    {
                      provinceFromQuery.map((province, index) => (
                        <li key={index}>
                          <SearchComponentElement elementName={province.name} onClick={handleSelectProvince}/>
                        </li>
                      ))
                    }
                </ul>
          </div>
        </div>
      </div>
    </>
  );
}
