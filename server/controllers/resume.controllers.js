import { asyncHandler } from "../utils/index.util.js";
import { ApiError, ApiResponse } from "../class/index.class.js";
import { extractText, detectSkills } from "../services/resume.service.js";

const ALLOWED_ROLES = ["frontend", "backend", "fullstack", "data", "java"];

export const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file?.buffer) {
    throw new ApiError(
      400,
      "No PDF file uploaded. Send one PDF (field name e.g. resume, file, or pdf) and set targetRole as text, not file"
    );
  }

  let targetRole = req.body?.targetRole?.trim() || req.user?.targetRole;

  if (!targetRole) {
    throw new ApiError(
      400,
      "targetRole is required — set it in profile or send it in the form"
    );
  }

  if (!ALLOWED_ROLES.includes(targetRole)) {
    throw new ApiError(400, "Invalid target role");
  }

  let text;
  try {
    text = await extractText(req.file.buffer);
  } catch {
    throw new ApiError(
      400,
      "Could not read this PDF. Try another file or ensure it is not image-only"
    );
  }

  const analysis = detectSkills(text, targetRole);

  return res.status(200).json(
    new ApiResponse(200, "Resume analyzed successfully", {
      targetRole,
      ...analysis,
    })
  );
});
