"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Tags from "../interface/tags";
import TagCheckBoxComponentElement from "./TagCheckBoxComponentElement";

interface TagCheckboxComponentProps {
  tagsList: Tags[];
  onCheckBoxSelect: (tags: Tags[]) => void;
}

export default function TagCheckBoxComponent({
  tagsList,
  onCheckBoxSelect,
}: TagCheckboxComponentProps) {
  const t = useTranslations();
  const [tagList, setTagList] = useState<Tags[]>(tagsList);

  useEffect(() => {
    setTagList(tagsList);
    console.log("tags",tagsList)
  }, [tagsList]);

  const handleCheckboxClick = (tagsName: string) => {
    const updatedTags = tagList.map((tags) =>
      tags.name === tagsName ? { ...tags, selected: !tags.selected } : tags
    );
    setTagList(updatedTags);
    onCheckBoxSelect(updatedTags);
  };

  return (
    <>
      <div className="flex flex-col bg-[#F8F8F8] border border-[#E0E0E0] shadow-xl kanit p-5 w-full rounded-xl">
        <div className="flex text-sm">{t("AttractionPages.title_tags")}</div>
        <div className="flex flex-col">
          <ul className="overflow-y-auto max-h-80 w-full">
            {tagList.map((tags, index) => (
              <li key={index}>
                <TagCheckBoxComponentElement
                  name={tags.name}
                  checked={tags.selected}
                  onClick={handleCheckboxClick}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
