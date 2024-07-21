const express = require("express");
const router = express.Router();


const {CreateUser , LoginUser} = require("../Controllers/auth");

router.post("/createUser",CreateUser);
router.post("/login",LoginUser);

module.exports = router;