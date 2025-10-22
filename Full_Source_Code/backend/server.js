require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors()); app.use(express.json());
app.get('/api/health',(req,res)=>res.json({status:'ok'}));
app.listen(process.env.PORT||5000,()=>console.log('Server running'));
