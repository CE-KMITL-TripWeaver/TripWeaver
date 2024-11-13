"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from "next/link";
import { useSession, signOut } from 'next-auth/react';

export default function NavBar() {
  const t = useTranslations();
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex w-full px-20 py-3 bg-white">
      <div className="flex flex-row items-center justify-between w-full">
        <Link href="/" passHref>
            <Image
              src="https://img2.pic.in.th/pic/tripweaver-high-resolution-logo-transparent.png"
              alt="TripWeaver Logo"
              unoptimized
              width={200}
              height={200}
            />
        </Link>

        <div className="flex w-[45%] px-10">
          <div className="flex rounded-3xl overflow-hidden w-full font-[sans-serif] shadow-lg">
            <input
              type="text"
              placeholder={"ค้นหาสถานที่ท่องเที่ยว, ที่พัก และ ร้านอาหาร"}
              className="w-full outline-none bg-[#F0F0F0] text-sm px-5 py-3"
            />
            <button
              type="button"
              className="flex items-center justify-center bg-[#F0F0F0] px-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="18px"
                className="fill-black"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/plantrip" passHref>
            <button className="kanit font-bold text-black py-2 px-4">
              {t('Navbar.createTrip')}
            </button>
          </Link>
          <button className="kanit font-bold text-black py-2 px-4">
            {t('Navbar.myTrip')}
          </button>

          {session ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleDropdownToggle}
                className="kanit font-bold text-black py-2 px-4 flex items-center space-x-2 border-2 rounded-xl"
              >
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="User Profile"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2" />
                      <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6" />
                    </g>
                  </svg>
                )}
                <span>{session?.user?.name}</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                  <Link href="/profile" passHref>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 kanit">
                      โปรไฟล์ของฉัน
                    </button>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 kanit"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" passHref>
              <button className="kanit font-bold text-black py-2 px-4 flex items-center space-x-2 border-2 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2" />
                    <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6" />
                  </g>
                </svg>
                <span>{t('Navbar.login')}</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
