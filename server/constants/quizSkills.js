export const QUIZ_SKILL_IDS = [
  "react",
  "nodejs",
  "mongodb",
  "sql",
  "python",
  "java",
  "dsa",
  "restapi",
  "systemdesign",
  "git",
];

export const QUESTIONS_PER_SKILL = 10;

export const DIFFICULTY_MIX = Object.freeze({
  easy: 3,
  medium: 4,
  hard: 3,
});

export const isQuizSkill = (skillId) =>
  QUIZ_SKILL_IDS.includes(String(skillId).toLowerCase());
