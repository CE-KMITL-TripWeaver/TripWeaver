"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "@/app/[locale]/components/NavBar";

export default function BlogPost() {
  const { id } = useParams();
  interface BlogData {
    blogName: string;
    blogImage: string;
    description: string;
    content: string;
    tags: string[];
  }

  const [blogData, setBlogData] = useState<BlogData>();

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/getBlog/67a0afef317ae8e8026da3d9`
      );
      setBlogData(data.blog);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
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
    <div>
      <NavBar />
      <div className="container mx-auto w-[55%]">
        <div className="text-3xl font-bold">
        {blogData.blogName}
        </div>
        <p>{blogData.description}</p>
        <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
        <div>
          {blogData.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-orange-200 text-orange-400 px-3 py-1 rounded-full font-bold text-sm flex items-center"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
