const {Sequelize} = require("sequelize")

const db = new Sequelize("quests", "root", "root", {
    host: "db",
    port: 3306,
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
