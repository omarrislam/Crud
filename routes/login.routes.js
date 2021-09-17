const app = require('express').Router()
const { validationResult } = require('express-validator')
const validation = require('../validation/login.validation')
const userModel = require('../models/user.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
            let user = await userModel.findOne({ email })
            if (user) {
                let match = await bcrypt.compare(password, user.password)
                if (match) {
                    var token = jwt.sign({ name: user.name, isLoggedIn: true, userID: user.id }, 'omar')
                    let logged = true;
                    res.json({ message: 'Youve successfully logged in',logged ,token })
                } else {
                    res.json({ message: 'Incorrect password', oldInputs: { email, password } })
                }
            } else {
                res.json({ message: 'account doesnt exist', oldInputs: { email, password } })
            }
    } catch (error) {
        res.json({ message: 'Catch Login error', error })

    }
})

module.exports = app