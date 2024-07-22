const express = require("express");
const router = express.Router();


const { CreateUser, LoginUser, GetUserInfo } = require("../Controllers/auth");
const { authentificateToken } = require("../Middlewares/authToken");

//create user
router.post("/createuser",CreateUser);

// login up user
router.post("/login",LoginUser);

// get a user

router.get("/get-user",authentificateToken,GetUserInfo);

module.exports = router;