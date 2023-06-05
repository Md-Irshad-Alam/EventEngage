
const mongoose = require('mongoose')

const connect =()=>{
    let result = mongoose.connect('mongodb+srv://irshad:Alam123@cluster0.uimzatr.mongodb.net/?retryWrites=true&w=majority')
    console.log("connected")
    
}
module.exports = connect;