import mongoose, { Schema } from "mongoose";
import { days } from "../utils/constants.js";

const classroomSchema = Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  day: {
    type: String,
    enum: {
      values: days,
      message: "{VALUE} is not supported",
    },
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

export const Classroom = mongoose.model("Classroom", classroomSchema);
