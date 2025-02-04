"use client";
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import CheckboxElement from "../interface/checkboxElement";
import TagCheckBoxComponent from "../components/TagCheckBoxComponent";
import axios from "axios";
import { url } from "inspector";
import { t } from "i18next";

const profile = {
  name: "Panat Inwza007",
  displayName: "Xsectorz",
  image: "https://img2.pic.in.th/pic/panat.jpg",
  point: 100,
};

const recentTrip = [
  {
    name: "ไต๋ผจญภัย 1",
    image:
      "https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/05/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-2024-05-20T120256.309.png",
    id: 1,
  },
  {
    name: "ไต๋ผจญภัย 2",
    image:
      "https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/05/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-2024-05-20T120256.309.png",
    id: 2,
  },
  {
    name: "ไต๋ผจญภัย 3",
    image:
      "https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/05/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-2024-05-20T120256.309.png",
    id: 3,
  },
  {
    name: "ไต๋ผจญภัย 4",
    image:
      "https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/05/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-2024-05-20T120256.309.png",
    id: 4,
  },
  {
    name: "ไต๋ผจญภัย 5",
    image:
      "https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/05/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-2024-05-20T120256.309.png",
    id: 5,
  },
  {
    name: "ไต๋ผจญภัย 6",
    image:
      "https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/05/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-2024-05-20T120256.309.png",
    id: 6,
  },
  {
    name: "ไต๋ผจญภัย 7",
    image:
      "https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/05/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-2024-05-20T120256.309.png",
    id: 7,
  },
  {
    name: "ไต๋ผจญภัย 8",
    image:
      "https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/05/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-2024-05-20T120256.309.png",
    id: 8,
  },
];

const placeRequests = [
  {
    id: 1,
    placeName: "ลุงโล่ตามสั่ง",
    type: "add",
    status: "Pending",
    dateRequested: "2023-10-01",
  },
  {
    id: 2,
    placeName: "แหลมพรหมเทพ",
    type: "edit",
    status: "Approved",
    dateRequested: "2023-09-25",
  },
  {
    id: 3,
    placeName: "ลุงโล่ตามสั่ง",
    type: "add",
    status: "Rejected",
    dateRequested: "2023-09-20",
  },
];

const recentBlog = [
  {
    name: "ไต๋พาเที่ยว 1",
    image:
      "https://roijang.com/wp-content/uploads/2023/04/%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95-2.jpg",
    id: 1,
  },
  {
    name: "ไต๋พาเที่ยว 2",
    image:
      "https://roijang.com/wp-content/uploads/2023/04/%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95-2.jpg",
    id: 2,
  },
  {
    name: "ไต๋พาเที่ยว 3",
    image:
      "https://roijang.com/wp-content/uploads/2023/04/%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95-2.jpg",
    id: 3,
  },
  {
    name: "ไต๋พาเที่ยว 4",
    image:
      "https://roijang.com/wp-content/uploads/2023/04/%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95-2.jpg",
    id: 4,
  },
  {
    name: "ไต๋พาเที่ยว 5",
    image:
      "https://roijang.com/wp-content/uploads/2023/04/%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95-2.jpg",
    id: 5,
  },
  {
    name: "ไต๋พาเที่ยว 6",
    image:
      "https://roijang.com/wp-content/uploads/2023/04/%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95-2.jpg",
    id: 6,
  },
  {
    name: "ไต๋พาเที่ยว 7",
    image:
      "https://roijang.com/wp-content/uploads/2023/04/%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95-2.jpg",
    id: 7,
  },
  {
    name: "ไต๋พาเที่ยว 8",
    image:
      "https://roijang.com/wp-content/uploads/2023/04/%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95-2.jpg",
    id: 8,
  },
];

const favoritePlace = [
  {
    name: "ลุงโล่ตามสั่ง",
    image:
      "https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/05/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-2024-05-20T120256.309.png",
    id: 1,
  },
  {
    name: "แหลมพรหมเทพ",
    image:
      "https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/05/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-2024-05-20T120256.309.png",
    id: 2,
  },
];

const Sidebar = ({
  setSelectedContent,
}: {
  setSelectedContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="sidebar w-20 h-[calc(100vh-68px)] bg-gray-200 text-gray-800 flex flex-col p-4 transition-all duration-300">
      <ul className="space-y-2 h-screen">
        <li className="relative group">
          <div
            onClick={() => setSelectedContent("profile")}
            className="hover:bg-gray-700 hover:text-white p-2 rounded flex items-center justify-center"
          >
            <Icon
              icon="mdi:account"
              width="24"
              height="24"
              className="flex-shrink-0"
            />
            <span className="kanit text-lg ml-6 transition-opacity duration-300 absolute left-full whitespace-nowrap bg-orange-200 p-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:bg-gray-700">
              โปรไฟล์
            </span>
          </div>
        </li>
        <li className="relative group">
          <div
            onClick={() => setSelectedContent("trip")}
            className="hover:bg-gray-700 hover:text-white p-2 rounded flex items-center justify-center"
          >
            <Icon
              icon="material-symbols:trip"
              width="24"
              height="24"
              className="flex-shrink-0"
            />
            <span className="kanit text-lg ml-6 transition-opacity duration-300 absolute left-full whitespace-nowrap bg-orange-200 p-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:bg-gray-700">
              ทริปของฉัน
            </span>
          </div>
        </li>
        <li className="relative group">
          <div
            onClick={() => setSelectedContent("blog")}
            className="hover:bg-gray-700 hover:text-white p-2 rounded flex items-center justify-center"
          >
            <Icon
              icon="mdi:blog"
              width="24"
              height="24"
              className="flex-shrink-0"
            />
            <span className="kanit text-lg ml-6 transition-opacity duration-300 absolute left-full whitespace-nowrap bg-orange-200 p-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:bg-gray-700">
              บล็อกของฉัน
            </span>
          </div>
        </li>
        <li className="relative group">
          <div
            onClick={() => setSelectedContent("favorite")}
            className="hover:bg-gray-700 hover:text-white p-2 rounded flex items-center justify-center"
          >
            <Icon
              icon="mdi:heart"
              width="24"
              height="24"
              className="flex-shrink-0"
            />
            <span className="kanit text-lg ml-6 transition-opacity duration-300 absolute left-full whitespace-nowrap bg-orange-200 p-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:bg-gray-700">
              สถานที่ที่ชื่นชอบ
            </span>
          </div>
        </li>
        
        <li className="relative group">
          <div
            onClick={() => setSelectedContent("places")}
            className="hover:bg-gray-700 hover:text-white p-2 rounded flex items-center justify-center"
          >
            <Icon
              icon="ic:baseline-place"
              width="24"
              height="24"
              className="flex-shrink-0"
            />
            <span className="kanit text-lg ml-6 transition-opacity duration-300 absolute left-full whitespace-nowrap bg-orange-200 p-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:bg-gray-700">
              คำขอเพิ่ม/แก้ไขสถานที่
            </span>
          </div>
        </li>
        <li className="relative group">
          <div
            onClick={() => setSelectedContent("interests")}
            className="hover:bg-gray-700 hover:text-white p-2 rounded flex items-center justify-center"
          >
            <Icon
              icon="typcn:point-of-interest-outline"
              width="24"
              height="24"
              className="flex-shrink-0"
            />
            <span className="kanit text-lg ml-6 transition-opacity duration-300 absolute left-full whitespace-nowrap bg-orange-200 p-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:bg-gray-700">
              แก้ไขความสนใจ
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

const ProfileContent = () => (
  <div className="flex">
    {/* information */}
    <div className="flex flex-col items-center kanit border-2 border-gray-200 rounded-md mt-8 ml-8 gap-y-2 p-8 shadow-lg">
      <div className="mt-3">
        <Image
          src={profile.image}
          alt={profile.name}
          width={256}
          height={256}
          unoptimized
          className="rounded-full"
        />
      </div>
      <div className="flex kanit font-bold text-2xl">{profile.name}</div>
      <div className="flex kanit text-xl">@{profile.displayName}</div>
      <div className="flex mt-2 gap-x-2">
        <button className="kanit bg-[#EE6527] hover:bg-[#DDDDDD] hover:text-black text-white px-4 rounded-full font-regular h-8 flex items-center space-x-2">
          <Icon icon="mdi:pencil" />
          <span>แก้ไข</span>
        </button>
        <button className="kanit bg-[#EE6527] hover:bg-[#DDDDDD] hover:text-black text-white px-4 rounded-full font-regular h-8 flex items-center space-x-2">
          <Icon icon="fa:share" />
          <span>แชร์</span>
        </button>
      </div>
      <div className="flex kanit text-xl mt-4">
        Weaver Point : {profile.point}
      </div>
    </div>
    {/* activity */}
    <div className="flex flex-col">
      {/* trip */}
      <div className="flex flex-col mt-8 ml-2  p-2 h-fit">
        <div className="flex kanit text-2xl font-bold">ทริปล่าสุด</div>
        <div className="flex mt-2">
          {recentTrip.slice(0, 4).map((trip, index) => (
            <a
              key={index}
              href={`/trip/${trip.id}`}
              className="m-3 p-3 shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
            >
              <Image
                src={trip.image}
                alt={trip.name}
                width={256}
                height={256}
                unoptimized
                className="h-36 rounded-lg"
              />
              <div className="flex kanit text-lg mt-3">{trip.name}</div>
            </a>
          ))}
          <a
            href="#"
            className="m-3 p-3 shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
          >
            <div className="flex kanit justify-center items-center bg-gray-300 text-2xl w-36 h-36 rounded-lg hover:text-4xl duration-200">
              <Icon icon="grommet-icons:form-next" />
            </div>
            <div className="flex kanit text-lg mt-3">ดูเพิ่มเติม</div>
          </a>
        </div>
      </div>
      {/* blog */}
      <div className="flex flex-col mt-8 ml-2  p-2 h-fit">
        <div className="flex kanit text-2xl font-bold">บล็อกล่าสุด</div>
        <div className="flex mt-2">
          {recentBlog.slice(0, 4).map((blog, index) => (
            <a
              key={index}
              href={`#/trip/${blog.id}`}
              className="m-3 p-3 shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
            >
              <Image
                src={blog.image}
                alt={blog.name}
                width={256}
                height={256}
                unoptimized
                className="h-36 rounded-lg"
              />
              <div className="flex kanit text-lg mt-3">{blog.name}</div>
            </a>
          ))}
          <a
            href={`#`}
            className="m-3 p-3 shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
          >
            <div className="flex kanit justify-center items-center bg-gray-300 text-2xl w-36 h-36 rounded-lg hover:text-4xl duration-200">
              <Icon icon="grommet-icons:form-next" />
            </div>
            <div className="flex kanit text-lg mt-3">ดูเพิ่มเติม</div>
          </a>
        </div>
      </div>
    </div>
  </div>
);

const TripContent = ({
  tagsList,
  handleTag,
}: {
  tagsList: CheckboxElement[];
  handleTag: (tags: CheckboxElement[]) => void;
}) => (
  <div className="flex kanit rounded-md mt-8 ml-4">
    <div className="flex mb-5 mt-[19px] h-fit">
    <TagCheckBoxComponent maxHeight={320} element={tagsList} translationTagTitle={"AttractionPages.title_tags"} onCheckBoxSelect={handleTag} translationPrefix={"Tags."}/>
    </div>
    <div className="flex flex-col">
      <div className="flex justify-between items-end">
        <div className="flex kanit font-bold text-2xl ml-5">ทริปของฉัน</div>
        <input
          type="text"
          placeholder="ค้นหาทริปของฉัน"
          className="p-2 border-2 border-gray-200 rounded-md mr-5"
        />
      </div>
      <div className="grid grid-cols-5 gap-4 mt-2 ml-8">
        {recentTrip.map((trip, index) => (
          <a
            key={index}
            href={`#/trip/${trip.id}`}
            className="m-3 p-3 shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
          >
            <Image
              src={trip.image}
              alt={trip.name}
              width={256}
              height={256}
              unoptimized
              className="h-36 rounded-lg"
            />
            <div className="flex kanit text-lg mt-3">{trip.name}</div>
          </a>
        ))}
      </div>
    </div>
  </div>
);

const BlogContent = ({
  tagsList,
  handleTag,
}: {
  tagsList: CheckboxElement[];
  handleTag: (tags: CheckboxElement[]) => void;
}) => (
  <div className="flex kanit rounded-md mt-8 ml-4">
    <div className="flex mb-5 mt-[19px] h-fit">
    <TagCheckBoxComponent maxHeight={320} element={tagsList} translationTagTitle={"AttractionPages.title_tags"} onCheckBoxSelect={handleTag} translationPrefix={"Tags."}/>
    </div>
    <div className="flex flex-col">
      <div className="flex justify-between items-end">
        <div className="flex kanit font-bold text-2xl ml-5">บล็อกของฉัน</div>
        <input
          type="text"
          placeholder="ค้นหาบล็อกของฉัน"
          className="p-2 border-2 border-gray-200 rounded-md mr-5"
        />
      </div>
      <div className="grid grid-cols-5 gap-4 mt-2 ml-8">
        {recentBlog.map((blog, index) => (
          <a
            key={index}
            href={`#/trip/${blog.id}`}
            className="m-3 p-3 shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
          >
            <Image
              src={blog.image}
              alt={blog.name}
              width={256}
              height={256}
              unoptimized
              className="h-36 rounded-lg"
            />
            <div className="flex kanit text-lg mt-3">{blog.name}</div>
          </a>
        ))}
      </div>
    </div>
  </div>
);

const FavoriteContent = ({
  tagsList,
  handleTag,
}: {
  tagsList: CheckboxElement[];
  handleTag: (tags: CheckboxElement[]) => void;
}) => (
  <div className="flex kanit rounded-md mt-8 ml-4">
    <div className="flex mb-5 mt-[19px] h-fit">
    <TagCheckBoxComponent maxHeight={320} element={tagsList} translationTagTitle={"AttractionPages.title_tags"} onCheckBoxSelect={handleTag} translationPrefix={"Tags."}/>
    </div>
    <div className="flex flex-col">
      <div className="flex justify-between items-end">
        <div className="flex kanit font-bold text-2xl ml-5">สถานที่ที่ชื่นชอบ</div>
        <input
          type="text"
          placeholder="ค้นหาบล็อกของฉัน"
          className="p-2 border-2 border-gray-200 rounded-md mr-5"
        />
      </div>
      <div className="grid grid-cols-5 gap-4 mt-2 ml-8">
        {favoritePlace.map((favorite, index) => (
          <a
            key={index}
            href={`#/trip/${favorite.id}`}
            className="m-3 p-3 shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
          >
            <Image
              src={favorite.image}
              alt={favorite.name}
              width={256}
              height={256}
              unoptimized
              className="h-36 rounded-lg"
            />
            <div className="flex kanit text-lg mt-3">{favorite.name}</div>
          </a>
        ))}
      </div>
    </div>
  </div>
);

const PlacesContent = () => (
  <div className="flex flex-col ml-4 mt-8">
    <div className="flex kanit font-bold text-2xl mb-4">
      คำขอเพิ่ม/แก้ไขสถานที่
    </div>
    <div className="mt-4 w-full">
      <table className="bg-white kanit w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">ชื่อสถานที่</th>
            <th className="py-2 px-4 border-b text-left">ประเภท</th>
            <th className="py-2 px-4 border-b text-left">สถานะ</th>
            <th className="py-2 px-4 border-b text-left">วันที่ส่งคำขอ</th>
          </tr>
        </thead>
        <tbody>
          {placeRequests.map((request) => (
            <tr key={request.id}>
              <td className="py-2 px-4 border-b">{request.placeName}</td>
              <td className="py-2 px-4 border-b">
                {request.type === "add" ? "เพิ่มสถานที่" : "แก้ไขสถานที่"}
              </td>
              <td
                className={`py-2 px-4 border-b ${
                  request.status === "Approved"
                    ? "text-green-500"
                    : request.status === "Pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {request.status === "Approved"
                  ? "สำเร็จ"
                  : request.status === "Pending"
                  ? "รอดำเนินการ"
                  : request.status === "Rejected"
                  ? "ปฎิเสธคำขอ"
                  : request.status}
              </td>
              <td className="py-2 px-4 border-b">{request.dateRequested}</td>
              <td className="py-2 px-4 border-b flex gap-x-2">
                <button className="kanit bg-[#EE6527] hover:bg-[#DDDDDD] hover:text-black text-white px-4 rounded-full font-regular h-8 flex items-center space-x-2">
                  <Icon icon="mdi:pencil" />
                  <span>แก้ไข</span>
                </button>
                <button className="kanit bg-[#EE6527] hover:bg-[#DDDDDD] hover:text-black text-white px-4 rounded-full font-regular h-8 flex items-center space-x-2">
                  <Icon icon="mdi:close" />
                  <span>ยกเลิกคำขอ</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const InterestsContent = () => (
  <div className="flex flex-col items-center kanit border-2 border-gray-200 rounded-md mt-8 ml-8 gap-y-2 p-8">
    <div className="flex kanit font-bold text-2xl">Interests Content</div>
  </div>
);

export default function Profile() {
  const t = useTranslations();
  const [tripTagsList, setTripTagList] = useState<CheckboxElement[]>([]);
  const [blogTagsList, setBlogTagList] = useState<CheckboxElement[]>([]);
  const handleTripTag = (tags: CheckboxElement[]) => {
    setTripTagList(tags);
  };
  const handleBlogTag = (tags: CheckboxElement[]) => {
    setBlogTagList(tags);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/attraction/tags"
        );

        const tagWithDefaultSelected = response.data.attractionTagKeys.map(
          (tag: CheckboxElement) => ({
            name: tag,
            selected: false,
          })
        );

        setTripTagList(tagWithDefaultSelected);
        setBlogTagList(tagWithDefaultSelected);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [selectedContent, setSelectedContent] = useState("profile");

  const renderContent = () => {
    switch (selectedContent) {
      case "profile":
        return <ProfileContent />;
      case "trip":
        return (
          <TripContent tagsList={tripTagsList} handleTag={handleTripTag} />
        );
      case "blog":
        return (
          <BlogContent tagsList={blogTagsList} handleTag={handleBlogTag} />
        );
      case "favorite":
        return <FavoriteContent tagsList={blogTagsList} handleTag={handleBlogTag} />;
      case "places":
        return <PlacesContent />;
      case "interests":
        return <InterestsContent />;
      default:
        return <ProfileContent />;
    }
  };

  return (
    <>
      <div className="flex flex-col bg-[#F4F4F4] w-full h-full">
        <NavBar />
        <div className="flex flex-row">
          <Sidebar setSelectedContent={setSelectedContent} />
          <div className="p-4 h-full">{renderContent()}</div>
        </div>
      </div>
    </>
  );
}
