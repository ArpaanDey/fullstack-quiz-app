import mongoose from "mongoose";

const performanceEnum = ["excellent", "good", "average", "needs work"];

const ResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    technology: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "html",
        "css",
        "js",
        "react",
        "node",
        "mongodb",
        "java",
        "python",
        "cpp",
        "bootstrap",
      ],
    },

    level: {
      type: String,
      required: true,
      enum: ["basic", "intermediate", "advanced"],
    },

    totalQuestions: {
      type: Number,
      required: true,
      min: 0,
    },

    correct: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    wrong: {
      type: Number,
      min: 0,
      default: 0,
    },

    score: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    performance: {
      type: String,
      enum: performanceEnum,
      default: "needs work",
    },
  },
  { timestamps: true }
);

// Calculate score + performance
ResultSchema.pre("save", function (next) {
  const total = Number(this.totalQuestions) || 0;
  const correct = Number(this.correct) || 0;

  this.score = total ? Math.round((correct / total) * 100) : 0;

  if (this.score >= 85) this.performance = "excellent";
  else if (this.score >= 65) this.performance = "good";
  else if (this.score >= 45) this.performance = "average";
  else this.performance = "needs work";

  if ((this.wrong === undefined || this.wrong === null) && total) {
    this.wrong = Math.max(0, total - correct);
  }

  next();
});

const Result =
  mongoose.models.Result || mongoose.model("Result", ResultSchema);

export default Result;
