const Resume = require("../model/resume.model");

const createResume = async (userId, data) => {
  return await Resume.create({ ...data, user: userId });
};

const getResumes = async (userId) => {
  return await Resume.find({ user: userId });
};

const updateResume = async (userId, id, data) => {
  const resume = await Resume.findById(id);

  if (!resume || resume.user.toString() !== userId)
    throw new Error("Unauthorized");

  return await Resume.findByIdAndUpdate(id, data, { new: true });
};

const deleteResume = async (userId, id) => {
  const resume = await Resume.findById(id);

  if (!resume || resume.user.toString() !== userId)
    throw new Error("Unauthorized");

  await resume.deleteOne();
};


const getResumeById = async (userId, id) => {
  const resume = await Resume.findById(id);

  if (!resume || resume.user.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  return resume;
};

module.exports = { createResume, getResumes, updateResume, deleteResume, getResumeById };