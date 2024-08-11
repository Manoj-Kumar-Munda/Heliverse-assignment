import { Router } from "express";
import {
  assignTeacherToStudent,
  deleteUser,
  getCurrentUser,
  getStudents,
  getTeachers,
  login,
  signup,
  updateStudent,
  updateTeacher,
} from "../controller/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = Router();

userRouter.route("/").post(verifyToken, signup);
userRouter.route("/login").post(login);
userRouter.route("/teachers").get(verifyToken, getTeachers);
userRouter.route("/students").get(verifyToken, getStudents);
userRouter.route("/assign-teacher").post(verifyToken, assignTeacherToStudent);
userRouter.route("/updateStudent").put(verifyToken, updateStudent);
userRouter.route("/updateTeacher").put(verifyToken, updateTeacher);
userRouter.route("/delete/:id").delete(verifyToken, deleteUser);
userRouter.route("/current-user").get(verifyToken, getCurrentUser);

export default userRouter;
