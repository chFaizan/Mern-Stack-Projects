require('dotenv').config()
const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')


router.get('/getcategory', async (req, res) => {
  try {
    const cat = await Category.find()
    if (!cat || cat.length === 0) {
      return res.json({ catsts: 1, msg: "no category found" })
    } else {
      return res.json({ catsts: 0, cat })
    }
  } catch (error) {
    console.log(error)
  }
})






module.exports = router