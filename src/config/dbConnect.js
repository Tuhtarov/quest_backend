const {Sequelize} = require("sequelize")

const db = new Sequelize("quests", "root", "root", {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mariadb",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: true,
        freezeTableName: true
    },
})

module.exports = db
