import { Schema } from "mongoose";

const locationSchema = new Schema({
    address: { type: String, required: true },
    province: { type: String, required: true },
    district: { type: String, required: true },
    subDistrict: { type: String, required: true },
    ISO_3166_code: { type: Number, required: true },
    zip_code: { type: Number, required: true },
    geo_code: { type: Number, required: true },
}, { _id: false });

export default locationSchema;