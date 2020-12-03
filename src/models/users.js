const connection = require("../database/index")
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt');

const user = connection.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}, {
    freezeTableName: true,
    hooks: {
        afterValidate: (user, options) => {
            {
                user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
            }
        },

    },
})

module.exports = user;