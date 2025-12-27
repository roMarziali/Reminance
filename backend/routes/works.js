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

router.delete("/work/:workId", checkAuth, async (req, res, next) => {
  const workId = req.params.workId;
  await WorkManager.deleteWork(workId);
  res.send(true);
});


module.exports = router;
