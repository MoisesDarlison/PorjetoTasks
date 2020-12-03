module.exports = {
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

//executar npx sequelize db:create para criar a DATEBASE