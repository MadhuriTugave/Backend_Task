const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Name:{
        type: String,
        required : true
    },
    PhoneNumber:{
        type: Number,
        required : true
    }
})

const UserCollection = mongoose.model("User", UserSchema);
module.exports = UserCollection;