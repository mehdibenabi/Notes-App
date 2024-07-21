require("dotenv").config();
const User = require("../Models/user.model.js");
const jwt = require("jsonwebtoken");

const CreateUser = async (req,res ) =>{

    try {
        const {fullName,email,password}=req.body;

        if(!fullName){
            return res.status(400).json({
                error : true,
                message : "Please Provide a fullName"
            });
        }
        if(!email){
            return res.status(400).json({
              error: true,
              message: "Please Provide an email",
            }); }
            
        if(!password){
            return res.status(400).json({
              error: true,
              message: "Please Provide a password",
            });
        }

        const isUser = await User.findOne({email:email});

        if(isUser){
            return res.json(
                {
                    error:true,
                    message:"User already exist",
                }
            )
        }

        const user = new User({
            fullName : fullName,
            email: email,
            password:password,
        });

        await user.save();

        const accessToken = jwt.sign({ user }, process.env.SECRET_ACCESS_TOKEN,{
            expiresIn:"360000m"
        });

        return res.json({
            error:false,
            user,
            accessToken,
            message:"Registration Successful",
        })
    
    } catch (error) {
        return res.status(500).json({
            message :"An error occured"
        })
    }
}


const LoginUser = async (req,res) =>{
    try {
        const {email,password} = req.body;

        if(!email){
            return res.status(400).json({
              error: true,
              message: "Please Provide an email",
            });
        }
        if(!password){
            return res.json({
              error: true,
              message: "Please Provide an password",
            });
        }

        const isUser = await User.findOne({email:email});
        if(!isUser){
            return  res.json({
                error :true,
                message :"User doesn't exist"
            })
        }
        }
        
    catch (error) {
        return res.status(500).json({
          error: true,
          message: "An error occured",
        });
    }
}


module.exports = {CreateUser , LoginUser};