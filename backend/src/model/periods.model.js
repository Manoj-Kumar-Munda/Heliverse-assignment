import mongoose from "mongoose";

const periodSchema = mongoose.Schema({
  subject: {
    type: String,
    enum: {
      values: [
        "Maths",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "History",
        "Economics",
        "Civics",
        "Geography",
      ],
      message: "{VALUE} is not supported",
    },
    reuired: true,
  },
  teacherId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    reuired: true,
  },
});

//pre-save methods to validate start time and endTime

export const Period = mongoose.model("Period", periodSchema);
