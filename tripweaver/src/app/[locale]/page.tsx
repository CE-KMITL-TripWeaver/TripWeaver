"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import NavBar from './components/NavBar';
import MainCarousel from './components/MainCarousel';
import MainCategoryComponent from './components/MainCategoryComponent';

export default function Main() {

  return (
    <>
      <main className="bg-[#F4F4F4]">
        <NavBar />
        <MainCarousel />
        <MainCategoryComponent />
      </main>
    </>
  );

}