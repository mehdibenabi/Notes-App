require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");
const authRoute = require("../Back-end/Routes/authRoute");

mongoose.connect(config.connectionString).then(console.log("connected to db")).catch((err)=>{console.log(err)});



const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const MONGO_URI = process.env.MONGO_URI;



// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:"*",}));


//Routes

app.use("/",authRoute);




app.get("/",(req,res) => {
    res.json({data : "hello"});
});



// mongoose.connect(`${MONGO_URI}`).then(() => {
//   console.log("Connected to MongoDB");
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// });


app.listen(8000, () => {
  console.log("server is listning in port 8000");
});
module.exports= app;