import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    }
})

const User=mongoose.model('user',userSchema)
module.exports=User