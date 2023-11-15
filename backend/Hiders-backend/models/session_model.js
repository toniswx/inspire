
const mongoose = require("mongoose")

const SESSION_SCHEMA = new mongoose.Schema({
   SESSION_ID:{
    type:String,
    required:true
   },
   USER_MAGNET:{
   type:String,
   required:true
   }
})

module.exports = mongoose.model('sessions',SESSION_SCHEMA)