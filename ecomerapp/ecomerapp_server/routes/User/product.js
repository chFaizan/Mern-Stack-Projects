require('dotenv').config()
const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const Product = require('../../models/Product')
const ProductImage = require('../../models/ProductImage')


router.get('/getallproducts', async (req, res) => {
  try {
    const products = await Product.find({"product_status":"enable"}).populate('pro_cat')
    if (!products) {
      return res.json({ 'productsts': 1, 'msg': "no Product found" })
    } else {
      return res.json({ 'productsts': 0, 'allproducts':products })
    }
  } catch (error) {
    console.log(error)
  }
})






module.exports = router