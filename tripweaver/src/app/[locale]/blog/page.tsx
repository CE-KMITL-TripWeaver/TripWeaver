"use client";
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import SearchComponent from "../components/SearchComponent";
import CheckBoxComponent from "../components/CheckBoxComponent";
import GuideTagCheckBoxComponent from "../components/GuideTagCheckBoxComponent";
import District from "../interface/district";
import Tags from "../interface/tags";
import axios from "axios";

const blogPosts = [
  {
    id: 1,
    title: "เที่ยวภูเก็ต",
    tags: ["แหล่งท่องเที่ยว", "ธรรมชาติ", "ชายหาด"],
    excerpt: "This is the excerpt for post 1.",
    image:
      "https://www.paradise-kohyao.com/wp-content/uploads/2024/07/1.-%E0%B9%81%E0%B8%AB%E0%B8%A5%E0%B8%A1%E0%B8%9E%E0%B8%A3%E0%B8%AB%E0%B8%A1%E0%B9%80%E0%B8%97%E0%B8%9E.webp",
    user: "John Doe",
    date: "2023-08-01",
    views: 120,
    likes: 30,
  },
  {
    id: 2,
    title: "3 วัน 2 คืน ทริปภูเก็ต",
    tags: ["ถนนคนเดิน", "วัฒนธรรม", "อาหาร"],
    excerpt: "This is the excerpt for post 2.",
    image:
      "https://www.paradise-kohyao.com/wp-content/uploads/2024/07/2.-%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%81%E0%B9%88%E0%B8%B2%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95.webp",
    user: "Tom Smith",
    date: "2023-08-02",
    views: 150,
    likes: 45,
  },
  {
    id: 3,
    title: "กินลมชมวิวที่ภูเก็ต",
    tags: ["ภูเขา", "วัด", "อาหาร"],
    excerpt: "This is the excerpt for post 3.",
    image:
      "https://www.paradise-kohyao.com/wp-content/uploads/2024/07/4.-%E0%B8%88%E0%B8%B8%E0%B8%94%E0%B8%8A%E0%B8%A1%E0%B8%A7%E0%B8%B4%E0%B8%A7-%E0%B8%9C%E0%B8%B2%E0%B8%AB%E0%B8%B4%E0%B8%99%E0%B8%94%E0%B9%8D%E0%B8%B2.webp",
    user: "Ying Lee",
    date: "2023-08-03",
    views: 200,
    likes: 60,
  },
  {
    id: 4,
    title: "เที่ยวสายธรรม ณ ภูเก็ต",
    tags: ["ประวัติศาสตร์", "วัฒนธรรม", "วัด"],
    excerpt: "This is the excerpt for post 4.",
    image:
      "https://www.paradise-kohyao.com/wp-content/uploads/2024/07/5.-%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%89%E0%B8%A5%E0%B8%AD%E0%B8%87.webp",
    user: "golf1245",
    date: "2023-08-04",
    views: 180,
    likes: 50,
  },
  {
    id: 5,
    title: "ภูเก็ตรวมชายหาด",
    tags: ["ชายหาด", "ธรรมชาติ"],
    excerpt: "This is the excerpt for post 5.",
    image:
      "https://www.paradise-kohyao.com/wp-content/uploads/2024/07/6.-%E0%B8%AB%E0%B8%B2%E0%B8%94%E0%B8%9B%E0%B9%88%E0%B8%B2%E0%B8%95%E0%B8%AD%E0%B8%87.webp",
    user: "harrypotter",
    date: "2023-08-05",
    views: 220,
    likes: 70,
  },
];

export default function Home() {
  const t = useTranslations();

  const [selectedProvince, setSelectedProvince] = useState("ภูเก็ต");

  const [tagsList, setTagList] = useState<Tags[]>([]);

  const handleProvinceSelect = (province: string) => {
    setSelectedProvince(province);
  };

  const handleTag = (tags: Tags[]) => {
    setTagList(tags);
  };

  const fetchBlogAllData = async () => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog/getBlog`);
    console.log(data);
  };

  useEffect(() => {
    fetchBlogAllData();
    const fetchData = async () => {
      try {
        const response = await axios.post( `${process.env.NEXT_PUBLIC_API_URL}/attraction/tags`);

        const tagWithDefaultSelected = response.data.attractionTagKeys.map(
          (tag: Tags) => ({
            name: tag,
            selected: false,
          })
        );

        setTagList(tagWithDefaultSelected);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col bg-[#F4F4F4] w-full h-full">
        <NavBar />
        <div className="flex px-20 mt-10 flex-col">
          <div className="flex flex-row text-lg">
            <div className="kanit">{t("AttractionPages.infoMain")}</div>
            <div className="kanit font-bold">บล็อกการท่องเที่ยว</div>
          </div>
          <div className="flex w-full flex-row justify-end">
            <div className="flex flex-row mr-5">
              <SearchComponent
                defaultValue={selectedProvince}
                onProvinceSelect={handleProvinceSelect}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col px-20">
          <div className="flex justify-end pt-4">
            <button className="kanit bg-orange-500 text-white text-bold p-2 rounded-lg hover:bg-orange-600 duration-200">
              <a href="http://localhost:3000/th/blog/create">สร้างบล็อก</a>
            </button>
          </div>
          <h1 className="kanit text-xl font-bold mb-2 ">บล็อกมาแรง</h1>
          <div className="kanit grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {blogPosts.slice(0, 5).map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
              >
                <a href={`/blog/post/${post.id}`}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={300}
                    height={150}
                    unoptimized
                    className="rounded-lg"
                  />
                  <div className="flex gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-orange-100 text-orange-400 px-3 py-1 rounded-full text-sm font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold mt-4">{post.title}</h2>
                  <p className="text-gray-600 mt-2">{post.excerpt}</p>
                  <span className="text-gray-500">{post.date}</span>
                  <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-1">
                      <Icon icon="mdi:eye-outline" className="text-gray-500" />
                      <span className="text-gray-500">{post.views}</span>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <Icon
                        icon="mdi:heart-outline"
                        className="text-gray-500"
                      />
                      <span className="text-gray-500">{post.likes}</span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div className="flex flex-row mb-64">
            <div className="flex flex-col w-[15%]">
              <div className="flex kanit text-center text-xl font-bold mb-2 pt-8">
                {t("AttractionPages.filter")}
              </div>
              <div className="flex mb-5 ">
                <GuideTagCheckBoxComponent
                  tagsList={tagsList}
                  onCheckBoxSelect={handleTag}
                />
              </div>
            </div>
            <div className="flex flex-col w-[85%] ml-8">
              <h1 className="kanit text-xl font-bold mb-2 pt-8">บล็อกใหม่</h1>
              <div className="flex flex-col gap-y-2">
                {[...blogPosts].reverse().map((post) => (
                  <div
                    key={post.id}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
                  >
                    <a href={`/blog/post/${post.id}`}>
                      <div className="flex">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={200}
                          height={100}
                          unoptimized
                          className="rounded-lg"
                        />
                        <div className="kanit ml-4 flex flex-col justify-between">
                          <div>
                            <h2 className="text-2xl font-bold mt-4">
                              {post.title}
                            </h2>
                            <div className="flex gap-2 mt-2">
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-orange-100 text-orange-400 px-3 py-1 rounded-full text-sm font-bold"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <p className="text-gray-600 mt-2">{post.excerpt}</p>
                          </div>
                          <div className="flex items-center mt-4">
                            <span className="text-gray-500">{post.date}</span>
                            <div className="flex items-center gap-x-4 ml-4">
                              <div className="flex items-center gap-x-1">
                                <Icon
                                  icon="mdi:eye-outline"
                                  className="text-gray-500"
                                />
                                <span className="text-gray-500">
                                  {post.views}
                                </span>
                              </div>
                              <div className="flex items-center gap-x-1">
                                <Icon
                                  icon="mdi:heart-outline"
                                  className="text-gray-500"
                                />
                                <span className="text-gray-500">
                                  {post.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
