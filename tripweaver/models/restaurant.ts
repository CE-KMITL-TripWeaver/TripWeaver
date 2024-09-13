import mongoose, { Schema } from "mongoose";
import locationSchema from "./location" 
import ratingSchema from "./rating"

const restaurantSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    sub_name: {
        type: String,
    },
    wongnai_url: {
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
    restaurantTag: {
        type: [String],
    },
    facility: {
        type: [String],
    },
    imgPath: {
        type: [String],
    },
    phone: {
        type: [String],
    },
    website: {
        type: String,
    },
    openingHour: {
        type: [String],
    },
    priceRange: {
        type: String,
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

const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant",restaurantSchema);

export default Restaurant