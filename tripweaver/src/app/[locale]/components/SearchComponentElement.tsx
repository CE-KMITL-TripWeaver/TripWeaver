import React from "react";

interface SearchComponentElementProps {
    elementName: string
}

export default function SearchComponentElement({elementName}: SearchComponentElementProps) {
    return(
        <>
            <div className="flex items-center kanit py-2 mr-2 px-2 rounded-lg hover:bg-[#E9ECEE] cursor-pointer">
                {elementName}
            </div>
        </>
    )
}