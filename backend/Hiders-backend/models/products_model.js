const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  colors: {
    type: Array,
  },
  sizes: {
    type: Array,
  },
  image: {
    type: Array,
  },
  rating: {
    type: Array,
  },
});



module.exports = mongoose.model('products',productSchema)