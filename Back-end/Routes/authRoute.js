const express = require("express");
const router = express.Router();
const { CreateUser, LoginUser, GetUserInfo } = require("../Controllers/auth");
const { authentificateToken } = require("../Middlewares/authToken");

// Create user
router.post("/createuser", CreateUser);

// Login user
router.post("/login", LoginUser);

// Get user
router.get("/get-user", authentificateToken, GetUserInfo);

module.exports = router;
