import mongoose, { Schema } from "mongoose";

const classroomSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  day: {
    type: String,
    enum: {
      values: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
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
});

export const Classroom = mongoose.model("Classroom", classroomSchema);
