"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function MainCarousel() {
  const images: string[] = [
    'https://www.tuneprotect.co.th/storage/article/6/travel-thailand-look-like-other-countries.jpg',
    'https://cbtthailand.dasta.or.th/upload-file-api/Resources/RelateAttraction/Images/RAT100835/1.jpeg',
    'https://upload.wikimedia.org/wikipedia/commons/6/64/Yaowarat_at_night_%2832455695783%29.jpg',
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="relative w-full h-[420px] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`${
            index === currentImage ? 'block' : 'hidden'
          } absolute top-0 left-0 w-full h-full`}
        >
          <Image
            src={image}
            alt={`Banner ${index + 1}`}
            unoptimized
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};