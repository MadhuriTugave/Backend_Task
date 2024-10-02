const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    BookName:{
        type: String,
        required : true
    },
    Category:{
        type: String,
        required : true
    },
    Rent_Per_day:{
        type: Number,
        required : true
    }
   
})

const Bookcollectoin = mongoose.model("Book", BookSchema);
module.exports ={Bookcollectoin};
