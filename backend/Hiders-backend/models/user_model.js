const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  age: {
    type: String,
    require: true,
  },
  cart: {
    type: Array,
  },
  invoices: {
    type: Array,
  },
  adresses: {
    type: Object,
  },
  stripe_id: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("user", userModel);
