const user = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const SECRET = process.env.PASSWORD_USER_SECRET_KEY

module.exports = {
    async create(req, res) {
        const { name, password } = req.body
        try {
            const userdados = await user.findOne(
                {
                    where: { name: name },
                    attributes: ['id', 'password'],
                });
            if (!userdados) {
                return res.status(401).json({ erro: 'NAO AUTORIZADO USERDADOS' });
            }

            const validaUser = bcrypt.compareSync(password, userdados.dataValues.password)

            if (!validaUser) {
                return res.status(401).json({ erro: 'NAO AUTORIZADO VALIDA USER' });
            }

            const token = jwt.sign({ userId: userdados.dataValues.id }, SECRET, { expiresIn: 3000000 })
            return res.status(200).json({ id: userdados, token })

        } catch (error) {
            console.log(error)
            return res.status(500).json({})
        }
    },
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
