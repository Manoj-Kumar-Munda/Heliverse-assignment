import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/school`
    );
    console.log("Connected to DB host:", connectionInstance.connection.host);
  } catch (error) {
    console.log("Failed to connect to database ", error);
    process.exit(1);
  }
};

export default connectDB;
