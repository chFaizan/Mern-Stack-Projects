const mongoose = require('mongoose')


const productImageSchema = new mongoose.Schema({
    product_image:{
        type:String,
        required:true
    },
     proId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'ecomerapp_product'
    }
})


module.exports =mongoose.model('ecomerapp_product_img', productImageSchema)