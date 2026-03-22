import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getQuizSkills,
  getQuizQuestions,
  submitQuiz,
  getSkillProfiles,
} from "../controllers/quiz.controllers.js";

const quizRoutes = Router();

quizRoutes.get("/skills", protectRoute, getQuizSkills);
quizRoutes.get("/profiles", protectRoute, getSkillProfiles);
quizRoutes.post("/questions", protectRoute, getQuizQuestions);
quizRoutes.post("/submit", protectRoute, submitQuiz);

export default quizRoutes;
