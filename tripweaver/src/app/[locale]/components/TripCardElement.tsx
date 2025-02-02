import React, { useState } from "react";
import AccommodationData from "../interface/accommodation";
import AttractionData from "../interface/attraction";
import RestaurantData from "../interface/restaurant";
import { Icon } from "@iconify/react";

interface TripCardElementProps {
  location: AccommodationData | RestaurantData | AttractionData;
  stayDuration: number;
  travelTime: number;
  locationDistance: number;
}

const TripCard: React.FC<TripCardElementProps> = ({ location }) => {
  return (
    <>
      <div>

      </div>
    </>
  );
};

export default TripCard;
