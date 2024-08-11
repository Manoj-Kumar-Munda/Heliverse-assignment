import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  assignTeacher,
  createClassroom,
  getClassrooms,
  getStudents,
} from "../controller/classroom.controller.js";

const router = Router();

router.route("/").post(verifyToken, createClassroom).get(getClassrooms);
router.route("/:classroomId/assign-teacher").post(verifyToken, assignTeacher);
router.route("/students").get(verifyToken, getStudents);

export default router;
