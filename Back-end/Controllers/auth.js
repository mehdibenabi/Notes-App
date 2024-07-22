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
            message:"Registration Successful",
            error:false,
            user,
            accessToken,
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

        const UserInfo = await User.findOne({email:email});
        if(!UserInfo){
            return  res.json({
                error :true,
                message :"User not found"
            })
        }

        if(UserInfo.email==email && UserInfo.password==password){
            const user = {user : UserInfo}
            const accessToken = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN , {
                expiresIn : "360000m"
            });

            return res.json({
                message :"user logged in succefully",
                error:false,
                accessToken,
                email,
            });
        }

            else {
                return res.status(401).json({
                    error:true,
                    message:"Invalid Credentials"
                });
            }
        }


        
        
    catch (error) {
        return res.status(500).json({
          error: true,
          message: "An error occured",
        });
    }
}

const GetUserInfo = async (req,res) =>{

    const {user}=req.user;

    const isUser = await User.findOne({_id:user._id});

    if (!isUser) {
      return res.status(401);
    }

    return res.status(200).json({
      error: false,
      data: {
        fullName: isUser.fullName,
        email:isUser.email,
        id:isUser._id,
        CreatedOn : isUser.CreatedOn
      }
    });
}

module.exports = {CreateUser , LoginUser , GetUserInfo};