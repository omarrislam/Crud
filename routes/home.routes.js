const app = require('express').Router()
const auth = require('../middleware/auth')
const postModel = require('../models/post.models')
app.get('/home', auth, async (req, res) => {
    console.log(req.userID);
    let posts = await postModel.find({ userID: req.userID })
    res.json({ posts })
})

app.post('/addPost', auth, async (req, res) => {
    const { title, desc } = req.body
    await postModel.insertMany({ title, desc, userID: req.userID })
    res.json({ message: "Post Added" })
})

app.delete('/delete', auth, async (req, res) => {
    const { postID } = req.body
    await postModel.findByIdAndDelete({ _id: postID })
    res.json({ message: "Deleted" })
})

app.put('/edit', auth, async (req, res) => {
    const { postID, title, desc } = req.body
    await postModel.findByIdAndUpdate({ _id: postID }, { title, desc })
    res.json({ message: "Updated" })

})
module.exports = app