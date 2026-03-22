import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    targetRole: {
      type: String,
      default: null,
      enum: ["frontend", "backend", "fullstack", "data", "java", null],
    },
    /** Last known skills from resume analysis (lowercase ids). Used as default quiz scope. */
    detectedSkills: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
