require('dotenv').config()
const express = require("express")
const app = express()
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users")

const port = 3030


//set db connection


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', ()=>{ console.log("Connect to database")});





app.listen(port,(err)=>{
  if(err) throw err
  console.log("server is on")
})

app.use(usersRoute)






