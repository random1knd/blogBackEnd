
const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
app.use(express.urlencoded({extended:false}))

const router = require('./routes/routes')
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/blogBackend",()=>{
    console.log("connected to the database")
})

app.use('/',router)
const PORT = 5000
app.listen(PORT,()=>{
    console.log(`serverd stareted listening on ${PORT}`)
})