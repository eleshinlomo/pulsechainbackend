const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 4100
require('dotenv').config()



// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://pulsepls.com'
],
  credentials: true,
}));

// TRUST PROXY
  if(process.env.NODE_ENV){
  app.set('trust proxy', 1); // trust first proxy
  
  
  }
  








// Endpoints

app.use('/api', require('./Routes/Routers/userRoute'))









mongoose.connect(process.env.dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>app.listen(PORT, ()=>console.log(`Server and Database now connected on ${PORT}`)))
.catch((err)=>console.log(err))