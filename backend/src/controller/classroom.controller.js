import { Classroom } from "../model/classroom.model.js";
import { User } from "../model/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { days } from "../utils/constants.js";
import { isValidTimeFormat } from "../utils/helpers.js";

const createClassroom = async (req, res, next) => {
  const { name, startTime, endTime, day } = req.body;

  try {
    if (req.user.role !== "Principal") {
      return res.status(403).json(new ApiResponse(403, "", "Not authorized"));
    }
    if (!name) {
      return res.status(400).json(new ApiResponse(400, "", "Name is required"));
    }
    if (!startTime) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "startTime is required"));
    }
    if (!endTime) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "endTime is required"));
    }
    if (!day) {
      return res.status(400).json(400, "", "day is required");
    }
    if (!days.includes(day)) {
      return res.status(400).json(400, "", "Invalid day");
    }

    const isClassNameExists = await Classroom.findOne({ name });
    if (isClassNameExists) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "Classname already exists"));
    }

    let isValidTime;
    isValidTime = isValidTimeFormat(startTime);
    isValidTime = isValidTimeFormat(endTime);

    if (!isValidTime) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "Invalid time format"));
    }

    const newClassroom = await Classroom.create({
      name,
      startTime,
      endTime,
      day,
    });

    if (!newClassroom) {
      return res
        .status(500)
        .json(new ApiResponse(500, "", "Failed to create classroom"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, newClassroom, "classroom created"));
  } catch (error) {
    next(error);
  }
};

const getClassrooms = async (req, res, next) => {
  try {
    const classrooms = await Classroom.find();
    console.log(classrooms);
    return res.status(200).json(new ApiResponse(200, classrooms, ""));
  } catch (error) {
    next(error);
  }
};

const getStudents = async (req, res, next) => {
  try {
    if (req.user.role !== "Teacher") {
      return res.status(403).json(new ApiResponse(403, "", "Not authorized"));
    }
    const teacher = req.user;
    console.log(teacher);

    const classroom = teacher?.classroom;
    if (!classroom) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "classroom is not assigned"));
    }
    const students = await User.find({ role: "Student", classroom }).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, students));
  } catch (error) {
    next(error);
  }
};

const assignTeacher = async (req, res, next) => {
  const { teacherId } = req.body;
  const { classroomId } = req.params;
  try {
    if (req.user.role !== "Principal") {
      return res.status(400).json(new ApiResponse(403, "", "Not authorized"));
    }
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "Invalid classroomId"));
    }
    const teacher = await User.findByIdAndUpdate(
      teacherId,
      {
        classroom: classroomId,
      },
      { new: true }
    ).select("-password -refreshToken");
    if (!teacher) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "Invalid teacherId"));
    }
    return res.status(200).json(new ApiResponse(200, teacher));
  } catch (error) {
    next(error);
  }
};

export { createClassroom, getClassrooms, assignTeacher, getStudents };
