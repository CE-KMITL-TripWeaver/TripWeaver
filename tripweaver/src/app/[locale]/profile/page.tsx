"use client";
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import Tags from "../interface/tags";
import TagCheckBoxComponent from "../components/TagCheckBoxComponent";
import axios from "axios";

const profile = {
  name: "Panat Inwza007",
  displayName: "Xsectorz",
  image: "https://img2.pic.in.th/pic/panat.jpg",
  point: 100,
};

const Sidebar = ({
  setSelectedContent,
}: {
  setSelectedContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="sidebar w-20 h-[calc(100vh-68px)] bg-gray-200 text-gray-800 flex flex-col p-4 transition-all duration-300">
      <ul className="space-y-2 h-screen">
        <li className="relative group">
          <a
            href="#"
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
          </a>
        </li>
        <li className="relative group">
          <a
            href="#"
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
              ทริป
            </span>
          </a>
        </li>
        <li className="relative group">
          <a
            href="#"
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
              บล็อก
            </span>
          </a>
        </li>
        <li className="relative group">
          <a
            href="#"
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
              เพิ่ม/แก้ไขสถานที่
            </span>
          </a>
        </li>
        <li className="relative group">
          <a
            href="#"
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
          </a>
        </li>
      </ul>
    </div>
  );
};

const ProfileContent = () => (
  <div className="flex">
    {/* information */}
    <div className="flex flex-col items-center kanit border-2 border-gray-200 rounded-md mt-8 ml-8 gap-y-2 p-8">
      <div className="m-3">
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
          <div className="flex">
            <a
              href="#"
              className="m-3 p-3 shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
            >
              <Image
                src={profile.image}
                alt={profile.name}
                width={256}
                height={256}
                unoptimized
                className="h-36 rounded-lg"
              />
              <div className="flex kanit text-lg mt-3">ไต๋ผจญภัย 1</div>
            </a>
            <a
              href="#"
              className="m-3 p-3 shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
            >
              <Image
                src={profile.image}
                alt={profile.name}
                width={256}
                height={256}
                unoptimized
                className="h-36 rounded-lg"
              />
              <div className="flex kanit text-lg mt-3">ไต๋ผจญภัย 2</div>
            </a>
            <a
              href="#"
              className="m-3 p-3 shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
            >
              <Image
                src={profile.image}
                alt={profile.name}
                width={256}
                height={256}
                unoptimized
                className="h-36 rounded-lg"
              />
              <div className="flex kanit text-lg mt-3">ไต๋ผจญภัย 3</div>
            </a>
            <a
              href="#"
              className="m-3 p-3 shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
            >
              <Image
                src={profile.image}
                alt={profile.name}
                width={256}
                height={256}
                unoptimized
                className="h-36 rounded-lg"
              />
              <div className="flex kanit text-lg mt-3">ไต๋ผจญภัย 4</div>
            </a>
            <a
              href="#"
              className="m-3 p-3 shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
            >
              <div className="flex kanit justify-center items-center bg-gray-300 text-2xl w-36 h-36 rounded-lg">
                <Icon icon="grommet-icons:form-next" />
              </div>
              <div className="flex kanit text-lg mt-3">ดูเพิ่มเติม</div>
            </a>
          </div>
        </div>
      </div>
      {/* blog */}
      <div className="flex flex-col mt-8 ml-2  p-2 h-fit">
        <div className="flex kanit text-2xl font-bold">บล็อกล่าสุด</div>
        <div className="flex mt-2">
          <div className="flex">
            <a
              href="#"
              className="m-3 p-3 shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
            >
              <Image
                src={profile.image}
                alt={profile.name}
                width={256}
                height={256}
                unoptimized
                className="h-36 rounded-lg"
              />
              <div className="flex kanit text-lg mt-3">ไต๋พาเที่ยว 1</div>
            </a>
            <a
              href="#"
              className="m-3 p-3 shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
            >
              <Image
                src={profile.image}
                alt={profile.name}
                width={256}
                height={256}
                unoptimized
                className="h-36 rounded-lg"
              />
              <div className="flex kanit text-lg mt-3">ไต๋พาเที่ยว 2</div>
            </a>
            <a
              href="#"
              className="m-3 p-3 shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
            >
              <Image
                src={profile.image}
                alt={profile.name}
                width={256}
                height={256}
                unoptimized
                className="h-36 rounded-lg"
              />
              <div className="flex kanit text-lg mt-3">ไต๋พาเที่ยว 3</div>
            </a>
            <a
              href="#"
              className="m-3 p-3 shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
            >
              <Image
                src={profile.image}
                alt={profile.name}
                width={256}
                height={256}
                unoptimized
                className="h-36 rounded-lg"
              />
              <div className="flex kanit text-lg mt-3">ไต๋พาเที่ยว 4</div>
            </a>
            <a
              href="#"
              className="m-3 p-3 shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
            >
              <div className="flex kanit justify-center items-center bg-gray-300 text-2xl w-36 h-36 rounded-lg">
                <Icon icon="grommet-icons:form-next" />
              </div>
              <div className="flex kanit text-lg mt-3">ดูเพิ่มเติม</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TripContent = ({
  tagsList,
  handleTag,
}: {
  tagsList: Tags[];
  handleTag: (tags: Tags[]) => void;
}) => (
  <div className="flex flex-col items-center kanit rounded-md mt-8 ml-8">
    <div className="flex mb-5">
      <TagCheckBoxComponent tagsList={tagsList} onCheckBoxSelect={handleTag} />
    </div>
  </div>
);

const BlogContent = () => (
  <div className="flex flex-col items-center kanit border-2 border-gray-200 rounded-md mt-8 ml-8 gap-y-2 p-8">
    <div className="flex kanit font-bold text-2xl">Blog Content</div>
  </div>
);

const PlacesContent = () => (
  <div className="flex flex-col items-center kanit border-2 border-gray-200 rounded-md mt-8 ml-8 gap-y-2 p-8">
    <div className="flex kanit font-bold text-2xl">Places Content</div>
  </div>
);

const InterestsContent = () => (
  <div className="flex flex-col items-center kanit border-2 border-gray-200 rounded-md mt-8 ml-8 gap-y-2 p-8">
    <div className="flex kanit font-bold text-2xl">Interests Content</div>
  </div>
);

export default function Profile() {
  const t = useTranslations();
  const [tagsList, setTagList] = useState<Tags[]>([]);
  const handleTag = (tags: Tags[]) => {
    setTagList(tags);
  };

  useEffect(() => {

    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/attraction/tags');

            const tagWithDefaultSelected = response.data.attractionTagKeys.map((tag: Tags) => ({
                name: tag,
                selected: false,
            }));
            
            setTagList(tagWithDefaultSelected)

        } catch(error) {
            console.error('Error fetching data:', error);
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
        return <TripContent tagsList={tagsList} handleTag={handleTag} />;
      case "blog":
        return <BlogContent />;
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
