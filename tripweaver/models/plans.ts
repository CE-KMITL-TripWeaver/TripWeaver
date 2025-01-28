import mongoose, { Schema } from "mongoose";

const plansSchema = new Schema(
  {
    tripName: {
      type: String,
      required: true,
    },
    travelers: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    dayDuration: {
      type: Number,
      required: true,
    },
    accommodations: [
      {
        accommodationID: {
          type: String,
          required: true,
        },
      },
    ],
    plans: [
      {
        planName: {
          type: String,
        },
        places: [
          {
            placeID: {
              type: String,
              required: true,
            },
            type: {
              type: String,
              required: true,
              enum: ["ATTRACTION", "RESTAURANT"],
            },
            duration: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const PlanTrips = mongoose.models.PlanTrips || mongoose.model("PlanTrips", plansSchema);

export default PlanTrips;
