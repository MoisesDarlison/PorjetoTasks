const task = require('../models/tasks')
const user = require('../models/users')

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const pageSize = 2
        const userId = req.userIdJWT
        try {
            const totaltasks = await task.count({ where: { 'userId': userId } })
            const taskPaged = await user.findAll({
                attributes: ['id', 'name'],
                where: { id: userId },
                include: {
                    model: task,
                    attributes: ['id', 'title', 'description', 'status'],
                    limit: pageSize,
                    offset: (page - 1) * pageSize,
                },
            })
            return res.status(200).json({ taskPaged, totaltasks })
        } catch (error) {
            console.log(error)
            return res.status(500).json({})
        }
    },

    async create(req, res) {
        try {
            const userId = req.userIdJWT
            const { title, description, status } = req.body
            const userExist = await user.findByPk(userId)
            if (!userExist) {
                return res.status(400).json({ error: `User ${userExist} does not exist` })
            }

            const taskNew = await task.create(
                {
                    userId,
                    title,
                    description,
                    status
                })

            return res.status(201).json(taskNew)
        } catch (error) {
            console.log(error)
            return res.status(500).json({})
        }
    },

    async filter(req, res) {
        try {
            const { id } = await req.params
            const userId = req.userIdJWT
            const taskFilter = await task.findOne(
                {
                    where: { id: id, userId: userId },
                    attributes: ['userId', 'id', 'title', 'description', 'status'],
                });

            if (!taskFilter) {
                return res.status(401).json({ error: 'ACCESS DENIED' })
            }
            return res.status(200).json(taskFilter)
        } catch (error) {
            console.log(error)
            return res.status(404).json({})
        }
    },
    
    async destroy(req, res) {
        try {
            const { id } = await req.params
            const userId = req.userIdJWT

            const taskFilter = await task.destroy(
                {
                    where: { id: id, userId: userId },
                });

            if (!taskFilter) {
                return res.status(401).json({ error: 'ACCESS DENIED' })
            }

            return res.status(201).json('TASK DELETE SUCESS')
        } catch (error) {
            return res.status(404).json({})
        }
    },

    async update(req, res) {
        try {
            const { id } = await req.params
            const userId = req.userIdJWT

            const taskExist = await task.findOne(
                {
                    where: { id: id, userId: userId },
                    attributes: ['id']
                });

            if (!taskExist) {
                return res.status(401).json({ error: 'User/Task does not exist' })
            }

            const { description, status } = req.body
            await task.update(
                {
                    description,
                    status,
                },
                {
                    where: { id: id, userId: userId },
                });

            return res.status(201).json('Update Sucess')
        } catch (error) {
            return res.status(500).json({})
        }
    },
}