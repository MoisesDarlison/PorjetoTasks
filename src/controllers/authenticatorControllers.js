const user = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const SECRET = process.env.PASSWORD_USER_SECRET_KEY

module.exports = {
    async create(req, res) {
        const { name, password } = req.body
        try {
            const userdata = await user.findOne(
                {
                    where: { name: name },
                    attributes: ['id', 'password'],
                });

            const validateUser = bcrypt.compareSync(password, userdata.dataValues.password)
            if (!validateUser) {
                return res.status(401).json({ erro: 'ACCESS DENIED' });
            }

            const token = jwt.sign({ userId: userdata.dataValues.id }, SECRET, { expiresIn: 3000000 })
            return res.status(200).json({ id: userdata, token })

        } catch (error) {
            console.log(error)
            return res.status(500).json({})
        }
    },
}
