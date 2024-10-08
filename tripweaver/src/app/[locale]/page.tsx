"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from './components/NavBar';
import MainCarousel from './components/MainCarousel';
import MainCategoryComponent from './components/MainCategoryComponent';
import MainPlaceCard from './components/MainPlaceCard';
import SearchComponent from './components/SearchComponent';
import { useTranslations } from 'next-intl';

interface Place {
  id: string;
  imageUrl: string;
  name: string;
  score: number;
  view: number;
}

export default function Main() {
  const t = useTranslations();

  const [selectedProvince, setSelectedProvince] = useState("ภูเก็ต");

  const handleProvinceSelect = (province: string) => {
    setSelectedProvince(province);
  };

  const attractionPlaces: Place[] = [
    {
      id: '1',
      imageUrl: 'https://files.thailandtourismdirectory.go.th/assets/upload/2018/01/03/20180103c72865b428a1a47ecab1a44354314f8c094338.jpg',
      name: 'แหลมพรหมเทพ',
      score: 4.9,
      view: 1246
    },
    {
      id: '2',
      imageUrl: 'https://mediaim.expedia.com/destination/1/994bb2772e7d1be0b47de209f96028ee.jpg',
      name: 'หาดกล้วย',
      score: 4.8,
      view: 324
    },
    {
      id: '3',
      imageUrl: 'https://www.chillpainai.com/src/wewakeup/scoop/images/ed06306e77a6d8420c9d3884516a257b3b8e98a1.jpg',
      name: 'สวนน้ำอันดามันดา',
      score: 4.7,
      view: 224
    },
    {
      id: '4',
      imageUrl: 'https://f.tpkcdn.com/images-source/829fa45fa1ac7f2a802a57ea248baf76.jpg',
      name: 'วัดพระทอง',
      score: 4.6,
      view: 124
    },
    {
      id: '5',
      imageUrl: 'https://teawlay.com/wp-content/uploads/wat-chalong.jpg',
      name: 'วัดฉลอง',
      score: 4.6,
      view: 89
    },
  ];

  const accommodationPlaces: Place[] = [
    {
      id: '1',
      imageUrl: 'https://mpics.mgronline.com/pics/Images/563000009952202.JPEG',
      name: 'โรงแรมศรีพันวา',
      score: 4.8,
      view: 322
    },
    {
      id: '2',
      imageUrl: 'https://cdn-5e2feaf4f911c80ca0df483b.closte.com/wp-content/uploads/2020/03/Crescent-Pool-24.jpg',
      name: 'เดอะ ซิส กะตะ รีสอร์ท',
      score: 4.6,
      view: 241
    },
    {
      id: '3',
      imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/07/fb/fc/panoramic-seaview-at.jpg?w=700&h=-1&s=1',
      name: 'มายบีช รีสอร์ท',
      score: 4.6,
      view: 142
    },
    {
      id: '4',
      imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/b9/2c/26/bandara-phuket-beach.jpg?w=700&h=-1&s=1',
      name: 'บัญดาราบีชภูเก็ต',
      score: 4.5,
      view: 113
    },
    {
      id: '5',
      imageUrl: 'https://pix10.agoda.net/hotelImages/108/108844/108844_14041014050019030205.jpg?ca=2&ce=1&s=414x232',
      name: 'ไตรตรังบีช รีสอร์ท',
      score: 4.4,
      view: 94
    },
  ];

  const restaurantPlaces: Place[] = [
    {
      id: '1',
      imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/70/9f/bc/1.jpg?w=1200&h=-1&s=1',
      name: 'Mainmorn Forest',
      score: 5.0,
      view: 748
    },
    {
      id: '2',
      imageUrl: 'https://img.wongnai.com/p/1920x0/2021/09/05/edcc391a02ea4d3c9e8ce5ad3984d524.jpg',
      name: 'ร้านวันจันทร์',
      score: 4.9,
      view: 544
    },
    {
      id: '3',
      imageUrl: 'https://www.oopsdelish.com/wp-content/uploads/2022/07/Tukabkhao2-1024x684.jpg',
      name: 'ตู้กับข้าว',
      score: 4.8,
      view: 452
    },
    {
      id: '4',
      imageUrl: 'https://condotiddoi.com/condocontentimg2/4457/119141254_3410495802345412_2151552607858609083_n.jpg',
      name: 'หมี่ต้นโพธิ์',
      score: 4.6,
      view: 346
    },
    {
      id: '5',
      imageUrl: 'https://www.ryoiireview.com/upload/article/202201/1642067440_4daf823969c8c721d5ddc79c495e9069.jpg',
      name: 'แหลมหินซีฟู้ด',
      score: 4.5,
      view: 230
    },
  ];

  return (
    <>
      <main className="bg-[#F4F4F4]">
        <NavBar />
        <MainCarousel />
        <MainCategoryComponent />

        <div className="container mx-auto">
          <div className="mb-4">
            <SearchComponent defaultValue={selectedProvince} onProvinceSelect={handleProvinceSelect} />
          </div>
        </div>

        <div className="space-y-16">

          {/* ที่เที่ยวแนะนำ */}
          <div className="container mx-auto px-6 py-4 rounded-2xl shadow-lg bg-white">
            <h2 className="kanit text-xl font-bold mb-4">{t('MainPage.recommendAttraction')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {attractionPlaces.slice(0, 5).map((place, index) => (
                <MainPlaceCard key={index} place={place} basePath="attraction_detail" />
              ))}
            </div>
            <div className="text-right mt-4">
              <Link href="/attraction_list" passHref>
                <button className="bg-[#F4F4F4] kanit font-semibold text-[#181818] shadow-md px-4 py-2 rounded-md">
                  {t('MainPage.see_more')}
                </button>
              </Link>
            </div>
          </div>

          {/* ที่พักแนะนำ */}
          <div className="container mx-auto px-6 py-4 rounded-2xl shadow-lg bg-white">
            <h2 className="kanit text-xl font-bold mb-4">{t('MainPage.recommendAccommodation')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {accommodationPlaces.slice(0, 5).map((place, index) => (
                <MainPlaceCard key={index} place={place} basePath="accommodation_detail" />
              ))}
            </div>
            <div className="text-right mt-4">
              <Link href="/accommodation_list" passHref>
                <button className="bg-[#F4F4F4] kanit font-semibold text-[#181818] shadow-md px-4 py-2 rounded-md">
                  {t('MainPage.see_more')}
                </button>
              </Link>
            </div>
          </div>

          {/* ร้านอาหารแนะนำ */}
          <div className="container mx-auto px-6 py-4 rounded-2xl shadow-lg bg-white">
            <h2 className="kanit text-xl font-bold mb-4">{t('MainPage.recommendRestaurant')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {restaurantPlaces.slice(0, 5).map((place, index) => (
                <MainPlaceCard key={index} place={place} basePath="restaurant_detail" />
              ))}
            </div>
            <div className="text-right mt-4">
              <Link href="/restaurant_list" passHref>
                <button className="bg-[#F4F4F4] kanit font-semibold text-[#181818] shadow-md px-4 py-2 rounded-md">
                  {t('MainPage.see_more')}
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="h-32"></div>
      </main>
    </>
  );

}