const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    mobile:String,
    address:String,
    gender:String
})

module.exports = mongoose.model('user', userSchema)