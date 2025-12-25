const jwt = require("jsonwebtoken");
const fs = require('fs');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const jwtKey = fs.readFileSync('./data/jwt-key', 'utf8');
    jwt.verify(token, jwtKey);
    next();
  } catch (error) {
    res.status(401).send({ message: "Auth failed" });
  }
};
