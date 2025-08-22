const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  pro_cat: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category' // matches Category model name
  },
  product_name: {
    type: String,
    required: true
  },
  product_short_desc: {
    type: String,
    required: true
  },
  product_long_desc: {
    type: String,
    required: true
  },
  product_thumb: {
    type: String,
    required: true
  },
  product_org_price: {
    type: Number,
    required: true
  },
  product_sale_price: {
    type: Number,
    required: true
  },
  product_sale_start_date: {
    type: Date, // changed from Number to Date for clarity
    required: true
  },
  product_sale_last_date: {
    type: Date, // changed from Number to Date
    required: true
  },
  product_status: {
    type: String,
    enum: ['pending', 'enable', 'disable'],
    default: 'pending'
  }
});

// Always populate category info when querying products
productSchema.pre(/^find/, function (next) {
  this.populate('pro_cat');
  next();
});

module.exports = mongoose.model('Product', productSchema);
