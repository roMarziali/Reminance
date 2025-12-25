const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const WorkManager = require("../models/work-manager");


router.get("/works", checkAuth, async (req, res, next) => {
  const works = await WorkManager.getWorks();
  res.send(works);
});


module.exports = router;
