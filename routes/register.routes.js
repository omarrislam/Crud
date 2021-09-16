const app = require('express').Router()
const { validationResult } = require('express-validator');
const validation = require('../validation/register.validation')
const userModel = require('../models/user.models')
const bcrypt = require('bcrypt')
app.post('/register', validation, async (req, res) => {
    const { name, email, password, } = req.body
    try {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            let user = await userModel.findOne({ email })
            if (user) {
                res.json({ message: 'user already exists', oldInputs: { name, email, password } })
            } else {
                bcrypt.hash(password, 7, async (err, hash) => {
                    await userModel.insertMany({ name, email, password: hash })
                })
                res.json({ message: "You've been registered successfully" })
            }
        } else {
            res.json({ message: 'validation error', MessageError: errors.array() })
        }

    } catch (error) {
        res.json({ message: 'Catch Register error', error })

    }
})

module.exports = app