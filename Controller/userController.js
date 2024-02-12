//register
const users = require("../Models/userSchema");

const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const admins = require("../Models/adminSchema");
// const user = require('../Models/userSchema')
exports.register= async(req,res)=>{
  
    const {username,phon,email,password}= req.body
    
  try{
    const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(406).json("Account already exist !! please Login")
    }else{
        const newUser = new users({
        username,phon,email,password})
        await newUser.save()
        res.status(200).json(newUser)
    }

  }
  catch(err){
    res.status(401).json(`register API failed ,error:${err}`)
  }
}



exports.login=async (req,res)=>{

  const {email,password}=req.body
try{
  const existingUser = await users.findOne({email,password})
  if(existingUser){
  
    const token= jwt.sign({userId:existingUser._id},"supersecretkey12345")

    res.status(200).json({
      
      existingUser,token
    })

  }else{
    res.status(404).json(`Incorrect Email / Password`)
  }
}catch(err){
  res.status(401).json(`Login API Faild , Error ${err}`)
}
}



//admin register 
exports.adminregister= async(req,res)=>{
  
  const {username,turfname,regno,email,turfemail,password,phon,turflocation}= req.body
try{
  const existingUser = await admins.findOne({email})
  if(existingUser){
      res.status(406).json("Account already exist !! please Login")
  }else{
      const newUser = new admins({
        username,turfname,regno,email,turfemail,password,phon,turflocation,profile:''})
      await newUser.save()
      res.status(200).json(newUser)
  }
}
catch(err){
  res.status(401).json(`register API failed ,error:${err}`)
}
}


exports.adminlogin=async (req,res)=>{

  const {email,password}=req.body
try{
  const existingUser = await admins.findOne({email,password})
  if(existingUser){
  
    const token= jwt.sign({userId:existingUser._id},"supersecretkey12345")

    res.status(200).json({
      
      existingUser,token
    })

  }else{
    res.status(404).json(`Incorrect Email / Password`)
  }
}catch(err){
  res.status(401).json(`Login API Faild , Error ${err}`)
}
}




exports.editProfileController=async(req,res)=>{

  const userId=req.payload
  const {username, turfname, regno, email, turfemail, password,phon,turflocation,profile }=req.body
  const uploadProfileImage=req.file?req.file.filename:profile
  try{
    const updateProfile=await admins.findByIdAndUpdate({_id:userId},{username, turfname, regno, email, turfemail, password,phon,turflocation,"profile":uploadProfileImage},{new:true})
    await updateProfile.save()
    res.status(200).json(updateProfile)
  }catch(err){
     res.status(401).json(err)

     }
 }


 exports.editOwnerProfileController=async(req,res)=>{

  const userId=req.payload
  const {username, email,phon,profile2 }=req.body
  const uploadProfileImage=req.file?req.file.filename:profile2
  try{
    const updateProfile=await admins.findByIdAndUpdate({_id:userId},{username, email,phon,"profile2":uploadProfileImage},{new:true})
    await updateProfile.save()
    res.status(200).json(updateProfile)
  }catch(err){
     res.status(401).json(err)

     }
 }
 

 exports.editUserProfileController=async(req,res)=>{

  const userId=req.payload
  const {username, email,phon }=req.body
  try{
    const updateProfile=await users.findByIdAndUpdate({_id:userId},{username, email,phon},{new:true})
    await updateProfile.save()
    res.status(200).json(updateProfile)
  }catch(err){
     res.status(401).json(err)

     }
 }
 
