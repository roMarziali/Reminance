const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const WorkManager = require("../models/work-manager");


router.get("/works", checkAuth, async (req, res, next) => {
  const works = await WorkManager.getWorks();
  res.send(works);
});

router.post("/work", checkAuth, async (req, res, next) => {
  await WorkManager.addWork(req.body);
  res.send(true);
});

router.put("/work/:workId", checkAuth, async (req, res, next) => {
  const workId = req.params.workId;
  await WorkManager.editWork(workId, req.body);
  res.send(true);
});

router.delete("/work/:workId", checkAuth, async (req, res, next) => {
  const workId = req.params.workId;
  await WorkManager.deleteWork(workId);
  res.send(true);
});

router.post("/session/:workId", checkAuth, async (req, res, next) => {
  const workId = req.params.workId;
  await WorkManager.addSession(workId, req.body);
  res.send(true);
});

router.put("/session/:workId/:sessionId", checkAuth, async (req, res, next) => {
  const workId = req.params.workId;
  const sessionId = req.params.sessionId;
  await WorkManager.editSession(workId, sessionId, req.body);
  res.send(true);
});

router.delete("/session/:workId/:sessionId", checkAuth, async (req, res, next) => {
  const workId = req.params.workId;
  const sessionId = req.params.sessionId;
  await WorkManager.deleteSession(workId, sessionId);
  res.send(true);
});


module.exports = router;
