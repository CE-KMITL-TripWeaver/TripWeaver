import mongoose, { Schema } from "mongoose";
import locationSchema from "../models/location" 
import ratingSchema from "../models/rating"

const attractionTagSchema = new Schema({
    Tourism: { type: Number, default: 0 },
    Adventure: { type: Number, default: 0 },
    Meditation: { type: Number, default: 0 },
    Art: { type: Number, default: 0 },
    Cultural: { type: Number, default: 0 },
    Landscape: { type: Number, default: 0 },
    Nature: { type: Number, default: 0 },
    Historical: { type: Number, default: 0 },
    Cityscape: { type: Number, default: 0 },
    Beach: { type: Number, default: 0 },
    Mountain: { type: Number, default: 0 },
    Architecture: { type: Number, default: 0 },
    Temple: { type: Number, default: 0 },
    WalkingStreet: { type: Number, default: 0 },
    Market: { type: Number, default: 0 },
    Village: { type: Number, default: 0 },
    NationalPark: { type: Number, default: 0 },
    Diving: { type: Number, default: 0 },
    Snuggle: { type: Number, default: 0 },
    Waterfall: { type: Number, default: 0 },
    Island: { type: Number, default: 0 },
    Shopping: { type: Number, default: 0 },
    Camping: { type: Number, default: 0 },
    Fog: { type: Number, default: 0 },
    Cycling: { type: Number, default: 0 },
    Monument: { type: Number, default: 0 },
    Zoo: { type: Number, default: 0 },
    Waterpark: { type: Number, default: 0 },
    Hiking: { type: Number, default: 0 },
    Museum: { type: Number, default: 0 },
    Riverside: { type: Number, default: 0 },
    NightLife: { type: Number, default: 0 },
    Family: { type: Number, default: 0 },
    Kid: { type: Number, default: 0 },
    Landmark: { type: Number, default: 0 },
    Forest: { type: Number, default: 0 }
}, { _id: false });

const attractionSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    imgPath: {
        type: [String],
    },
    phone: {
        type: String,
    },
    website: {
        type: String,
    },
    openingHour: {
        type: [String],
    },
    attractionTag: {
       type: attractionTagSchema,
       default: () => ({})
    },
    location: {
       type: locationSchema,
       default: () => ({})
    },
    rating: {
        type: ratingSchema,
        default: () => ({})
     }
},{ timestamps: true }
)

const Attraction = mongoose.models.Attraction || mongoose.model("Attraction",attractionSchema);

export default Attraction