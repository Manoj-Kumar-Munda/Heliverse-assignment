import { Router } from "express";
import {
  assignTeacherToStudent,
  getStudents,
  getTeachers,
  login,
  signup,
} from "../controller/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = Router();

userRouter.route("/").post(verifyToken, signup);
userRouter.route("/login").post(login);
userRouter.route("/teachers").get(verifyToken, getTeachers);
userRouter.route("/students").get(verifyToken, getStudents);
userRouter.route("/assign-teacher").post(verifyToken, assignTeacherToStudent);

export default userRouter;
