

const mongoose = require('mongoose')



const adminSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        
    },
    turfname:{
        type:String,
        required:true,
        unique:true
       

    },
    regno:{
        type:String,
        required:true,
        unique:true
       
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    turfemail:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
       
    },
    phon:{
        type:String,
        required:true,
        unique:true
    },
    turflocation:{
        type:String,
        required:true,
        unique:true
    },
    profile:{
        type:String,
      
        unique:true
    },
    profile2:{
        type:String,
      
        unique:true
    },
})

const admins = mongoose.model("admins",adminSchema)

module.exports = admins