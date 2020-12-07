const crypto = require('crypto')
const user = require('../models/users.js')

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const pageTamanho = 10

        try {
            const userTodos = await user.findAll({
                limit: pageTamanho,
                offset: (page - 1) * pageTamanho,
                attributes: ['id', 'name'],
            })
            return res.status(200).json(userTodos)
        } catch (error) {
            console.log(error)
            return res.status(500).json({})
        }

    },
    async create(req, res) {
        try {
            const { name, password } = req.body
            const userNew = await user.create({ name, password })

            return res.status(201).json(userNew)
        } catch (error) {
            console.log(error)
            return res.status(500).json({})
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
            const userLocalizado = await user.findOne(
                {
                    where: { id: id },
                    attributes: ['name', 'password'],
                });

            if (!userLocalizado) {
                return res.status(400).json('USER NAO LOCALIZADO')
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