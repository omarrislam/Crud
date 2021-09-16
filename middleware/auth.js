const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    let token = req.header('token')
    try {
        jwt.verify(token, 'omar', (err, decoded) => {
            if (err) {
                res.json({ message: 'invalid token' })
            } else {
                if (decoded.isLoggedIn) {
                    req.name = decoded.name,
                        req.userID = decoded.userID,
                        next()
                } else {
                    res.json({ message: 'Please Login First' })
                }
            }
        })
    } catch (error) {
        res.json({ message: 'catch auth error', error })


    }
}