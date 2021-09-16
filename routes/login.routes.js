const app = require('express').Router()
const { validationResult } = require('express-validator')
const validation = require('../validation/login.validation')
const userModel = require('../models/user.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
app.post('/login', validation, async (req, res) => {
    const { email, password } = req.body
    try {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            let user = await userModel.findOne({ email })
            if (user) {
                let match = await bcrypt.compare(password, user.password)
                if (match) {
                    var token = jwt.sign({ name: user.name, isLoggedIn: true, userID: user.id }, 'omar')
                    res.json({ message: 'Youve successfully logged in', token })
                } else {
                    res.json({ message: 'Incorrect password', oldInputs: { email, password } })
                }
            } else {
                res.json({ message: 'account doesnt exist', oldInputs: { email, password } })
            }
        } else {
            res.json({ message: 'validation error', MessageError: errors.array(), oldInputs: { email, password } })
        }
    } catch (error) {
        res.json({ message: 'Catch Login error', error })

    }
})

module.exports = app