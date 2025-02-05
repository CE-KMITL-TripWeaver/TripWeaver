"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useTranslations } from "next-intl";
import Select from "react-select";
import ImageResize from "tiptap-extension-resize-image";
import { t } from "i18next";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";
import BlogDropzoneModal from "../../components/modals/BlogDropzoneModal";

const tagsList = [
  "แหล่งท่องเที่ยว",
  "ผจญภัย",
  "สมาธิ",
  "ศิลปะ",
  "วัฒนธรรม",
  "ทิวทัศน์",
  "ธรรมชาติ",
  "ประวัติศาสตร์",
  "วิวเมือง",
  "ชายหาด",
  "ภูเขา",
  "สถาปัตยกรรม",
  "วัด",
  "ถนนคนเดิน",
  "ตลาด",
  "หมู่บ้าน",
  "อุทยานแห่งชาติ",
  "ดำน้ำ",
  "Snuggle",
  "น้ำตก",
  "เกาะ",
  "ซื้อของ",
  "แคมป์",
];

const tagOptions = tagsList.map((tag) => ({ value: tag, label: tag }));

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(100, { message: "Title must be less than 100 characters" }),
  description: z
    .string()
    .max(256, { message: "Description must be less than 350 characters" }),
  tags: z
    .array(z.string())
    .nonempty({ message: "At least one tag is required" })
});

type FormValues = z.infer<typeof formSchema>;

const CreateBlogPost = () => {
  const [content, setContent] = useState("");
  const [tagselect, setTagselect] = useState<string[]>([]);
  const [blogImage, setBlogImage] = useState<string | null>(null);
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageResize,
      Image.configure({
        inline: true,
        HTMLAttributes: {
          width: "600px",
          height: "auto",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>เนื้อหาบล็อกของคุณ</p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // Handle image upload
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;
    const file = files[0];

    const formData = new FormData();
    formData.append("image", file);

    try {
      // const response = await axios.post('http://localhost:5000/api/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      const imageUrl =
        "https://www.paradise-kohyao.com/wp-content/uploads/2024/07/1.-%E0%B9%81%E0%B8%AB%E0%B8%A5%E0%B8%A1%E0%B8%9E%E0%B8%A3%E0%B8%AB%E0%B8%A1%E0%B9%80%E0%B8%97%E0%B8%9E.webp";
      if (editor) {
        editor.chain().focus().setImage({ src: imageUrl }).run();
      }
    } catch (error) {
      console.error("Error uploading image", error);
    }

    // Clear the file input value to allow re-uploading the same file
    event.target.value = "";
  };

  const handleBlogImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;
    const file = files[0];

    const formData = new FormData();
    formData.append("image", file);

    try {
      //   const response = await axios.post('http://localhost:5000/api/upload', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });
      //   const imageUrl = response.data.imageUrl;
      const imageUrl =
        "https://www.paradise-kohyao.com/wp-content/uploads/2024/07/1.-%E0%B9%81%E0%B8%AB%E0%B8%A5%E0%B8%A1%E0%B8%9E%E0%B8%A3%E0%B8%AB%E0%B8%A1%E0%B9%80%E0%B8%97%E0%B8%9E.webp";
      setBlogImage(imageUrl);
    } catch (error) {
      console.error("Error uploading blog image", error);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data:", data);
    console.log("Editor Content:", content);
    console.log(blogImage);
    const blogData = {
      blogName: data.title,
      blogImage:
        "https://www.paradise-kohyao.com/wp-content/uploads/2024/07/1.-%E0%B9%81%E0%B8%AB%E0%B8%A5%E0%B8%A1%E0%B8%9E%E0%B8%A3%E0%B8%AB%E0%B8%A1%E0%B9%80%E0%B8%97%E0%B8%9E.webp",
      userID: "677c5fd1e5428060c8e025c6",
      description: data.description,
      tags: data.tags,
      content: content,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/create`,
        blogData
      );
      const responseData = response.data;

      if (response.status === 201) {
        console.log("Blog post created:", responseData);
        router.push(`/blog/post/${responseData.BlogID}`);
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  const handleTagChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    if (selectedOption && !tagselect.includes(selectedOption.value)) {
      const newTags = [...tagselect, selectedOption.value];
      setTagselect(newTags);
      if (newTags.length > 0) {
        setValue("tags", newTags as [string, ...string[]]);
      }
    }
  };
  
  const handleTagRemove = (tagToRemove: string) => {
    const newTags = tagselect.filter((tag) => tag !== tagToRemove);
    setTagselect(newTags);
    setValue("tags", newTags as [string, ...string[]]);
  };

  return (
    <div className="flex flex-col bg-[#F4F4F4] w-full h-full">
      <NavBar />
      <div className="kanit w-3/4 mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 mb-20">
        <h1 className="text-3xl font-bold mb-6">สร้างบล็อกของคุณ</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-lg font-medium mb-2">
              ชื่อบล็อก
            </label>
            <input
              id="title"
              {...register("title")}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400"
              placeholder="ชื่อบล็อกของคุณ"
            />
            {errors.title && (
              <p className="text-red-500 mt-2 text-sm">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="blogImage"
              className="block text-lg font-medium mb-2"
            >
              อัปโหลดรูปภาพหน้าปกบล็อก
            </label>
            <input
              type="file"
              id="blogImage"
              accept="image/*"
              onChange={handleBlogImageUpload}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400"
            />
            {blogImage && (
              <div className="mt-2">
                <img
                  src={blogImage}
                  alt="Blog"
                  className="w-1/4 h-auto rounded-md"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium mb-2"
            >
              รายละเอียดเบื้องต้น
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400"
              placeholder="ใส่รายละเอียดเบื้องต้นของบล็อก"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 mt-2 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* TipTap Editor with Toolbar */}
          <div className="flex  mt-10 flex-col sticky top-0 z-10">
            {/* Toolbar */}
            {editor && (
              <div className="flex space-x-2 p-2 border-b border-gray-200 bg-gray-100">
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-1 px-2 rounded ${
                    editor.isActive("bold")
                      ? "bg-orange-500 text-white"
                      : "bg-white"
                  }`}
                >
                  <Icon icon="ooui:bold-b" className="" />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-1 px-2 rounded ${
                    editor.isActive("italic")
                      ? "bg-orange-500 text-white"
                      : "bg-white"
                  }`}
                >
                  <Icon icon="tabler:italic" className="" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  className={`p-1 px-2 rounded ${
                    editor.isActive("blockquote")
                      ? "bg-orange-500 text-white"
                      : "bg-white"
                  }`}
                >
                  <Icon icon="mdi:format-quote-open" className="text-lg" />
                </button>
                {/* Image Upload Button with Icon */}
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer p-2 bg-white rounded"
                >
                  <Icon icon="material-symbols:image" className="text-2xl" />
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {/* Text Alignment Buttons */}
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() =>
                      editor?.chain().focus().setTextAlign("left").run()
                    }
                    className={`p-2 rounded ${
                      editor?.isActive({ textAlign: "left" })
                        ? "bg-orange-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    <Icon icon="iconoir:align-left" className="text-lg" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor?.chain().focus().setTextAlign("center").run()
                    }
                    className={`p-2 rounded ${
                      editor?.isActive({ textAlign: "center" })
                        ? "bg-orange-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    <Icon icon="iconoir:align-center" className="text-lg" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor?.chain().focus().setTextAlign("right").run()
                    }
                    className={`p-2 rounded ${
                      editor?.isActive({ textAlign: "right" })
                        ? "bg-orange-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    <Icon icon="iconoir:align-right" className="text-lg" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor?.chain().focus().setTextAlign("justify").run()
                    }
                    className={`p-2 rounded ${
                      editor?.isActive({ textAlign: "justify" })
                        ? "bg-orange-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    <Icon icon="iconoir:align-justify" className="text-lg" />
                  </button>
                </div>
                {/* Undo Button */}
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().undo().run()}
                  className="p-2 rounded bg-white"
                >
                  <Icon icon="mdi:undo" className="text-lg" />
                </button>

                {/* Redo Button */}
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().redo().run()}
                  className="p-2 rounded bg-white"
                >
                  <Icon icon="mdi:redo" className="text-lg" />
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">เนื้อหา</label>
            <div className="border border-gray-300 rounded-md">
              {/* Editor */}
              <div className="p-4">
                <EditorContent
                  editor={editor}
                  className="prose max-w-none focus:outline-none focus:ring-0"
                />
              </div>
            </div>
          </div>

          {/* Tags add */}
          <div>
            <label htmlFor="tags" className="block text-lg font-medium mb-2">
              เพิ่มแท็ก
            </label>
            <Select
              id="tags"
              options={tagOptions}
              className="basic-single-select"
              classNamePrefix="select"
              onChange={handleTagChange}
              placeholder="เพิ่มแท็ก"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {tagselect.map((tag) => (
                <span
                  key={tag}
                  className="bg-orange-200 text-orange-400 px-3 py-1 rounded-full font-bold text-sm flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-1 text-red-500"
                    onClick={() => handleTagRemove(tag)}
                    style={{
                      fontSize: "2rem",
                      lineHeight: "1rem",
                      marginBottom: "0.4rem",
                    }}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            {errors.tags && (
              <p className="text-red-500 mt-2 text-sm">{errors.tags.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition duration-200 "
            >
              เผยแพร่บล็อก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPost;
