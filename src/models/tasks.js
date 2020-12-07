const connection = require("../../config/connections")
const Sequelize = require('sequelize');
const user = require("./users");


const task = connection.define('task', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,

}, {
    freezeTableName: true
})
user.hasMany(task, {
    foreignKey: 'userId'
});
task.belongsTo(user);

module.exports = task;

/* REFERENCIA A CHAVE ESTRANGEIRA
user.hasMany(task, {
    foreignKey: 'userId'
  });
  task.belongsTo(user);
 */
