module.exports = (dbConnection, Sequelize) => {
    const Player = dbConnection.define("Player", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        playTime: {
            type: Sequelize.DOUBLE
        }
    })
    return Player
}