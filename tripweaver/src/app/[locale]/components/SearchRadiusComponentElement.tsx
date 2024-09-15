import React from "react";
import { Icon } from "@iconify/react";

interface SearchRadiusComponentElementProps {
    elementName: string
    onClick: (name: string) => void;
}

export default function SearchRadiusComponentElement({elementName, onClick}: SearchRadiusComponentElementProps) {
    return(
        <>
            <div className="flex flex-row text-sm items-center kanit py-2 px-2 hover:bg-[#E9ECEE] cursor-pointer" onClick={() => onClick(elementName)}>
                <div className="flex w-[15%] text-lg justify-center">
                    <Icon icon="fa-solid:map-marker-alt" />
                </div>
                <div className="flex w-[85%]">
                    {elementName}
                </div>
            </div>
        </>
    )
}