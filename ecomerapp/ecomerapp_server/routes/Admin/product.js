require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../../models/Product');
const ProductImage = require('../../models/ProductImage');


const proDir = path.join(path.resolve(__dirname, '../../', 'products'));

// Multer storage config
const proStore = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'products/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: proStore });

router.post('/addproduct', upload.single('product_thumb'), async (req, res) => {
  try {
    const {
      pro_cat,
      product_name,
      product_short_desc,
      product_long_desc,
      product_org_price,
      product_sale_price,
      product_sale_start_date,
      product_sale_last_date
    } = req.body;

    if (!req.file) {
      return res.json({ sts: 1, msg: 'Product image is required' });
    }

    const newPro = new Product({
      pro_cat,
      product_name,
      product_short_desc,
      product_long_desc,
      product_thumb: req.file.filename,
      product_org_price,
      product_sale_price,
      product_sale_start_date,
      product_sale_last_date
    });

    await newPro.save();

    res.json({ sts: 0, msg: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.json({ sts: 1, msg: 'Server error: Failed to add product' });
  }
});

// View Product API
router.get('/viewproduct', async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.json({ viewprosts: 1, msg: "No Product found" });
    }

    const formattedProducts = products.map(product => ({
      _id: product._id,
      product_name: product.product_name,
      product_short_desc: product.product_short_desc,
      product_long_desc: product.product_long_desc,
      product_thumb: product.product_thumb,
      product_org_price: product.product_org_price,
      product_sale_price: product.product_sale_price,
      product_sale_start_date: product.product_sale_start_date,
      product_sale_last_date: product.product_sale_last_date,
      product_status: product.product_status,
      category: product.pro_cat?.cat_name || "N/A"
    }));

    return res.json({ viewprosts: 0, product: formattedProducts });
  } catch (error) {
    console.error(error);
    res.json({ viewprosts: 1, msg: 'Server error' });
  }
});


router.post('/changestatus', async (req, res) => {
  const {productIds, newStatus} = req.body
  try {
    await Product.updateMany(
      {_id:{$in:productIds}},
      {$set:{product_status:newStatus}}
    )
    res.json({"msg": "Product Status Updated"})
  } catch (error) {
    console.error(error)
  }})

  router.post('/deletemproduct', async (req, res) => {
  const {productIds} = req.body
  try {
    const result = await Product.deleteMany(
      {_id:{$in:productIds}},
    )
    res.json({"msg": `Total ${result.deletedCount} Product Deleted`})
  } catch (error) {
    console.error(error)
  }})

  router.delete('/deletepro/:id', async (req, res) => {
    const spro = await Product.findById(req.params.id)
    const product_thumb = spro.product_thumb
    const filePath = path.join(proDir, product_thumb)

    try {
        const pro = await Product.findByIdAndDelete(req.params.id)

        if (!pro) {
            return res.json({"delsts": 1, "msg": "Product Not Deleted"})
        } else {
          fs.unlinkSync(filePath)
            return res.json({"delsts": 0, "msg": "Product Not Deleted"})
        }
    } catch (error) {
        console.error(error)
    }
})


const uploadImages = multer({ storage: proStore });

router.post('/uploadimage/:id', uploadImages.array('images'), async (req, res) => {
    const productId = req.params.id;
    const imageFiles = req.files;

    try {
        const imagePromises = imageFiles.map(file => {
            const newProdImage = new ProductImage({
                product_image: file.filename,
                proId: productId
            });

            return newProdImage.save();
        });

        await Promise.all(imagePromises);
        res.status(200).json({ message: "Images uploaded successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error uploading images", error });
    }
});

 

module.exports = router;
