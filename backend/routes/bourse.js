const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const BourseManager = require("../models/bourse-manager");

router.get("/cac-large-60", checkAuth, async (req, res, next) => {
  try {
    res.send(await BourseManager.getCacLarge60());
  } catch (err) {
    res.status(500).send({ message: "Erreur lors de la récupération des données CAC Large 60" });
  }
});

router.get("/sp-500", checkAuth, async (req, res, next) => {
  try {
    res.send(await BourseManager.getSp500());
  } catch (err) {
    res.status(500).send({ message: "Erreur lors de la récupération des données S&P 500" });
  }
});

module.exports = router;
