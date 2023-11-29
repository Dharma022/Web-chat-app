const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    fullName:{
        type : String,
        required: true
    },
    username:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlength:6
    },
    gender:{
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilepic: {
        type: String,
        default: ""
    }
},{
    timestamps: true //for created at and updated at fields
});

const User = mongoose.model("User", userSchema);



module.exports = User;