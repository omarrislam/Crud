const { check } = require('express-validator');
module.exports = [
    check('name').matches(/^[a-zA-Z ]{2,30}$/),
    check('email').isEmail(),
    check('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/)
]