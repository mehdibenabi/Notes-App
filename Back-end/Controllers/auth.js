require("dotenv").config();
const User = require("../Models/user.model.js");
const jwt = require("jsonwebtoken");

const CreateUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName) {
      return res.status(400).json({
        error: true,
        message: "Please provide a full name",
      });
    }
    if (!email) {
      return res.status(400).json({
        error: true,
        message: "Please provide an email",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: true,
        message: "Please provide a password",
      });
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
      return res.json({
        error: true,
        message: "User already exists",
      });
    }

    const user = new User({
      fullName,
      email,
      password,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.SECRET_ACCESS_TOKEN, {
      expiresIn: "360000m",
    });

    return res.json({
      message: "Registration successful",
      error: false,
      user,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
    });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Request Body:", req.body);

    if (!email) {
      return res.status(400).json({
        error: true,
        message: "Please provide an email",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: true,
        message: "Please provide a password",
      });
    }

    const UserInfo = await User.findOne({ email });
    console.log("User Info from DB:", UserInfo);

    if (!UserInfo) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    if (UserInfo.password === password) {
      const user = { user: UserInfo };
      const accessToken = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, {
        expiresIn: "360000m",
      });

      return res.status(200).json({
        message: "User logged in successfully",
        error: false,
        accessToken,
        email,
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Error during user login:", {
      message: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      message: "An error occurred",
    });
  }
};

const GetUserInfo = async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.status(401);
  }

  return res.status(200).json({
    error: false,
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      id: isUser._id,
      CreatedOn: isUser.CreatedOn,
    },
  });
};

module.exports = { CreateUser, LoginUser, GetUserInfo };
