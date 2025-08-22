const mongoose = require('mongoose')


const productAttributeSchema = new mongoose.Schema({
    attribute_name:{
        type:String,
        required:true
    },
     attribute_value:{
        type:String,
        required:true
    },
     attribute_unit:{
        type:String,
        required:true
    },
        proId:{
              type:mongoose.Schema.Types.ObjectId,
              required:true,
              ref:'ecomerapp_product'
          }
})


module.exports =mongoose.model('ecomerapp_product_att', productAttributeSchema)