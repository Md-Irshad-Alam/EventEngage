
const express = require('express')

const connect = require('./db')
const app = express();

app.get('/', (req,res)=>{
    console.log("hello i am working ")
})

app.listen(5000, async(req, res)=>{
    await connect();
    console.log("server is live on ")
})