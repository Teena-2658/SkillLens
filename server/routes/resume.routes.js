import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { acceptResumeUpload } from "../middleware/upload.middleware.js";
import { uploadResume } from "../controllers/resume.controllers.js";

const resumeRoutes = Router();

resumeRoutes.post(
  "/upload",
  protectRoute,
  acceptResumeUpload,
  uploadResume
);

export default resumeRoutes;
