"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import locationPlaning from "../interface/locationPlan";

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

  return (
    <div className="flex flex-col bg-[#F4F4F4] w-full h-full">
      <NavBar />
      <div className="flex flex-row w-full h-full">
        <div className="flex w-[8%] border-r-2 border-r-[#B7B7B7]">d</div>
        <div className="flex flex-col w-[42%] bg-green-700">
          <h2 className="text-white mb-4">Add Location Plan</h2>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) =>
                setLatitude(
                  e.target.value !== "" ? parseFloat(e.target.value) : ""
                )
              }
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) =>
                setLongitude(
                  e.target.value !== "" ? parseFloat(e.target.value) : ""
                )
              }
              className="p-2 border rounded w-full"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Submit
          </button>
          <h2 className="text-white p-4">Location Planning Data</h2>
          <ul className="text-black p-4">
            {locationPlaning.map((location, index) => (
              <li key={index}>
                {location.name} - ({location.latitude}, {location.longitude})
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-[50%]">
         
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
        </div>
      </div>
    </div>
  );
}
