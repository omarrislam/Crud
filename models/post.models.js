const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: String,
    desc: String,
    userID: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('post', postSchema)