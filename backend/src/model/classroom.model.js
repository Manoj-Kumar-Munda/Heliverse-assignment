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
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const Classroom = mongoose.model("Classroom", classroomSchema);
