"use client";
import { useParams, redirect } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "@/app/[locale]/components/NavBar";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "react-query";
import { fetchUserData, fetchBlogData } from "../../../../../utils/apiService";
import { format } from "date-fns";
export default function BlogPost() {
  const { id } = useParams();
  const blogID = id as string;
  const { data: session, status } = useSession();
  const [blogCreateAt, setBlogCreateAt] = useState("");
  const [blogCreator, setBlogCreator] = useState("");
  const t = useTranslations();
  interface BlogData {
    blogName: string;
    blogImage: string;
    blogCreator: string;
    description: string;
    content: string;
    createdAt: string;
    tags: string[];
  }

  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
    refetch: refetchUserData,
  } = useQuery(
    ["userData", session?.user?.id],
    () => fetchUserData(session?.user?.id!),
    {
      enabled: !!session?.user?.id,
    }
  );

  const {
    data: blogData,
    isLoading: isBlogDataLoading,
    isError: isBlogDataError,
    refetch: refetchBlogData,
  } = useQuery(["blogData", blogID], () => fetchBlogData(blogID), {
    enabled: !!blogID,
    retry: 0,
  });

  if (status === "unauthenticated") {
    redirect("/login");
  }

  const updateBlogView = async () => {
    const viewedBlogs = JSON.parse(localStorage.getItem("viewedBlogs") || "[]");

    if (!viewedBlogs.includes(id)) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blog/updateView`, {
          blogId: id,
        });
        viewedBlogs.push(id);
        localStorage.setItem("viewedBlogs", JSON.stringify(viewedBlogs));
      } catch (error) {
        console.error("Error updating blog view count:", error);
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("th-TH", {
      day: "numeric",
      month: "short",
      year: "2-digit",
    }).format(date);
  };

  // const fetchBlogData = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/blog/getBlog/${id}`
  //     );
  //     (data.blog.createdAt = formatDate(new Date(data.blog.createdAt))),
  //       setBlogData(data.blog);
  //   } catch (error) {
  //     console.error("Error fetching blog data:", error);
  //   }
  // };

  useEffect(() => {
    console.log("blogData", blogData);
    if (blogData && userData) {
      setBlogCreateAt(formatDate(new Date(blogData.createdAt)));
      setBlogCreator(blogData.blogCreator.username);
      updateBlogView();
    }
  }, [blogData, userData]);

  if (!blogData || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col bg-[#F4F4F4] w-full h-full kanit">
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
            {blogData.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-orange-200 text-orange-400 px-3 py-1 rounded-full font-bold text-sm flex items-center"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="pt-4 flex flex-row items-center space-x-2">
            <Icon icon="mdi:calendar" className="text-gray-500 mr-1" />
            {blogCreateAt} โดย {blogCreator}
          </div>
          <div className="pt-8">{blogData.description}</div>
          <div>
            <img
              src={blogData.blogImage}
              alt="blog"
              className="w-auto h-[500px] object-cover rounded-lg mx-auto"
            />
          </div>
          <div
            className="pt-4 text-xl"
            dangerouslySetInnerHTML={{ __html: blogData.content }}
          />
        </div>
      </div>
    </div>
  );
}
