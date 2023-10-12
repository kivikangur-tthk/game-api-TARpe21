module.exports = (dbConnection, Sequelize) => {
    const Game = dbConnection.define("Game", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.DECIMAL
        }
    })
    return Game
}