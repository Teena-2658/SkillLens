import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { asyncHandler } from "../utils/index.util.js";
import { ApiResponse } from "../class/index.class.js";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get("/", protectRoute, asyncHandler(async (req, res) => {
  const role = req.user?.targetRole || "frontend";
  const p = path.join(__dirname, "../data/interviews.json");
  const bank = JSON.parse(readFileSync(p, "utf8"));
  
  let questions = bank[role] || bank["frontend"];
  
  // Randomize questions
  questions = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
  
  return res.status(200).json(
    new ApiResponse(200, "Interview questions fetched", { questions })
  );
}));

export default router;
