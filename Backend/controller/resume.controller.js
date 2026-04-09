const service = require("../service/resume.service");

const create = async (req, res) => {
  const data = await service.createResume(req.user.userId, req.body);
  res.json(data);
};

const getAll = async (req, res) => {
  const data = await service.getResumes(req.user.userId);
  res.json(data);
};

const update = async (req, res) => {
  const data = await service.updateResume(
    req.user.userId,
    req.params.id,
    req.body
  );
  res.json(data);
};

const remove = async (req, res) => {
  await service.deleteResume(req.user.userId, req.params.id);
  res.json({ message: "Deleted" });
};


const getOne = async (req, res) => {
  const data = await service.getResumeById(
    req.user.userId,
    req.params.id
  );
  res.json(data);
};

module.exports = { create, getAll, update, remove, getOne };