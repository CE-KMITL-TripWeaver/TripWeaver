import dateOpen from "./dateOpen";

export default interface locationPlanning {
    id: number
    title: string;
    type: string;
    rating: number;
    ratingCount: number;
    address: string;
    img: string;
    latitude: number;
    longitude: number;
    dateOpen: dateOpen[];
}