"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import locationPlaning from "../interface/locationPlan";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Carousel from 'react-elastic-carousel';
import consts from 'react-elastic-carousel';

import "./carousel.css"

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

export default function Home() {
  const [locationPlaning, setLocationPlanning] = useState<locationPlaning[]>([]);
  const [name, setName] = useState<string>("");
  const [latitude, setLatitude] = useState<number | "">("");
  const [longitude, setLongitude] = useState<number | "">("");
  const [polyline, setPolyline] = useState<any[]>([]);
  const [waypoints, setWaypoints] = useState<number[][]>([]);

  const mockItems = [
    {id: 1, title: 'item #1'},
    {id: 2, title: 'item #2'},
    {id: 3, title: 'item #3'},
    {id: 4, title: 'item #4'},
    {id: 5, title: 'item #5'}
  ]

  const breakPoints = [
    { width: 1, itemsToShow: 3, itemsToScroll: 2},
  ]

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    const reorderedItems = [...locationPlaning];
    const [removed] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, removed);

    setLocationPlanning(reorderedItems);
    updateWaypoints(reorderedItems);
  };

  const updateWaypoints = (newLocations: typeof locationPlaning) => {
    const newWaypoints = newLocations.map((loc) => [
      loc.latitude,
      loc.longitude,
    ]);
    setWaypoints(newWaypoints);
    setPolyline(newWaypoints);
  };

  useEffect(() => {
    if (locationPlaning.length > 1) {
      const coordinates = locationPlaning
        .map((loc) => `${loc.longitude},${loc.latitude}`)
        .join(";");
  
      const url = `https://osrm.tripweaver.site/route/v1/driving/${coordinates}?steps=true&geometries=polyline&overview=simplified`;
  
      axios
        .get(url)
        .then((response) => {
          const { geometry } = response.data.routes[0];
          if (geometry) {
            const decodedPolyline = decodePolyline(geometry);
            setPolyline(decodedPolyline.map(([lat, lng]) => [lat, lng]));
          }
          const updatedWaypoints = locationPlaning.map((loc) => [
            loc.latitude,
            loc.longitude,
          ]);
          setWaypoints(updatedWaypoints);
        })
        .catch((error) => {
          console.error("Error fetching route data:", error);
        });
    } else if (locationPlaning.length == 1) {
      setWaypoints([[locationPlaning[0].latitude,locationPlaning[0].longitude]]);
    }
  }, [locationPlaning]);
  

  const createCustomIcon = (number: number) => {

    if (typeof window !== "undefined") {
        const L = require('leaflet');
        const ReactDOMServer = require('react-dom/server');
        return L.divIcon({
          className: "custom icon",
          html: ReactDOMServer.renderToString(<div>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 256 256"><path fill="currentColor" d="M128 60a44 44 0 1 0 44 44a44.05 44.05 0 0 0-44-44m0 64a20 20 0 1 1 20-20a20 20 0 0 1-20 20m0-112a92.1 92.1 0 0 0-92 92c0 77.36 81.64 135.4 85.12 137.83a12 12 0 0 0 13.76 0a259 259 0 0 0 42.18-39C205.15 170.57 220 136.37 220 104a92.1 92.1 0 0 0-92-92m31.3 174.71a249.4 249.4 0 0 1-31.3 30.18a249.4 249.4 0 0 1-31.3-30.18C80 167.37 60 137.31 60 104a68 68 0 0 1 136 0c0 33.31-20 63.37-36.7 82.71"/></svg>
            <span className="absolute top-[5px] left-[20px] transform -translate-x-1/2 bg-white text-black rounded-full px-2 py-1 text-xs font-bold border border-black z-20">
              {number}
            </span>
          </div>),
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
        });
      }
  };

  const handleSubmit = () => {
    if (name && latitude !== "" && longitude !== "") {
      setLocationPlanning([
        ...locationPlaning,
        { name, latitude: Number(latitude), longitude: Number(longitude) },
      ]);
      setName("");
      setLatitude("");
      setLongitude("");
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  function myArrow({ type, onClick, isEdge }) {
    console.log('Arrow type:', type);
    const pointer = type === "PREV" ? (
      <Icon
        icon="mingcute:left-fill"
        className="text-lg text-[#828282]"
        height={21}
        width={20}
      />
    ) : (
      <Icon
        icon="mingcute:right-fill"
        className="text-lg text-[#828282]"
        height={21}
        width={20}
      />
    );
    return (
      <button onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    )
  }

  return (
    <div className="flex flex-col bg-[#F4F4F4] w-full h-full">
      <NavBar />
      <div className="flex flex-row w-full h-full">
        <div className="flex w-[8%] border-r-2 border-r-[#B7B7B7]">d</div>
        <div className="flex flex-col w-[42%] bg-green-700">
          <div className="flex flex-col">
            <div className={`flex h-48 w-full relative bg-[url('/images/sea-01.jpg')] bg-cover bg-center`} id="section-1">
                <div className="absolute h-[70%] w-[80%] bottom-[-20%] left-[10%] rounded-2xl" style={{boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)"}}>
                  <div className="flex w-full h-full rounded-2xl bg-white">
                    <div className="flex flex-col w-full h-full p-6">
                      <div className="flex font-bold text-2xl kanit">ทะเลก็ มีชีวิต</div>
                      <div className="flex flex-row mt-8 kanit">
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
            <div className="flex flex-col px-5 bg-[#F0F0F0]" id="section-2">
              <div className="flex w-full flex-row mt-20 justify-between">
                <div className="flex">
                  <div className="flex cursor-pointer justify-center items-center mr-2">
                    <Icon
                        icon="icon-park-outline:down"
                        className="text-lg text-black"
                        height={24}
                        width={23}
                    />  
                  </div>
                  <div className="flex font-bold kanit justify-center items-center">
                    สถานที่แนะนำ
                  </div>
                </div>
                <div className="flex px-2 py-0.5 flex-row justify-center items-center rounded-lg bg-white cursor-pointer" style={{boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)"}}>
                  <Icon
                        icon="iconamoon:search"
                        className="text-lg text-[#828282] mr-1"
                        height={16}
                        width={16}
                    />
                  <div className="flex kanit text-[#828282]"> แสดงทั้งหมด </div>
                </div>
              </div>
              <div className="flex flex-row mt-1">
                <div className="flex px-2 py-0.5 flex-row justify-center items-center rounded-lg bg-white cursor-pointer mr-5" style={{boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)"}}>
                  <Icon
                        icon="tabler:map-pin-filled"
                        className="text-lg text-[#828282] mr-1"
                        height={16}
                        width={16}
                    />
                  <div className="flex kanit text-[#828282] mr-1"> ที่ท่องเที่ยว </div>
                  <Icon
                        icon="icon-park-outline:down-c"
                        className="text-lg text-[#828282]"
                        height={16}
                        width={16}
                    />
                </div>
                <div className="flex px-2 py-0.5 flex-row justify-center items-center rounded-lg bg-white cursor-pointer" style={{boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)"}}>
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
                <Carousel breakPoints={breakPoints} pagination={false} renderArrow={myArrow}>
                  {mockItems.map(item => <div key={item.id}>{item.title}</div>)}
                </Carousel>
              </div>
            </div>
            <div className="flex bg-white" id="section-3">
              {/* Drag and Drop List */}
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="locations">
                  {(provided) => (
                    <ul
                      className="characters text-black p-4"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {locationPlaning.map((location, index) => (
                        <Draggable key={location.name} draggableId={location.name} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="border p-2 mb-2 bg-white rounded"
                            >
                              {location.name} - ({location.latitude}, {location.longitude})
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
          </div>
        </div>

        <div className="flex w-[50%]">
          {/*
                    <MapContainer
            center={[12.9228548, 100.8058747]}
            zoom={14}
            style={{ height: "100vh", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
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
            <MapUpdater locationPlaning={locationPlaning} />
          </MapContainer>
          
          */}
        </div>
      </div>
    </div>
  );
}
