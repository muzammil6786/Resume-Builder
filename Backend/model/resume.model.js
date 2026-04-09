const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title:    { type: String, default: "" },
    personalInfo: {
       name:      { type: String, default: "" },
      email:     { type: String, default: "" },
      phone:     { type: String, default: "" },
      location:  { type: String, default: "" },  // ← was missing
      github:    { type: String, default: "" },  // ← was missing
      linkedin:  { type: String, default: "" },  // ← was missing
      portfolio: { type: String, default: "" },  // ← was missing
      summary:   { type: String, default: "" },
    },
     education: [
      {
        school: { type: String, default: "" },
        degree: { type: String, default: "" },
        year:   { type: String, default: "" },
      },
    ],
    experience: [
      {
        company:     { type: String, default: "" },
        role:        { type: String, default: "" },
        duration:    { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],
    projects: [                              // ← was missing
      {
        title:       { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],
    technicalSkills: [{ type: String }],   // ← was missing
    softSkills:      [{ type: String }],   // ← was missing
    interests:       [{ type: String }],   // ← was missing
    achievements:    [{ type: String }],   // ← was missing
    template: {
      type: String,
      enum: ["classic", "modern", "minimal", "sidebar"],
      default: "modern",
    },
   settings: {
      fontSize:        { type: Number,  default: 14 },
      spacing:         { type: String,  default: "normal" },
      showEducation:   { type: Boolean, default: true },
      showExperience:  { type: Boolean, default: true },
      showProjects:    { type: Boolean, default: true },
      showSkills:      { type: Boolean, default: true },
      showAchievements:{ type: Boolean, default: true },
      showInterests:   { type: Boolean, default: true },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Resume", resumeSchema);
