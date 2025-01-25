import DateOpen from "./dateOpen";

export default interface Location {
    id: string;
    title: string;
    type: string[];
    rating: number;
    ratingCount: number;
    latitude: number;
    longitude: number;
    img: string;
    dateOpen: DateOpen[];
    address: string;
}