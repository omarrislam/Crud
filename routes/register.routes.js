const app = require('express').Router()
const validation = require('../validation/register.validation')
const userModel = require('../models/user.models')
const bcrypt = require('bcrypt')
app.post('/register', async (req, res) => {
    const { email, password,mobile ,address ,gender } = req.body
    try {
            let user = await userModel.findOne({ email })
            if (user) {
                res.json({ message: 'user already exists', oldInputs: { email, password,mobile ,address ,gender } })
            } else {
                bcrypt.hash(password, 7, async (err, hash) => {
                    await userModel.insertMany({email, password: hash ,mobile ,address ,gender })
                })
                res.json({ message: "You've been registered successfully" })
            }

    } catch (error) {
        res.json({ message: 'Catch Register error', error })

    }
})

module.exports = app