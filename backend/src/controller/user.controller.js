import mongoose, { Mongoose } from "mongoose";
import { User } from "../model/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { roles } from "../utils/constants.js";
import { isAuthorizedToCreateAccount } from "../utils/helpers.js";
import { Classroom } from "../model/classroom.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  if (!accessToken || !refreshToken) {
    throw new Error("Failed to generate tokens");
  }

  return { accessToken, refreshToken };
};

const signup = async (req, res, next) => {
  const { email, password, role } = req.body;

  try {
    if (role === "Student") {
      const isAuthorized = isAuthorizedToCreateAccount(role, req?.user.role);
      if (!isAuthorized) {
        return res.status(403).json(new ApiResponse(403, "", "Not authorized"));
      }
    }

    if (role === "Teacher") {
      const isAuthorized = isAuthorizedToCreateAccount(role, req?.user.role);
      if (!isAuthorized) {
        return res.status(403).json(new ApiResponse(403, "", "Not authorized"));
      }
    }

    if (role === "Principal") {
      //if principal is already registered return error
      const isAdminExist = await User.findOne({ role });
      if (isAdminExist) {
        return res.status(403).json(new ApiResponse(403, "", "Not authorized"));
      }
    }

    if (!email) {
      return res
        .status(400)
        .json(new ApiResponse(400, [], "Email is required"));
    }
    if (!password) {
      return res
        .status(400)
        .json(new ApiResponse(400, [], "Password is required"));
    }
    if (!role) {
      return res.status(400).json(new ApiResponse(400, [], "role is required"));
    }

    if (!roles.includes(role)) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            "",
            "Invalid role : Only Principal, Teacher or Student is allowed "
          )
        );
    }

    const isEmailRegistered = await User.findOne({ email });
    if (isEmailRegistered) {
      return res
        .status(400)
        .json(new ApiResponse(400, [], "Email already registered"));
    }
    const user = await User.create({
      email,
      password,
      role,
    });

    if (!user) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            "",
            "Something went wrong while registering user"
          )
        );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, user, "Signed up successfully"));
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "Email is required"));
    }
    if (!password) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "Password is required"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json(new ApiResponse(404, "", "User not found"));
    }

    const isPasswordMatched = await user.isPasswordCorrect(password);
    console.log("isPassMatched : ", isPasswordMatched);
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json(new ApiResponse(401, "", "Password didn't match"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user?._id
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, //1day
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Successfully logged in"));
  } catch (error) {
    next(error);
  }
};

const getTeachers = async (req, res, next) => {
  try {
    if (req.user.role !== "Principal") {
      return res.status(403).json(new ApiResponse(403, "", "Not authorized"));
    }
    const teachers = await User.find({ role: "Teacher" }).select(
      "-password -refreshToken"
    );
    return res.status(200).json(new ApiResponse(200, teachers));
  } catch (error) {
    next(error);
  }
};

const getStudents = async (req, res, next) => {
  try {
    if (req.user.role !== "Principal") {
      return res.status(403).json(new ApiResponse(403, "", "Not authorized"));
    }
    const students = await User.find({ role: "Student" }).select(
      "-password -refreshToken"
    );
    return res.status(200).json(new ApiResponse(200, students));
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  const { name, email, studentId } = req.body;
  try {
    if (!(req.user.role === "Teacher" || req.user.role === "Principal")) {
      return res.status(403).json(new ApiResponse(403, "", "Not authorized"));
    }
    const updatedStudent = await User.findByIdAndUpdate(
      studentId,
      {
        name,
        email,
      },
      { new: true }
    ).select("-password -refreshToken");

    if (!updatedStudent) {
      return res
        .status(400)
        .json(new ApiResponse(500, "", "Failed to update student"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updatedStudent, "Data updated"));
  } catch (error) {
    next(error);
  }
};

const updateTeacher = async (req, res, next) => {
  const { name, email, classroom, teacherId } = req.body;
  try {
    if (req.user.role !== "Principal") {
      return res.status(403).json(new ApiResponse(403, "", "Not authorized"));
    }
    const updatedTeacher = await User.findByIdAndUpdate(
      teacherId,
      {
        name,
        email,
        classroom,
      },
      { new: true }
    ).select("-password -refreshToken");

    if (!updatedTeacher) {
      return res
        .status(400)
        .json(new ApiResponse(500, "", "Failed to update teacher"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updatedTeacher, "Data updated"));
  } catch (error) {
    next(error);
  }
};

const assignTeacherToStudent = async (req, res, next) => {
  const { studentId, teacherId } = req.body;
  try {
    if (req.user.role !== "Principal") {
      return res.status(403).json(new ApiResponse(403, "", "Not authorized"));
    }
    if (!studentId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "studentId required"));
    }
    if (!teacherId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "teacherId required"));
    }

    const student = await User.findOne({
      role: "Student",
      _id: new mongoose.Types.ObjectId(studentId),
    });
    // console.log(student);
    if (!student) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "Student doesn't exist"));
    }
    const teacher = await User.findOne({
      role: "Teacher",
      _id: new mongoose.Types.ObjectId(teacherId),
    });
    console.log(teacher);
    if (!teacher) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "Teacher doesn't exist"));
    }

    if (!teacher?.classroom) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "First assign classroom to teacher"));
    }
    const updatedStudent = await User.findByIdAndUpdate(student._id, {
      teacher: teacher._id,
      classroom: teacher.classroom,
    }).select("-password -refreshToken");

    return res
      .status(200)
      .json(new ApiResponse(200, updatedStudent, "students data updated"));
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (req.user.role !== "Principal") {
      return res.status(403).json(new ApiResponse(403, "", "Not authorized"));
    }
    if (!id) {
      return res.status(400).json(new ApiResponse(400, "", "Id is required"));
    }
    const user = await User.findByIdAndDelete(id);
    console.log("deletedUser: ", user);

    return res.status(200).json(new ApiResponse(200, "", "User deleted"));
  } catch (error) {
    next(error);
  }
};

export {
  signup,
  login,
  getTeachers,
  getStudents,
  assignTeacherToStudent,
  updateStudent,
  updateTeacher,
  deleteUser,
};
