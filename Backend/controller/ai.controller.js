const Resume = require("../model/resume.model.js");
const Analysis = require("../model/analysis.model.js");
const { analyzeResume, matchJob, tailorResume } = require("../services/aiService.js");
async function owned(id, user) {
  const r = await Resume.findOne({ _id: id, user });
  if (!r) throw new Error("Resume not found");
  return r;
}

const analyze = async function(req, res) {
  try {
    const r = await owned(
      req.body.resumeId,
      req.user.userId
    );

    const result = await analyzeResume(
      r.toObject()
    );

    const saved = await Analysis.create({
      user: req.user.userId,
      resume: r._id,
      ...result
    });

    res.json({
      analysis: saved
    });
  } catch (e) {
    console.log("ANALYZE ERROR:", e);

    res.status(400).json({
      message: e.message
    });
  }
};

const analytics = async function (req, res) {
  try {
    const userId = req.user.userId;

    const analyses = await Analysis.find({
      user: userId,
    })
      .populate("resume", "title personalInfo.name")
      .sort({ createdAt: 1 })
      .limit(30);

    const jobs = await Analysis.find({
      user: userId,
    })
      .populate("resume", "title personalInfo.name")
      .sort({ createdAt: -1 })
      .limit(30);

    res.json({
      analyses,
      jobs,
    });
  } catch (e) {
    console.error("ANALYTICS ERROR:", e);

    res.status(500).json({
      message: e.message,
    });
  }
};

// export async function jobMatch(req, res) {
//   try {
//     const r = await owned(req.body.resumeId, req.user.id);
//     const result = await matchJob(r.toObject(), req.body.jobDescription || "");
//     const saved = await JobAnalysis.create({
//       user: req.user.id,
//       resume: r._id,
//       jobDescription: req.body.jobDescription,
//       ...result,
//     });
//     res.json({ analysis: saved });
//   } catch (e) {
//     res.status(400).json({ message: e.message });
//   }
// }
// export async function tailor(req, res) {
//   try {
//     const r = await owned(req.body.resumeId, req.user.id);
//     res.json({
//       tailored: await tailorResume(r.toObject(), req.body.jobDescription || ""),
//     });
//   } catch (e) {
//     res.status(400).json({ message: e.message });
//   }
// }

module.exports = {
  analyze,
  analytics,
};