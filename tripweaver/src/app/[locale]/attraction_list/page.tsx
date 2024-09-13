"use client";
import NavBar from "../components/NavBar";
import {useTranslations} from 'next-intl';
import SearchComponent from "../components/SearchComponent";

export default function Home() {
    const t = useTranslations();
    return (
        <>
            <div className="flex flex-col bg-[#F4F4F4] w-screen h-screen">
                <NavBar/> 
                <div className="flex px-20 mt-10 flex-col">
                    <div className="flex flex-row text-lg">
                        <div className="kanit">
                            {t('AttractionPages.infoMain')}
                            
                        </div>
                        <div className="kanit font-bold">
                            {t('AttractionPages.attraction')}
                        </div>
                    </div>
                    <div className="flex w-full justify-end flex-row px-20">
                        <SearchComponent defaultValue="กรุงเทพมหานคร"/>
                    </div>
                </div>
                <div className="flex">
                    45454
                </div>
            </div>
            
        </>
    );
}