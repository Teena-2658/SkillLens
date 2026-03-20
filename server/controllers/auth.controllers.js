
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/index.util.js";
import { ApiError, ApiResponse } from "../class/index.class.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const googleAuth = asyncHandler(async (req, res) => {
  const { name, email, targetRole } = req.body;

  if (!name || !email || !targetRole) {
    throw new ApiError(400, "Name, email and targetRole are required");
  }

  const allowedRoles = ["frontend", "backend", "fullstack", "data", "java"];
  if (!allowedRoles.includes(targetRole)) {
    throw new ApiError(400, "Invalid target role");
  }

  let user = await User.findOne({ email });
  let isNewUser = false;

  if (!user) {
    user = await User.create({ name, email, targetRole });
    isNewUser = true;
  }

  const token = generateToken(user._id);

  return res.status(isNewUser ? 201 : 200).json(
    new ApiResponse(
      isNewUser ? 201 : 200,
      isNewUser ? "Account created successfully" : "Login successful",
      {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          targetRole: user.targetRole,
          createdAt: user.createdAt,
        },
      }
    )
  );
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Profile fetched successfully", {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        targetRole: user.targetRole,
        createdAt: user.createdAt,
      },
    })
  );
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { targetRole } = req.body;

  const allowedRoles = ["frontend", "backend", "fullstack", "data", "java"];

  if (!targetRole || !allowedRoles.includes(targetRole)) {
    throw new ApiError(400, "Invalid target role");
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { targetRole },
    { new: true }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Profile updated successfully", {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        targetRole: user.targetRole,
      },
    })
  );
});
