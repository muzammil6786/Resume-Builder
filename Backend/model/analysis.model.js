const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },
  overallScore: Number,
  atsScore: Number,
  contentScore: Number,
  skillsScore: Number,
  projectScore: Number,
  readabilityScore: Number,
  strengths: [String],
  weaknesses: [String],
  recommendations: [String],
  missingKeywords: [String],
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Analysis", schema);
