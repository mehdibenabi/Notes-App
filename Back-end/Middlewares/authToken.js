const jwt = require("jsonwebtoken");

const authentificateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Get token from "Bearer <token>"

  if (token == null) return res.sendStatus(401); // No token provided

  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403); // Token is not valid
    req.user = user;
    next();
  });
};

module.exports = { authentificateToken };
