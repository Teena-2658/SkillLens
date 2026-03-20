import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  googleAuth,
  getProfile,
  updateProfile,
} from "../controllers/auth.controllers.js";

const authRouters = Router();

authRouters.post("/google", googleAuth);

authRouters.get("/profile", protectRoute, getProfile);
authRouters.put("/profile", protectRoute, updateProfile);

export default authRouters;
