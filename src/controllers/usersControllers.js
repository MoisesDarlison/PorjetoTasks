const user = require('../models/users.js')

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const pageSize = 5

        try {
            const userAll = await user.findAll({
                limit: pageSize,
                offset: (page - 1) * pageSize,
                attributes: ['id', 'name'],
            })
            return res.status(200).json(userAll)
        } catch (error) {
            console.log(error)
            return res.status(500).json({})
        }

    },
    async create(req, res) {
        try {
            const { name, password } = req.body
            const userExist = await user.findOne(
                {
                    where: { name: name },
                    attributes: ['name']
                });
            if (userExist) {
                return res.status(201).json(`SELECT A DIFFERENT USER FROM ${name}`)
            }
            const userNew = await user.create({ name, password })
            return res.status(201).json(userNew)

        } catch (error) {
            console.log(error);
            return res.status(500).json('INVALID USER')
        }
    },
    async filter(req, res) {
        try {
            const { id } = await req.params
            const userFilter = await user.findOne(
                {
                    where: { id: id },
                    attributes: ['id', 'name'],
                });

            return res.json(userFilter)
        } catch (error) {
            console.log(error)
            return res.status(404).json({})
        }
    },
    async destroy(req, res) {
        try {
            const { id } = await req.params
            const userDelet = await user.destroy(
                {
                    where: { id: id },
                });
            return res.status(200).json({ id: `${id} DELETED SUCESS` })
        } catch (error) {
            console.log(error)
            return res.status(500).json({})
        }
    },
    async update(req, res) {
        try {
            const { id } = await req.params
            const LocalizedUser = await user.findOne(
                {
                    where: { id: id },
                    attributes: ['name', 'password'],
                });

            if (!LocalizedUser) {
                return res.status(400).json('User does not exist')
            }

            const { name, password } = req.body
            user.update(
                {
                    name,
                    password,
                },
                {
                    where: { id: id },
                });

            return res.status(201).json({})
        } catch (error) {
            console.log(error)
            return res.status(500).json({})
        }
    },

}