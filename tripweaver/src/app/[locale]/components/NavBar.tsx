"use client";
import React from "react";
import {useTranslations} from 'next-intl';

export default function NavBar() {
  const t = useTranslations('Navbar');

  return (
    <>
      <div className="flex w-full p-5">
        <div className="flex flex-row w-full">
          <div className="flex w-[30%]">TripWeaver</div>
          <div className="flex w-[35%] px-10">
            <div className="flex rounded-3xl overflow-hidden w-full font-[sans-serif] shadow-lg">
              <input
                type="email"
                placeholder="Search Something..."
                className="w-full outline-none bg-[#E9ECEE] text-sm px-5 py-3"
              />
              <button
                type="button"
                className="flex items-center justify-center bg-[#E9ECEE] px-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 192.904 192.904"
                  width="18px"
                  className=" fill-black"
                >
                  <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex w-[35%] flex-row">
            <button className="kanit text-black py-2 px-4">
              {t('createTrip')}
            </button>
            <button className="kanit text-black py-2 px-4">
              {t('myTrip')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
