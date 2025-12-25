const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const WorkManager = require("../models/work-manager");


router.get("/story", checkAuth, async (req, res, next) => {
  const works = await WorkManager.getStory();
  res.send(works);
});


module.exports = router;
