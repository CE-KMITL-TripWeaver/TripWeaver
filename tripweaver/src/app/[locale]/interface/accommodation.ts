import LocationObject from "../interface/locationObject";
import RatingObject from "../interface/ratingObject";

export default interface AccommodationData {
  id: string;
  name: string;
  type: string[];
  description: string;
  latitude: number;
  longitude: number;
  imgPath: string[];
  phone: string;
  website: string;
  star: number;
  facility: string[];
  tag: string[];
  location: LocationObject;
  rating: RatingObject;
}