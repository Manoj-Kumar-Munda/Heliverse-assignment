import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  role: {
    type: String,
    enum: {
      values: ["Principal", "Teacher", "Student"],
      message: "{VALUE} is not supported",
    },
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
