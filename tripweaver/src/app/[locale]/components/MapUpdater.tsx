"use client"
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import AccommodationData from "../interface/accommodation";
import AttractionData from "../interface/attraction";
import RestaurantData from "../interface/restaurant";

interface Location {
  latitude: number;
  longitude: number;
}
  
interface MapUpdaterProps {
  locationPlanning: Location[];
  selectedLocationDetails: AccommodationData | RestaurantData | AttractionData | null;

}

export const MapUpdater: React.FC<MapUpdaterProps> = ({ locationPlanning, selectedLocationDetails }) => {
  const map = useMap();

  useEffect(() => {
    if(!locationPlanning) {
      return;
    }
    if (locationPlanning.length === 1) {
      map.flyTo([locationPlanning[0].latitude, locationPlanning[0].longitude], 14);
    }
  }, [locationPlanning, map]);

  useEffect(() => {
    if(!selectedLocationDetails) {
      return;
    }
    map.flyTo([selectedLocationDetails.latitude, selectedLocationDetails.longitude], 15, {
      animate: true,
      duration: 1.5, 
    });
  }, [selectedLocationDetails]);


  return null;
};