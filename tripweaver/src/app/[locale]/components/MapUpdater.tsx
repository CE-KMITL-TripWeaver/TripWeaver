"use client"
import { useMap } from "react-leaflet";
import { useEffect } from "react";

interface Location {
    latitude: number;
    longitude: number;
  }
  
  interface MapUpdaterProps {
    locationPlaning: Location[];
  }

export const MapUpdater: React.FC<MapUpdaterProps> = ({ locationPlaning }) => {
  const map = useMap();

  useEffect(() => {
    if (locationPlaning.length === 1) {
      map.flyTo([locationPlaning[0].latitude, locationPlaning[0].longitude], 14);
    }
  }, [locationPlaning, map]);

  return null;
};