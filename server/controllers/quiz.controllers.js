import { asyncHandler } from "../utils/index.util.js";
import { ApiError, ApiResponse } from "../class/index.class.js";
import User from "../models/user.model.js";
import SkillProfile from "../models/skillProfile.model.js";
import {
  buildQuizSession,
  gradeQuiz,
  listQuizSkillIds,
} from "../services/quiz.service.js";
import { isQuizSkill } from "../constants/quizSkills.js";

export const getQuizSkills = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, "Quiz skills", {
      skills: listQuizSkillIds(),
    })
  );
});

export const getQuizQuestions = asyncHandler(async (req, res) => {
  let skills = req.body?.skills;

  if (Array.isArray(skills) && skills.length > 0) {
    skills = [
      ...new Set(
        skills.map((s) => String(s).toLowerCase().trim()).filter(isQuizSkill)
      ),
    ];
    if (skills.length === 0) {
      throw new ApiError(
        400,
        "None of the requested skills have a quiz. See GET /api/quiz/skills"
      );
    }
  } else {
    const user = await User.findById(req.user.id).select("detectedSkills");
    const detected = user?.detectedSkills || [];
    skills = detected.filter((s) => isQuizSkill(s));
  }

  if (skills.length === 0) {
    throw new ApiError(
      400,
      "No skills for quiz — upload a resume or pass skills: [\"react\",\"nodejs\", ...]"
    );
  }

  try {
    const session = buildQuizSession(skills);
    return res.status(200).json(
      new ApiResponse(200, "Quiz questions", {
        questions: session.questions,
        totalQuestions: session.totalQuestions,
        skills: session.skills,
        questionsPerSkill: session.questionsPerSkill,
        difficultyMixPerSkill: session.difficultyMix,
      })
    );
  } catch (e) {
    if (e.message === "NO_QUIZ_SKILLS") {
      throw new ApiError(400, "No valid quiz skills in the request");
    }
    if (e.message?.startsWith("INSUFFICIENT_QUESTIONS")) {
      throw new ApiError(500, "Question bank incomplete for a skill");
    }
    throw e;
  }
});

export const submitQuiz = asyncHandler(async (req, res) => {
  const { answers } = req.body;

  if (!Array.isArray(answers) || answers.length === 0) {
    throw new ApiError(400, "answers array is required");
  }

  const graded = gradeQuiz(answers);
  const userId = req.user.id;

  const skillResultsWithPrev = [];

  for (const r of graded.skillResults) {
    const prev = await SkillProfile.findOne({
      userId,
      skill: r.skill,
    }).select("depthScore");

    await SkillProfile.findOneAndUpdate(
      { userId, skill: r.skill },
      {
        $set: {
          depthScore: r.depthScore,
          depthLevel: r.depthLevel,
          lastAttempt: new Date(),
        },
        $inc: { quizAttempts: 1 },
      },
      { upsert: true, new: true }
    );

    skillResultsWithPrev.push({
      ...r,
      previousDepthScore:
        prev && typeof prev.depthScore === "number" ? prev.depthScore : null,
    });
  }

  return res.status(200).json(
    new ApiResponse(200, "Quiz graded", {
      skillResults: skillResultsWithPrev,
      overall: graded.overall,
    })
  );
});

export const getSkillProfiles = asyncHandler(async (req, res) => {
  const profiles = await SkillProfile.find({ userId: req.user.id }).sort({
    skill: 1,
  });
  return res.status(200).json(
    new ApiResponse(200, "Skill profiles", { profiles })
  );
});
