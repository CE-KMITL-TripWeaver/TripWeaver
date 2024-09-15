// pages/map.js or components/MapComponent.js
"use client"
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import polyline from '@mapbox/polyline';
import L from 'leaflet';
import { decode as decodePolyline } from '@mapbox/polyline';
// Dynamically import the MapContainer and TileLayer components
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });


const MapComponent = () => {
  const [polyline, setPolyline] = useState([]);
  const [waypoints, setWaypoints] = useState([]);
  //const mapRef = useRef();
  useEffect(() => {
    // Fetch route data from your API
    fetch('http://127.0.0.1:5000/route/v1/driving/100.7802624,12.9182259;100.8834718,12.9347259?steps=true&geometries=polyline&overview=simplified')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const { geometry } = data.routes[0];
        if(geometry){
            const decodedPolyline = decodePolyline(geometry!);
            console.log(decodedPolyline)
            setPolyline(decodedPolyline.map(([lat, lng]) => [lat, lng]));
        }// Decode the polyline to an array of lat/lng coordinates
        setWaypoints([
            [12.9182259, 100.7802624], // Location 1
            [12.9347259, 100.8834718]    // Location 2
          ]);

      });
    
  }, []);

  const createCustomIcon = (number: number) => {
    return L.divIcon({
      className: 'custom-icon',
      html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 256 256"><path fill="currentColor" d="M128 60a44 44 0 1 0 44 44a44.05 44.05 0 0 0-44-44m0 64a20 20 0 1 1 20-20a20 20 0 0 1-20 20m0-112a92.1 92.1 0 0 0-92 92c0 77.36 81.64 135.4 85.12 137.83a12 12 0 0 0 13.76 0a259 259 0 0 0 42.18-39C205.15 170.57 220 136.37 220 104a92.1 92.1 0 0 0-92-92m31.3 174.71a249.4 249.4 0 0 1-31.3 30.18a249.4 249.4 0 0 1-31.3-30.18C80 167.37 60 137.31 60 104a68 68 0 0 1 136 0c0 33.31-20 63.37-36.7 82.71"/></svg>
  <span class="absolute top-[5px] left-[20px] transform -translate-x-1/2 bg-white text-black rounded-full px-2 py-1 text-xs font-bold border border-black z-20">
    ${number}
  </span>
</div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  return (
    <MapContainer center={[12.9228548, 100.8058747]} zoom={14} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
/>
      {polyline.length > 0 && (
        <Polyline positions={polyline} color="green" />
      )}
      {waypoints.map((position, idx) => (
        <Marker key={idx} position={position} icon={createCustomIcon(idx + 1)}>
          <Popup>{`Location ${idx + 1}`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
