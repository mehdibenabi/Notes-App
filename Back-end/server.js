require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString)



const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.use(cors({
    origin:"*",
})
);



app.listen(8000,()=>{
console.log("server is listning in port 8000");
});

app.get("/",(req,res) => {
    res.json({data : "hello"});
});

// mongoose.connect(`${MONGO_URI}`).then(() => {
//   console.log("Connected to MongoDB");
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// });



module.exports= app;