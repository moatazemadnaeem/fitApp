import mongoose from "mongoose";
import { FitRes } from "../types";
const fitschema = new mongoose.Schema<FitRes>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  timePeriod: {
    type: Date,
    required: true,
  },
  maxAttendees: {
    type: Number,
    required: true,
    default: 100,
  },
  attendingUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const FitClasses = mongoose.model<FitRes>("classes", fitschema);
export default FitClasses;
