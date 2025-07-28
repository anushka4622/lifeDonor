const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
//dot config
dotenv.config()

//mongodb connection
connectDB()

//rest object create krenge -app iska mtlb express ki saari functionality ab app m aa gyi h
const app = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//routes
app.use('/api/test',require("./routes/testRoutes"))
app.use('/api/auth',require("./routes/authRoutes"))
app.use('/api/inventory',require("./routes/inventoryRoutes"))
app.use('/api/analytics',require("./routes/analyticsRoutes"))
app.use('/api/admin',require("./routes/adminRoutes"))




//port-8080
const port = process.env.PORT || 8080

//listen
app.listen(port,()=>{
    console.log(`Node Server running in ${process.env.DEV_MODE} mode  on port ${process.env.PORT}` .bgBlue.white)
})
