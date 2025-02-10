import React from "react";
import { Icon } from "@iconify/react";
import { redirect } from "next/navigation";

interface LocationCard {
  blogID: string;
  blogName: string;
  blogImage: string;
}

export default function LocationCard({
    blogID,
    blogName,
    blogImage,
  }: LocationCard) {

    const handleClickViewDetails = (blogID: string) => {
        console.log("Navigate to",blogID);
    }


    return (
        <>
            <div className="flex relative w-full h-full flex-col justify-end cursor-pointer overflow-hidden rounded-xl group select-none " onClick={
                (e) => {
                  e.stopPropagation();
                  handleClickViewDetails(blogID)}}
            >
                <div 
                className={`flex absolute bg-cover bg-center w-full h-full rounded-xl group-hover:scale-110 transition-all duration-300`} 
                style={{ backgroundImage: `url('${blogImage && blogImage.trim() !== "" ? blogImage : '/images/no-img.png'}')` }} 
                />
                <div className="flex p-2 flex-col w-full h-12 bg-opacity-70 justify-center font-bold bg-black text-white kanit rounded-b-xl items-start z-10">
                    {blogName}
                </div>
            </div>
        </>
    );
}
