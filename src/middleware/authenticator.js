const user = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const SECRET = process.env.PASSWORD_USER_SECRET_KEY

module.exports = {
    async verifyJWT(req, res, next) {

        const authorization = req.headers.authorization
        jwt.verify(authorization, SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ err: err.message })
            }
            req.userIdJWT = decoded.userId
            next()
        })
    }
}
