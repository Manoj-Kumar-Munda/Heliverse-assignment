import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./router/user.router.js";
import ApiResponse from "./utils/ApiResponse.js";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/user", userRouter);

app.use((err, req, res, next) => {
  const message = err?.message || "Internal server error";
  return res.status(500).json(new ApiResponse(500, [], message));
});

export default app;
