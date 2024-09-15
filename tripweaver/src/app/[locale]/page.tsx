"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import NavBar from './components/NavBar';
import MainCarousel from './components/MainCarousel';
import MainCategoryComponent from './components/MainCategoryComponent';

// Dynamically import MapComponent with SSR disabled
const MapComponent = dynamic(() => import('./components/MapComponent'), { ssr: false });

export default function Main() {
  return (
    <main className="bg-[#F4F4F4]">
      <MapComponent /> 
    </main>
  );
}
