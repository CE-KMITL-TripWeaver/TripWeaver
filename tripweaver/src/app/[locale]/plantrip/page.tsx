"use client";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import locationPlanning from "../interface/locationPlan";
import locationSearch from "../interface/locationSearch";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Carousel from "react-elastic-carousel";
import RecommendCard from "../components/RecommendCard";
import PlanningCard from "../components/PlanningCard";
import PerfectScrollbar from "react-perfect-scrollbar";
import PlanningCardDetails from "../components/PlanningCardDetails";
import SearchPlaceObjectComponent from "../components/SearchPlaceObjectComponent";
import AccommodationCard from "../components/AccommodationCard";
import AccommodationData from "../interface/accommodation";
import Location from "../interface/location";
import { v4 as uuidv4 } from "uuid";

import "./carousel.css";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { decode as decodePolyline } from "@mapbox/polyline";
import { MapUpdater } from "../components/MapUpdater";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

interface planningInformationData {
  timeTravel: number;
  rangeBetween: number;
}

interface DateOpen {
  dateName: string;
  openingRange: string;
}

const mockItems = [
  {
    id: 1,
    title: "item #1",
    type: "ทะเล ชายหาด",
    rating: 3.9,
    ratingCount: 9556,
    img: "/images/sea-01.jpg",
  },
  {
    id: 2,
    title: "item #2",
    type: "ทะเล ชายหาด",
    rating: 3.8,
    ratingCount: 6521,
    img: "/images/sea-01.jpg",
  },
  {
    id: 3,
    title: "item #3",
    type: "ทะเล ชายหาด",
    rating: 3.9,
    ratingCount: 3648,
    img: "/images/sea-01.jpg",
  },
  {
    id: 4,
    title: "item #4",
    type: "ทะเล ชายหาด",
    rating: 4.1,
    ratingCount: 5468,
    img: "/images/sea-01.jpg",
  },
  {
    id: 5,
    title: "item #5",
    type: "ทะเล ชายหาด",
    rating: 4.2,
    ratingCount: 5696,
    img: "/images/sea-01.jpg",
  },
];

const mockAccomodation = {
  id: "test",
  name: "ภูเก็ต แมริออท รีสอร์ท แอนด์ สปา, เมอร์ลิน บีช",
  type: [
      "รีสอร์ท"
  ],
  description: "หากคุณกำลังมองหารีสอร์ทหรูหราในป่าตองแล้วล่ะก็ ลองมาดูภูเก็ต แมริออท รีสอร์ท แอนด์ สปา, เมอร์ลิน บีชได้เลย ด้วยทำเลที่อยู่ใกล้กับสถานที่ท่องเที่ยวยอดนิยม เช่น หาดป่าตอง (2.9 กม.) และถนนบางลา (2.9 กม.) แขกของ Merlin Beach Resort Phuket จึงสามารถเยี่ยมชมสถานที่ท่องเที่ยวสำคัญต่างๆ ของป่าตองได้อย่างง่ายดาย ห้องพักมีทีวีจอแบน เครื่องปรับอากาศ และมินิบาร์ และคุณยังสามารถเชื่อมต่ออินเทอร์เน็ตได้ด้วยบริการ Wifi ฟรี ช่วยให้คุณพักผ่อนพร้อมความสะดวกสบายเต็มที่ Beach Merlin Resort มีรูมเซอร์วิส และเจ้าหน้าที่อำนวยความสะดวกให้บริการ นอกจากนี้ ในฐานะแขกของ Merlin Beach Resort Phuket คุณยังสามารถใช้บริการสระว่ายน้ำ และอาหารเช้าได้อีกด้วย แขกที่เลือกขับรถมาสามารถใช้ที่จอดรถฟรีได้ เมื่อความหิวถามหา อย่าลืมแวะไปที่บ้านริมผา, Sizzle Rooftop Restaurant และ No.6 Restaurant ซึ่งเป็นร้านอาหารซีฟู้ดที่คนในท้องถิ่นและนักท่องเที่ยวต่างชื่นชอบ บริเวณนี้มีสิ่งให้เที่ยวชมมากมาย ลองดูหอศิลป์ยอดนิยม เช่น Patong Inn Art, Apichart art gallery และ The Phuket Gallery่ พนักงานของภูเก็ต แมริออท รีสอร์ท แอนด์ สปา, เมอร์ลิน บีชพร้อมแล้วที่จะให้บริการคุณในทริปต่อไป",
  latitude: 7.884707,
  longitude: 98.272835,
  imgPath: [
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/6f/9b/df/tri-trang-beach.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/4a/86/c7/family-pool.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/0d/e0/ae/fe/family-pool.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/15/10/22/ef/balcony-pool-view.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/15/10/23/8c/kids-club.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/15/10/23/10/balcony-pool-view.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/15/10/23/01/pool-terrace.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/0d/e0/af/6c/merchant-kitchen-all.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/6f/9d/00/spa-tub.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/0d/e0/af/45/merchant-kitchen-all.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/6f/a9/a4/wellness.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/0d/e0/ae/e6/docg-italian-restaurant.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/0d/e0/af/42/lobby-bar.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/6f/9f/97/nam-tok-pool.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/6f/a0/05/family-pool.jpg"
  ],
  phone: "00 66 76 335 300",
  website: "https://th.tripadvisor.com/Hotel_Review-g297930-d315568-Reviews-Phuket_Marriott_Resort_Spa_Merlin_Beach-Patong_Kathu_Phuket.html",
  star: 5,
  facility: [
      "ที่จอดรถฟรี",
      "อินเตอร์เน็ตความเร็วสูง (WiFi) ฟรี",
      "ฟิตเนสเซนเตอร์พร้อมห้องออกกำลังกาย",
      "สระว่ายน้ำ",
      "บาร์ / เลานจ์",
      "ชายหาด",
      "การดำน้ำ",
      "เด็กเข้าพักฟรี",
      "ห้องพักปลอดสารก่อภูมิแพ้",
      "ม่านกันแสง",
      "เครื่องปรับอากาศ",
      "ชายหาดส่วนตัว",
      "ห้องน้ำเพิ่มเติม",
      "เครื่องชงกาแฟ / ชา",
      "เคเบิลทีวี / ทีวีดาวเทียม",
      "โถชำระล้าง"
  ],
  tag: [
      "วิวมหาสมุทร",
      "วิวสระว่ายน้ำ",
      "ห้องพักปลอดบุหรี่",
      "ห้องสวีท",
      "ห้องสำหรับครอบครัว"
  ],
  location: {
      "address": "99 ถนนหมื่นเงิน หาดไตรตรัง, ป่าตอง, กะทู้, จังหวัดภูเก็ต 83150 ไทย",
      "province": "ภูเก็ต",
      "province_code": 83,
      "district": "กะทู้",
      "district_code": 8302,
      "subDistrict": "",
      "sub_district_code": 0
  },
  rating: {
      "score": 4.5,
      "ratingCount": 5918
  }
}

const mockLocation = [
  {
    id: "1",
    title: "หาดป่าตอง (Patong Beach)",
    type: "ทะเล ชายหาด",
    rating: 3.9,
    ratingCount: 9556,
    latitude: 7.8961957,
    longitude: 98.2954147,
    img: "/th/images/patong.jpg",
    dateOpen: [
      { dateName: "จันทร์", openingRange: "09:00 - 18:00" },
      { dateName: "อังคาร", openingRange: "09:00 - 18:00" },
      { dateName: "ศุกร์", openingRange: "09:00 - 18:00" },
      { dateName: "เสาร์", openingRange: "08:00 - 20:00" },
      { dateName: "อาทิตย์", openingRange: "08:00 - 20:00" },
    ],
    address: "Q8G4+M4H ตำบล ป่าตอง อำเภอกะทู้ ภูเก็ต",
  },
  {
    id: "2",
    title: "แหลมพรหมเทพ (Promthep Cape)",
    type: "ทะเล ชายหาด",
    rating: 3.8,
    ratingCount: 6521,
    latitude: 7.7587,
    longitude: 98.3044,
    img: "/th/images/phomthep.jpg",
    dateOpen: [
      { dateName: "จันทร์", openingRange: "09:00 - 18:00" },
      { dateName: "อังคาร", openingRange: "09:00 - 18:00" },
      { dateName: "พุธ", openingRange: "หยุด" },
      { dateName: "พฤหัสบดี", openingRange: "09:00 - 18:00" },
      { dateName: "ศุกร์", openingRange: "09:00 - 18:00" },
      { dateName: "เสาร์", openingRange: "08:00 - 20:00" },
      { dateName: "อาทิตย์", openingRange: "08:00 - 20:00" },
    ],
    address: "Q8J6+F8P ตำบล นาจอมเทียน อำเภอสัตหีบ ชลบุรี",
  },
  {
    id: "3",
    title: "วัดฉลอง (Wat Chalong)",
    type: "ทะเล ชายหาด",
    rating: 3.9,
    ratingCount: 3648,
    latitude: 7.8441,
    longitude: 98.3383,
    img: "/th/images/chalong.jpg",
    dateOpen: [
      { dateName: "จันทร์", openingRange: "09:00 - 18:00" },
      { dateName: "อังคาร", openingRange: "09:00 - 18:00" },
      { dateName: "พุธ", openingRange: "หยุด" },
      { dateName: "พฤหัสบดี", openingRange: "09:00 - 18:00" },
      { dateName: "ศุกร์", openingRange: "09:00 - 18:00" },
      { dateName: "เสาร์", openingRange: "08:00 - 20:00" },
      { dateName: "อาทิตย์", openingRange: "08:00 - 20:00" },
    ],
    address: "Q8J7+G3F ตำบล ฉลอง อำเภอเมืองภูเก็ต ภูเก็ต",
  },
  {
    id: "4",
    title: "พระใหญ่ภูเก็ต (Big Buddha)",
    type: "ทะเล ชายหาด",
    rating: 4.1,
    ratingCount: 5468,
    latitude: 7.8274,
    longitude: 98.3055,
    img: "/th/images/bigbudda.jpg",
    dateOpen: [
      { dateName: "จันทร์", openingRange: "09:00 - 18:00" },
      { dateName: "อังคาร", openingRange: "09:00 - 18:00" },
      { dateName: "พุธ", openingRange: "หยุด" },
      { dateName: "พฤหัสบดี", openingRange: "09:00 - 18:00" },
      { dateName: "ศุกร์", openingRange: "09:00 - 18:00" },
      { dateName: "เสาร์", openingRange: "08:00 - 20:00" },
      { dateName: "อาทิตย์", openingRange: "08:00 - 20:00" },
    ],
    address: "Q8J7+JQF ตำบล ฉลอง อำเภอเมืองภูเก็ต ภูเก็ต",
  },
  {
    id: "5",
    title: "หาดกะรน (Karon Beach)",
    type: "ทะเล ชายหาด",
    rating: 4.2,
    ratingCount: 5696,
    latitude: 7.8474,
    longitude: 98.2937,
    img: "/th/images/karon.jpg",
    dateOpen: [
      { dateName: "จันทร์", openingRange: "09:00 - 18:00" },
      { dateName: "อังคาร", openingRange: "09:00 - 18:00" },
      { dateName: "พุธ", openingRange: "หยุด" },
      { dateName: "พฤหัสบดี", openingRange: "09:00 - 18:00" },
      { dateName: "ศุกร์", openingRange: "09:00 - 18:00" },
      { dateName: "เสาร์", openingRange: "08:00 - 20:00" },
      { dateName: "อาทิตย์", openingRange: "08:00 - 20:00" },
    ],
    address: "Q8J7+M39 ตำบล กะรน อำเภอเมืองภูเก็ต ภูเก็ต",
  },
];

const mockLocationSearch = [
  {
    id: "1",
    title: "หาดป่าตอง (Patong Beach)",
    address: "Q8G4+M4H ตำบล ป่าตอง อำเภอกะทู้ ภูเก็ต",
  },
  {
    id: "2",
    title: "แหลมพรหมเทพ (Promthep Cape)",
    address: "Q8J6+F8P ตำบล นาจอมเทียน อำเภอสัตหีบ ชลบุรี",
  },
  {
    id: "3",
    title: "วัดฉลอง (Wat Chalong)",
    address: "Q8J7+G3F ตำบล ฉลอง อำเภอเมืองภูเก็ต ภูเก็ต",
  },
  {
    id: "4",
    title: "พระใหญ่ภูเก็ต (Big Buddha)",
    address: "Q8J7+JQF ตำบล ฉลอง อำเภอเมืองภูเก็ต ภูเก็ต",
  },
  {
    id: "5",
    title: "หาดกะรน (Karon Beach)",
    address: "Q8J7+M39 ตำบล กะรน อำเภอเมืองภูเก็ต ภูเก็ต",
  },
];

export default function Home() {
  const [locationPlanning, setLocationPlanning] = useState<locationPlanning[]>(
    []
  );
  const [locationInSearch, setLocationInSearch] = useState<locationSearch[]>(
    []
  );
  const [accommodationData, setAccommodationData] = useState<AccommodationData>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRadiusMarkerRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState<string>("");
  const [latitude, setLatitude] = useState<number | "">("");
  const [longitude, setLongitude] = useState<number | "">("");
  const [polyline, setPolyline] = useState<any[]>([]);
  const [waypoints, setWaypoints] = useState<number[][]>([]);
  const [planningInformationDataList, setPlanningInformationDataList] =
    useState<planningInformationData[]>([]);
  const [showRecommendPage, setShowRecommendPage] = useState<boolean>(true);
  const [showPlanning, setShowPlanning] = useState<boolean>(true);
  const [showAccommodation, setShowAccommodation] = useState<boolean>(true);
  const [inputTitleWidth, setInputTitleWidth] = useState(0);
  const inputTitle = useRef<HTMLInputElement | null>(null);
  const [selectedLocationInfo, setSelectedLocationInfo] =
    useState<Location | null>(null);

  useEffect(() => {
    setLocationPlanning(mockLocation);
    setLocationInSearch(mockLocationSearch);
    setAccommodationData(mockAccomodation);
  }, []);

  const breakPoints = [{ width: 1, itemsToShow: 3, itemsToScroll: 2 }];

  const handleInput = () => {
    if (inputTitle.current) {
      const textLength =
        inputTitle.current.value.replace(/\s+/g, "").length || 0;
      setInputTitleWidth(textLength);
    }
  };

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    const reorderedItems = [...locationPlanning];
    const [removed] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, removed);

    setLocationPlanning(reorderedItems);
    updateWaypoints(reorderedItems);
  };

  const updateWaypoints = (newLocations: typeof locationPlanning) => {
    const newWaypoints = newLocations.map((loc) => [
      loc.latitude,
      loc.longitude,
    ]);
    setWaypoints(newWaypoints);
    setPolyline(newWaypoints);
  };

  const handleFocus = () => {
    setIsSearchOpen(true);
  };

  useEffect(() => {
    if (locationPlanning.length > 1) {
      const coordinates = [
        ...locationPlanning.map((loc) => `${loc.longitude},${loc.latitude}`),
        ...(mockAccomodation
          ? [`${mockAccomodation.longitude},${mockAccomodation.latitude}`]
          : [])
      ].join(";");

      console.log(coordinates)

      const url = `https://osrm.tripweaver.site/route/v1/driving/${coordinates}`;
      //console.log(url);
      axios
        .get(url)
        .then((response) => {
          const { geometry, legs } = response.data.routes[0];
          if (geometry) {
            const decodedPolyline = decodePolyline(geometry);
            setPolyline(decodedPolyline.map(([lat, lng]) => [lat, lng]));
          }
          const updatedWaypoints = locationPlanning.map((loc) => [
            loc.latitude,
            loc.longitude,
          ]);
          setWaypoints(updatedWaypoints);

          const planningData = legs.map((leg: any) => ({
            timeTravel: leg.duration,
            rangeBetween: leg.distance,
          }));
          planningData.unshift({ timeTravel: 0, rangeBetween: 0 });

          setPlanningInformationDataList(planningData);
          console.log(planningData)
        })
        .catch((error) => {
          console.error("Error fetching route data:", error);
        });
    } else if (locationPlanning.length == 1) {
      setPolyline([]);
      setWaypoints([
        [locationPlanning[0].latitude, locationPlanning[0].longitude],
      ]);
    }
  }, [locationPlanning,accommodationData]);

  const onDelete = (id: string) => {
    const locationToDelete = locationPlanning.find(
      (location) => location.id === id
    );

    if (
      selectedLocationInfo &&
      selectedLocationInfo.title === locationToDelete?.title
    ) {
      setSelectedLocationInfo(null);
    }

    setLocationPlanning((prev) =>
      prev.filter((location) => location.id !== id)
    );
  };

  const onClick = (location: Location) => {
    setSelectedLocationInfo(location);
  };

  const createCustomIcon = (number: number) => {
    if (typeof window !== "undefined") {
      const L = require("leaflet");
      const ReactDOMServer = require("react-dom/server");
      return L.divIcon({
        className: "custom icon",
        html: ReactDOMServer.renderToString(
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M128 60a44 44 0 1 0 44 44a44.05 44.05 0 0 0-44-44m0 64a20 20 0 1 1 20-20a20 20 0 0 1-20 20m0-112a92.1 92.1 0 0 0-92 92c0 77.36 81.64 135.4 85.12 137.83a12 12 0 0 0 13.76 0a259 259 0 0 0 42.18-39C205.15 170.57 220 136.37 220 104a92.1 92.1 0 0 0-92-92m31.3 174.71a249.4 249.4 0 0 1-31.3 30.18a249.4 249.4 0 0 1-31.3-30.18C80 167.37 60 137.31 60 104a68 68 0 0 1 136 0c0 33.31-20 63.37-36.7 82.71"
              />
            </svg>
            <span className="absolute top-[5px] left-[20px] transform -translate-x-1/2 bg-white text-black rounded-full px-2 py-1 text-xs font-bold border border-black z-20">
              {number}
            </span>
          </div>
        ),
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });
    }
  };

  const handleClickSelectInfo = () => {
    setSelectedLocationInfo(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRadiusMarkerRef.current &&
        !searchRadiusMarkerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRadiusMarkerRef]);

  const handleAddLocation = (id: string) => {
    const location = mockLocation.find((item) => item.id === id);
    const newLocation = { ...location, id: uuidv4() };
    console.log(newLocation);
    setLocationPlanning((prev) => [...prev, newLocation]);
  };

  function myArrow({ type, onClick, isEdge }) {
    const pointer =
      type === "PREV" ? (
        <div className="flex items-center justify-center rounded-full bg-[#D9D9D9] w-8 h-8">
          <Icon
            icon="mingcute:left-fill"
            className="text-lg text-[#828282]"
            height={21}
            width={20}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-full bg-[#D9D9D9] w-8 h-8">
          <Icon
            icon="mingcute:right-fill"
            className="text-lg text-[#828282]"
            height={21}
            width={20}
          />
        </div>
      );
    return (
      <button onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    );
  }

  return (
    <div className="flex flex-col bg-[#F4F4F4] w-full h-full">
      <NavBar />
      <div className="flex flex-row w-full h-[calc(100vh-84px)]">
        <div className="flex w-[8%] border-r-2 border-r-[#B7B7B7]">d</div>
        <PerfectScrollbar
          className="flex flex-col w-[42%] h-full relative bg-white"
          style={{
            overflow: "hidden", // Prevents default overflow
          }}
        >
          <div className="flex flex-col">
            <div
              className={`flex h-36 w-full relative bg-[url('/images/sea-01.jpg')] bg-cover bg-center`}
              id="section-1"
            >
              <div
                className="absolute h-[70%] w-[80%] bottom-[-20%] left-[10%] rounded-2xl"
                style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)" }}
              >
                <div className="flex w-full h-full rounded-2xl bg-white">
                  <div className="flex flex-col w-full h-full p-6">
                    <div className="flex font-bold text-2xl kanit">
                      ทะเลก็ มีชีวิต
                    </div>
                    <div className="flex flex-row mt-3 kanit">
                      <div className="flex justify-center items-center mr-1">
                        <Icon
                          icon="cuida:calendar-outline"
                          className="text-lg text-[#828282] "
                          height={21}
                          width={20}
                        />
                      </div>
                      <div className="flex justify-center items-center text-[#828282] kanit mr-4">
                        4 Sep 24 - 7 Sep 24
                      </div>
                      <div className="flex justify-center items-center mr-1">
                        <Icon
                          icon="material-symbols:person"
                          className="text-lg text-[#828282] "
                          height={24}
                          width={23}
                        />
                      </div>
                      <div className="flex justify-center items-center text-[#828282] kanit">
                        3
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[2%] left-[95%]  justify-center items-center cursor-pointer">
                <Icon
                  icon="akar-icons:edit"
                  className="text-lg text-white"
                  height={24}
                  width={23}
                />
              </div>
            </div>
            <div className={`flex flex-col px-5 bg-[#F0F0F0]`} id="section-2">
              <div className="flex w-full flex-row mt-11 justify-between">
                <div className="flex">
                  <div
                    className="flex cursor-pointer justify-center items-center mr-2"
                    onClick={() => setShowRecommendPage(!showRecommendPage)}
                  >
                    <Icon
                      icon={
                        showRecommendPage
                          ? "icon-park-outline:down"
                          : "icon-park-outline:right"
                      }
                      className="text-lg text-black"
                      height={24}
                      width={23}
                    />
                  </div>
                  <div className="flex font-bold kanit justify-center items-center">
                    สถานที่แนะนำ
                  </div>
                </div>
                <div
                  className="flex px-2 py-0.5 flex-row justify-center items-center rounded-lg bg-white cursor-pointer"
                  style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)" }}
                >
                  <Icon
                    icon="iconamoon:search"
                    className="text-lg text-[#828282] mr-1"
                    height={16}
                    width={16}
                  />
                  <div className="flex kanit text-[#828282]"> แสดงทั้งหมด </div>
                </div>
              </div>
              <div
                className={`flex flex-col ${
                  showRecommendPage
                    ? "max-h-screen transition-all duration-500"
                    : "max-h-0 transition-all duration-500"
                } overflow-hidden`}
              >
                <div className="flex flex-row mt-1">
                  <div
                    className="flex px-2 py-0.5 flex-row justify-center items-center rounded-lg bg-white cursor-pointer mr-5"
                    style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)" }}
                  >
                    <Icon
                      icon="tabler:map-pin-filled"
                      className="text-lg text-[#828282] mr-1"
                      height={16}
                      width={16}
                    />
                    <div className="flex kanit text-[#828282] mr-1">
                      {" "}
                      ที่ท่องเที่ยว{" "}
                    </div>
                    <Icon
                      icon="icon-park-outline:down-c"
                      className="text-lg text-[#828282]"
                      height={16}
                      width={16}
                    />
                  </div>
                  <div
                    className="flex px-2 py-0.5 flex-row justify-center items-center rounded-lg bg-white cursor-pointer"
                    style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)" }}
                  >
                    <Icon
                      icon="lucide:filter"
                      className="text-lg text-[#828282] mr-1"
                      height={16}
                      width={16}
                    />
                    <div className="flex kanit text-[#828282]"> ฟิลเตอร์ </div>
                  </div>
                </div>
                <div className="flex mt-2">
                  <Carousel
                    breakPoints={breakPoints}
                    pagination={false}
                    renderArrow={myArrow}
                  >
                    {/*{mockItems.map(item => <div key={item.id}>{item.title}</div>)}*/}
                    {mockItems.map((item) => (
                      <RecommendCard
                        key={item.id}
                        title={item.title}
                        type={item.type}
                        img={item.img}
                        rating={item.rating}
                        ratingCount={item.ratingCount}
                      />
                    ))}
                  </Carousel>
                </div>
              </div>
              <div className="flex bg-[#F0F0F0] mb-10" />
            </div>
            <div
              className="flex flex-col bg-white pl-5 py-5 mt-2"
              id="section-3"
            >
              <div className="flex w-full kanit justify-start font-bold">
                <div className="flex relative items-center rounded-lg group">
                  <input
                    ref={inputTitle}
                    type="text"
                    className={`flex w-full text-lg kanit justify-start font-bold p-2 focus:outline-none rounded-lg hover:bg-[#F7F7F7] focus:bg-[#F7F7F7] pr-8 ${
                      inputTitleWidth === 0 ? "min-w-96" : ""
                    }`}
                    placeholder="เพื่มชื่อทริปของคุณ (เช่น ทริปเดินทางสู่...)"
                    size={inputTitleWidth}
                    onInput={handleInput}
                  />
                  <Icon
                    icon="mdi:pencil"
                    className="text-lg text-[#666666] absolute right-2 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity duration-200"
                    height={16}
                    width={16}
                  />
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <div className="flex flex-row">
                  <div
                    className="flex cursor-pointer justify-center items-center mr-2"
                    onClick={() => setShowPlanning(!showPlanning)}
                  >
                    <Icon
                      icon={
                        showPlanning
                          ? "icon-park-outline:down"
                          : "icon-park-outline:right"
                      }
                      className="text-lg text-black"
                      height={24}
                      width={23}
                    />
                  </div>
                  <div className="flex font-bold kanit justify-center items-center">
                    แผนการเดินทาง
                  </div>
                </div>
                <div
                  className={`flex flex-col w-full ${
                    showPlanning
                      ? "h-full transition-all duration-500"
                      : "h-0 transition-all duration-500"
                  } overflow-hidden`}
                >
                  {planningInformationDataList.length > 0 && (
                    <div className="flex flex-col h-full">
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="locations">
                          {(provided) => (
                            <ul
                              className="characters text-black pt-2 px-3 h-full"
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {locationPlanning.map((location, index) => (
                                <Draggable
                                  key={location.id}
                                  draggableId={location.title}
                                  index={index}
                                >
                                  {(provided) => (
                                    <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="p-2 mb-2 bg-white"
                                    >
                                      <PlanningCard
                                        onDelete={onDelete}
                                        handleClick={onClick}
                                        distance={
                                          planningInformationDataList[index]
                                            ?.rangeBetween ?? 0
                                        }
                                        duration={
                                          planningInformationDataList[index]
                                            ?.timeTravel ?? 0
                                        }
                                        id={location.id}
                                        index={index}
                                        title={location.title}
                                        type={location.type}
                                        rating={location.rating}
                                        ratingCount={location.ratingCount}
                                        img={location.img}
                                        latitude={location.latitude}
                                        longitude={location.longitude}
                                        dateOpen={location.dateOpen}
                                        address={location.address}
                                      />
                                    </li>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </ul>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </div>
                  )}
                </div>
                <div
                  className={`flex flex-col w-full kanit pr-10 pl-5 ${
                    showPlanning ? "max-h-screen" : "max-h-0 overflow-hidden"
                  }`}
                >
                  <div className="relative w-full">
                    <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-[#F2F2F2] shadow-sm">
                      <span className="text-gray-500 mr-2">
                        <Icon
                          icon="ri:map-pin-line"
                          className="text-lg text-[#9B9B9B]"
                        />
                      </span>
                      <input
                        type="text"
                        placeholder="ค้นหาเพื่อเพิ่มสถานที่ของคุณ"
                        className="flex-grow outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                        onFocus={handleFocus}
                      />
                    </div>

                    <div
                      className={`absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 ${
                        isSearchOpen ? "flex w-full flex-col" : "hidden"
                      }`}
                      ref={searchRadiusMarkerRef}
                    >
                      <ul className="divide-y divide-gray-200">
                        {mockLocationSearch.map((item) => (
                          <SearchPlaceObjectComponent
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            address={item.address}
                            onClick={() => handleAddLocation(item.id)}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-5">
                <div className="flex flex-row">
                  <div
                    className="flex cursor-pointer justify-center items-center mr-2"
                    onClick={() => setShowAccommodation(!showAccommodation)}
                  >
                    <Icon
                      icon={
                        showAccommodation
                          ? "icon-park-outline:down"
                          : "icon-park-outline:right"
                      }
                      className="text-lg text-black"
                      height={24}
                      width={23}
                    />
                  </div>
                  <div className="flex font-bold kanit justify-center items-center">
                    ที่พักสำหรับการท่องเที่ยว
                  </div>
                </div>
                <div
                  className={`flex flex-col w-full ${
                    showAccommodation
                      ? "h-full"
                      : "h-0"
                  } overflow-hidden transition-all duration-500 p-2`}
                >
                  <div className="flex p-2"> 
                    { accommodationData && <AccommodationCard data={accommodationData} distance={planningInformationDataList[planningInformationDataList.length-1].rangeBetween} duration={planningInformationDataList[planningInformationDataList.length-1].timeTravel} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PerfectScrollbar>

        <div className="flex relative flex-col h-full w-[50%]">
          {selectedLocationInfo && (
            <div
              className="flex w-full absolute bottom-5"
              style={{ zIndex: 1 }}
            >
              <PlanningCardDetails
                title={selectedLocationInfo.title}
                type={selectedLocationInfo.type}
                address={selectedLocationInfo.address}
                dateOpen={selectedLocationInfo.dateOpen}
                handleClick={handleClickSelectInfo}
              />
            </div>
          )}
          <div className="flex" style={{ zIndex: 0 }}>
            {/* 
             <MapContainer
              center={[7.7587, 98.2954147]}
              zoom={14}
              className="h-[calc(100vh-84px)]"
              style={{ width: "100%" }}
            >
              <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}{r}.png"
              />
              {polyline.length > 0 && (
                <Polyline positions={polyline} pathOptions={{ color: "green" }} />
              )}
              {waypoints.map((position, idx) => (
                <Marker
                  key={idx} 
                  position={position}
                  icon={createCustomIcon(idx +1)}
                >
                  <Popup>{`Location ${idx + 1}`}</Popup>
                </Marker>
              ))}
              <MapUpdater locationPlanning={locationPlanning} />
            </MapContainer> */}
          </div>
        </div>
      </div>
    </div>
  );
}
