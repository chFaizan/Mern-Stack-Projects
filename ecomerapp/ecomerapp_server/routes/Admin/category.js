const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Category = require('../../models/Category')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const catDir = path.join(path.resolve(__dirname, '../../', 'uploads'))


const upload = multer({ storage })

router.post('/addcategory', upload.single('cat_img'), async (req, res) => {
  try {
    const cat_name = req.body.cat_name
    const cat_img = req.file.filename

    const newCategory = new Category({ cat_name, cat_img })
    await newCategory.save()

    res.json({ sts: 0, msg: 'Category added successfully' })
  } catch (err) {
    console.error(err)
    res.json({ sts: 1, msg: 'Server Error: Failed to add category' })
  }
})

router.get('/getcat', async (req, res) => {
  try {
    const cat = await Category.find()
    if (!cat || cat.length === 0) {
      return res.json({ viewcatsts: 1, msg: "no category found" })
    } else {
      return res.json({ viewcatsts: 0, cat })
    }
  } catch (error) {
    console.log(error)
    res.json({ viewcatsts: 1, msg: 'Server error' })
  }
})

router.delete('/deletecat/:id', async (req, res) => {
  const scat = await Category.findById(req.params.id)
  const cImage = scat.cat_img

  const filepath = path.join(catDir,cImage)
  
  try {
    const cat = await Category.findByIdAndDelete(req.params.id)
    if (!cat) {
      return res.json({ delsts: 1, msg: "Category not deleted" })
    } else {
      const filePath = `uploads/${cat.cat_img}`
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
      return res.json({ delsts: 0, msg: "Category deleted" })
    }
  } catch (error) {
    console.log(error)
    res.json({ delsts: 1, msg: 'Server error' })
  }
})

module.exports = router