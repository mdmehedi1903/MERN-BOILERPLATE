// Basic Configuration Lib Import
const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const cookieParser = require('cookie-parser')

// Security Variable Configuration
const dotenv = require('dotenv');
dotenv.config({path:'./.env'}); 

// Security Middleware Lib Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors'); 
const hpp = require('hpp'); 

// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Body Parser & Cookie Implement
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Rate Limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: "Too many requests from this IP, please try again later."
})
app.use(limiter);


// Database Lib Import
const mongoose = require('mongoose'); 

const HOST = process.env.HOST;
const DATABASE_NAME = process.env.DATABASE_NAME; 
const DATABASE = `${process.env.DATABASE}/${DATABASE_NAME}`; 

mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => console.log(`DB Connected at ${HOST}: ${DATABASE_NAME}`))
  .catch((err) => {
    console.error(err);
  });


// Routing Implement
app.use("/api/v1", router)

// Undefined Route Implement
app.use('*', (req,res)=>{
    res.status(404).json({status: "Failed!", data: "404 Error! Wrong route!"});
})

// Front-End Connection
const path = require('path');
app.use(express.static('Client/dist'));
app.get('*', function(req,res) {
  res.sendFile(path.resolve(__dirname,'Client','dist','index.html'))
})


module.exports=app;
