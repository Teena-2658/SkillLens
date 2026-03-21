import pdfParse from "pdf-parse/lib/pdf-parse.js";

const SKILL_MASTER_LIST = [
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
  "javascript",
  "typescript",
  "express",
  "nextjs",
  "redux",
  "tailwind",
  "bootstrap",
  "html",
  "css",
  "mysql",
  "postgresql",
  "firebase",
  "docker",
  "aws",
  "linux",
  "c",
  "cpp",
  "php",
  "django",
  "flask",
];
const ROLE_REQUIRED_SKILLS = {
  frontend: [
    "react",
    "javascript",
    "html",
    "css",
    "git",
    "redux",
    "typescript",
  ],
  backend: [
    "nodejs",
    "mongodb",
    "sql",
    "restapi",
    "git",
    "systemdesign",
    "dsa",
  ],
  fullstack: [
    "react",
    "nodejs",
    "mongodb",
    "restapi",
    "git",
    "javascript",
    "sql",
  ],
  data: ["python", "sql", "mongodb", "flask", "postgresql", "dsa", "git"],
  java: ["java", "sql", "dsa", "git", "systemdesign", "mysql", "restapi"],
};

export const extractText = async (buffer) => {
  try {
    const data = await pdfParse(buffer);

    if (!data.text || data.text.trim().length === 0) {
      throw new Error("PDF_EXTRACTION_FAILED");
    }

    return data.text;
  } catch (error) {
    throw new Error("PDF_EXTRACTION_FAILED");
  }
};

export const detectSkills = (text, targetRole) => {
  const lowerText = text.toLowerCase();

  const detectedSkills = SKILL_MASTER_LIST.filter((skill) =>
    lowerText.includes(skill.toLowerCase())
  );

  const roleRequiredSkills = ROLE_REQUIRED_SKILLS[targetRole] || [];

  const missingSkills = roleRequiredSkills.filter(
    (skill) => !detectedSkills.includes(skill)
  );

  const coveredCount = roleRequiredSkills.filter((skill) =>
    detectedSkills.includes(skill)
  ).length;

  const coveragePercent =
    roleRequiredSkills.length > 0
      ? Math.round((coveredCount / roleRequiredSkills.length) * 100)
      : 0;

  return {
    detectedSkills,
    missingSkills,
    roleRequiredSkills,
    coveragePercent,
    message: `${coveredCount} of ${roleRequiredSkills.length} required skills detected in your resume for the ${targetRole} role.`,
  };
};
