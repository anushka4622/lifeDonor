const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//register controller
const registerController = async(req,res)=>{
   try {
    const existingUser= await userModel.findOne({email:req.body.email})
    //validation
    if(existingUser){
        return res.status(200).send({
            success:false,
            message:'User Already Exists'
        })
    }

    //hashpassword
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    req.body.password = hashedPassword

    //rest data
    const user = new userModel(req.body)
    await user.save()
    return res.status(201).send({
        success:true,
        message:"User Registerd Successfully",
        user
    })
   } 

   catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error In Register API",
        error
    })
   }
}


//login callback or controller
const loginController = async(req,res)=>{
  try {
    const user = await userModel.findOne({email:req.body.email})
    if(!user){
        return res.status(404).send({
            success:false,
            message:"Invalid Credentials",
        })
    }
    //check role
    if(user.role != req.body.role){
        return res.status(500).send({
            success:false,
            message:"Role doesn't match",
        })
    }

    //if user exists - compare password
    const comparePassword = await bcrypt.compare(req.body.password,user.password)
    if(!comparePassword){
        res.status(500).send({
        success:false,
        message:"Invalid Credentials"
       })
    }

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
    return res.status(200).send({
        success:true,
        message:"Login Successfully",
        token,
        user
    })
  } 
  catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error In Login API",
        error
    })
  }
}

//get current user controller
const currentUserController = async(req,res)=>{
   try {
    const user = await userModel.findOne({_id:req.user.userId})
    return res.status(200).send({
        success:true,
        message:"User Fetched Successfully",
        user
    })
   } catch (error) {
    console.log(error)
    return  res.status(500).send({
        success:false,
        message:"unable to get current user",
        error
    })
   }
}

module.exports = {registerController,loginController,currentUserController}