import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send("Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password"
    );

    if (!user) {
      return res.status(400).json(new ApiResponse(400, [], "Invalid token"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
