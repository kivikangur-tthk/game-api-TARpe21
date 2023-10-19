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
    if (process.env.DROP_DB) {
        console.log("Begin DROP")
        await db.connection.query('SET FOREIGN_KEY_CHECKS = 0')
        console.log("Checks disabled")
        await db.connection.sync({ force: true })
        console.log('Database synchronised.');
        await db.connection.query('SET FOREIGN_KEY_CHECKS = 1')
        console.log("Checks enabled")

        const [game, createdG] = await db.games.findOrCreate({
            where: {
                name: "Minecraft"
            },
            defaults: {
                name: "Minecraft",
                price: 30,
            }
        })
        console.log("game created: ", createdG)
        const [player, createdP] = await db.players.findOrCreate({
            where: {
                name: "Kristjan Kivikangur"
            },
            defaults: {
                name: "Kristjan Kivikangur"
            }
        })
        console.log("player created: ", createdP)
        const [gamePlay, createdGP] = await db.gamePlays.findOrCreate({
            where: {
                id: 1
            },
            defaults: {
                PlayerId: player.id,
                GameId: game.id,
                playtime: 55
            }
        })
        console.log("gamePlay created: ", createdGP)
    }
    else {
        await db.connection.sync({ alter: true }) // Alter existing to match the model
    }
}

module.exports = { db, sync }