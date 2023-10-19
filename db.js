const { Sequelize } = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    define: {
        timestamps: true
    },
    logging: false // console.log
})
try {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
const db = {}
db.Sequelize = Sequelize
db.connection = sequelize
db.games = require("./models/Game")(sequelize, Sequelize)
db.players = require("./models/Player")(sequelize, Sequelize)
db.gamePlays = require("./models/GamePlay")(sequelize, Sequelize, db.games, db.players)

db.games.belongsToMany(db.players, { through: db.gamePlays })
db.players.belongsToMany(db.games, { through: db.gamePlays })
db.games.hasMany(db.gamePlays)
db.players.hasMany(db.gamePlays)
db.gamePlays.belongsTo(db.games)
db.gamePlays.belongsTo(db.players)


sync = async () => {
    //await sequelize.sync({ force: true }) // Erase all and recreate
    await sequelize.sync({ alter: true }) // Alter existing to match the model
}

module.exports = { db, sync }