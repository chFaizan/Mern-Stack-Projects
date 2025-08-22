const mongoose = require('mongoose')


const admintokenSchema = new mongoose.Schema({
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'ecomerapp_admin'
    },
     token:{
        type:String,
        required:true,
    },
     expiresAt:{
        type:Date,
        required:true,
      
        }
    })
    
    admintokenSchema.index({expiresAt:1},{expireAfterSeconds:0})
    module.exports =mongoose.model('ecomerapp_admin_token', admintokenSchema)