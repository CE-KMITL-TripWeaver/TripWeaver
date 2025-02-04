"use client";
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import SearchComponent from "../components/SearchComponent";
import GuideTagCheckBoxComponent from "../components/GuideTagCheckBoxComponent";
import { format } from "date-fns";
import Tags from "../interface/tags";
import axios from "axios";

export default function Home() {
  const t = useTranslations();

  interface BlogData {
    _id: string;
    blogName: string;
    blogImage: string;
    blogCreator: string;
    blogViews: number;
    blogLikes: number;
    description: string;
    tags: string[];
    createdAt: string;
  }

  const [selectedProvince, setSelectedProvince] = useState("ภูเก็ต");

  const [tagsList, setTagList] = useState<Tags[]>([]);
  const [blogList, setBlogList] = useState<BlogData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  const handleProvinceSelect = (province: string) => {
    setSelectedProvince(province);
  };

  const handleTag = (tags: Tags[]) => {
    setTagList(tags);
  };

  const fetchBlogAllData = async () => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog/getBlog`);
    console.log(data);
    setBlogList(data.map((blog: BlogData) => ({
      _id: blog._id,
      blogName: blog.blogName,
      blogImage: blog.blogImage,
      blogCreator: blog.blogCreator,
      blogViews: blog.blogViews,
      blogLikes: blog.blogLikes,
      description: blog.description,
      tags: blog.tags,
      createdAt: format(new Date(blog.createdAt), "yyyy-MM-dd HH:mm"),
    })));
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
            {blogList.slice(0, 5).map((post) => (
              <div
                key={post._id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
              >
                <a href={`/blog/post/${post._id}`}>
                  <Image
                    src={post.blogImage}
                    alt={post.blogName}
                    width={300}
                    height={100}
                    unoptimized
                    className="rounded-lg w-[100%] h-[200px]"
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
                  <h2 className="text-2xl font-bold mt-4 overflow-hidden text-ellipsis whitespace-nowrap">{post.blogName}</h2>
                  <p className="text-gray-600 mt-2 overflow-hidden text-ellipsis whitespace-nowrap">{post.description}</p>
                  <span className="text-gray-500">{post.createdAt}</span>
                  <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-1">
                      <Icon icon="mdi:eye-outline" className="text-gray-500" />
                      <span className="text-gray-500">{post.blogViews}</span>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <Icon
                        icon="mdi:heart-outline"
                        className="text-gray-500"
                      />
                      <span className="text-gray-500">{post.blogLikes}</span>
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
                {[...blogList].reverse().map((post) => (
                  <div
                    key={post._id}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:shadow-orange-500/50 duration-200"
                  >
                    <a href={`/blog/post/${post._id}`}>
                      <div className="flex">
                        <Image
                          src={post.blogImage}
                          alt={post.blogName}
                          width={200}
                          height={100}
                          unoptimized
                          className="rounded-lg"
                        />
                        <div className="kanit ml-4 flex flex-col justify-between">
                          <div>
                            <h2 className="text-2xl font-bold mt-4">
                              {post.blogName}
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
                            <p className="text-gray-600 mt-2">{post.description}</p>
                          </div>
                          <div className="flex items-center mt-4">
                            <span className="text-gray-500">{post.createdAt}</span>
                            <div className="flex items-center gap-x-4 ml-4">
                              <div className="flex items-center gap-x-1">
                                <Icon
                                  icon="mdi:eye-outline"
                                  className="text-gray-500"
                                />
                                <span className="text-gray-500">
                                  {post.blogViews}
                                </span>
                              </div>
                              <div className="flex items-center gap-x-1">
                                <Icon
                                  icon="mdi:heart-outline"
                                  className="text-gray-500"
                                />
                                <span className="text-gray-500">
                                  {post.blogLikes}
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
