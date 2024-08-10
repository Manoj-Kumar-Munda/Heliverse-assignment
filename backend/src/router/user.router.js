import { Router } from "express";
import { login, signup } from "../controller/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = Router();

userRouter.route("/").post(verifyToken, signup);
userRouter.route("/login").post(login);

export default userRouter;
