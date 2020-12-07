const Sequelize = require('sequelize');
const dbConfig = {
    dialect: "postgres",
    host: 'localhost',
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    port: process.env.PORT_DB,
    define: {
        timestamps: true,
        underscore: true,
        freezeTableName:true,
    },
}

const connection = new Sequelize(dbConfig);

module.exports = connection;

//DB rodando da porta: 3306
// cria a migration
//npx sequelize migration:create --name=create-task

