"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "@/app/[locale]/components/NavBar";
import { useTranslations } from "next-intl";

export default function BlogPost() {
  const { id } = useParams();
  const t = useTranslations();
  interface BlogData {
    blogName: string;
    blogImage: string;
    description: string;
    content: string;
    tags: string[];
  }

  const updateBlogView = async () => {
    const viewedBlogs = JSON.parse(localStorage.getItem("viewedBlogs") || "[]");

    if (!viewedBlogs.includes(id)) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blog/updateView`, { blogId: id });
        viewedBlogs.push(id);
        localStorage.setItem("viewedBlogs", JSON.stringify(viewedBlogs));
      } catch (error) {
        console.error("Error updating blog view count:", error);
      }
    }
  };

  const [blogData, setBlogData] = useState<BlogData>();

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/getBlog/${id}`
      );
      setBlogData(data.blog);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
    updateBlogView();
  }, [id]);

  useEffect(() => {
    if (blogData) {
      // console.log(blogData);
    }
  }, [blogData]);

  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col bg-[#F4F4F4] w-full h-full">
      <NavBar />
      <div className="flex px-20 mt-10 flex-col">
        <div className="flex flex-row text-lg">
          <div className="kanit">{t("AttractionPages.infoMain")}</div>
          <div className="kanit">บล็อกการท่องเที่ยว {">"}</div>
          <div className="kanit font-bold pl-1">{blogData.blogName}</div>
        </div>
      </div>
      <div className="container mx-auto w-[75%] bg-white rounded-lg m-4">
        <div className="flex flex-col p-4">
          <div className="text-3xl font-bold pt-4">{blogData.blogName}</div>
          <div className="flex flex-row space-x-2 pt-4">
            {blogData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-orange-200 text-orange-400 px-3 py-1 rounded-full font-bold text-sm flex items-center"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="pt-8">{blogData.description}</div>
          <div
            className="pt-4"
            dangerouslySetInnerHTML={{ __html: blogData.content }}
          />
        </div>
      </div>
    </div>
  );
}
