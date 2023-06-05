

const mongoose =  require('mongoose');
mongoose.set('strictQuery', false);

const conectserver=()=>{
        try {
                // const resutl = mongoose.connect("mongodb+srv://irshad:Alam123@cluster0.uimzatr.mongodb.net/?retryWrites=true&w=majority")
                const resutl = mongoose.connect("mongodb://0.0.0.0:27017/user")

                console.log("connected")
                return resutl;
        } catch (error) {
                console.log("not connected")
        }
}


module.exports = conectserver


