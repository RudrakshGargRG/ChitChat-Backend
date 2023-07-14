const mongoose = require('mongoose'); //used to interact with MONGODB server

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    }, 
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    isAvatarImageSet:{
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ""
    },
    about: {
        type: String,
        default: "",
        max: 500 
    }
});

module.exports = mongoose.model("Users", userSchema); //export userSchema as User model