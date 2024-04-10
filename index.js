const express = require('express');
const {config} = require('dotenv');
const connectedDb = require('../backend/utils/database');
const vender= require('../backend/routers/vendor');
const  firm = require('../backend/routers/firm');
const product = require('../backend/routers/product');
const app = express();


config({
    path:'../backend/config.env'
})
connectedDb();

app.use(express.json());
app.use('/api/vender', vender);
app.use('/api/firm', firm);
app.use('/api/product', product);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req,res,err)=>{

   if(err){
    console.log(err);
   }
   else{
    console.log(`server is running on ${PORT}...`)
   }
})