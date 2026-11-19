const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        minlength: [3, 'Username must be atleast 3 characters long'],
        maxlength: [100, 'Username cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password length must be atleast 6 chracters long'],
        maxlength: [8, "Password length must not exceed 8 characters"]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { 
    timestamps: true 
})

const user = mongoose.model('User', userSchema)
module.exports = user