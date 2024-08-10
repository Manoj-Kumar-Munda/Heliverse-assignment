import { Router } from "express";


const userRouter = Router();

userRouter.route("/").post()

export default userRouter;