console.log('express.js');
// 1er:importer express
const express=require('express')
const path = require('path')
//2eme mettez express dans une variable 
const app = express()
const connectDT=require('./connectDB/connect')
connectDT();

app.use(express.json());
app.use('/persons',require('./Route/personRoute'))


const port =5000;

app.listen(port,(err)=>{err?console.log(err):console.log('the port is runing en 5000')})


