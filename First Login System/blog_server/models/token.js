const mongoose = require('mongoose')


const tokenSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'mbs_user'
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
    
    tokenSchema.index({expiresAt:1},{expireAfterSeconds:0})
    module.exports =mongoose.model('mbs_token', tokenSchema)