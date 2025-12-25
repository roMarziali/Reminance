const express = require("express");
const router = express.Router();
const { authenticate, generateToken } = require("../models/auth");

router.post("/login", async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await authenticate(login, password);
    if (user) {
      const token = await generateToken(user);
      res.status(200).json(token);
    } else {
      res.status(401).send();
    }
  } catch (err) {
    res.status(401).send();
  }
});

module.exports = router;
