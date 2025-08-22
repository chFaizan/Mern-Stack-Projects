const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    uemail:{
        type:String,
        required:true
    },
     upass:{
        type:String,
        required:true
    },
     ustatus:{
        type:String,
        enum:['enable','disable'],
        default:'enable'
    }
})


module.exports =mongoose.model('ecomerapp_user', userSchema)