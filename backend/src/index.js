// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import express from "express"

import { app } from "./App.js"

dotenv.config({
    path: './.env'
})

connectDB()

.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running at ${process.env.PORT}`)

    })
})
.catch((err)=>{
    console.log("MONGO connection error:", err)
})