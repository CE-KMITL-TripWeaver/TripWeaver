"use client"
import { useMap } from "react-leaflet";
import { useEffect } from "react";

interface Location {
    latitude: number;
    longitude: number;
  }
  
  interface MapUpdaterProps {
    locationPlanning: Location[];
  }

export const MapUpdater: React.FC<MapUpdaterProps> = ({ locationPlanning }) => {
  const map = useMap();

  useEffect(() => {
    if (locationPlanning.length === 1) {
      map.flyTo([locationPlanning[0].latitude, locationPlanning[0].longitude], 14);
    }
  }, [locationPlanning, map]);

  return null;
};