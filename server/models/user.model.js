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
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
