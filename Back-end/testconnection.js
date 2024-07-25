const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./Models/user.model"); // Adjust path as needed

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to db");

    const users = await User.find();
    console.log(users);
  } catch (error) {
    console.error("Error during test:", {
      message: error.message,
      stack: error.stack,
    });
  } 
};

testConnection();
