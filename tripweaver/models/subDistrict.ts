import mongoose, { Schema } from "mongoose";


const subDistrictSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    districtRefID: {
        type: Number,
        required: true
    },
    idRef: {
        type: Number,
        required: true
    },
},{ timestamps: true }
)

const SubDistrict = mongoose.models.SubDistricts || mongoose.model("SubDistricts",subDistrictSchema);

export default SubDistrict