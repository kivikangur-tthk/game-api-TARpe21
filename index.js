require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT
const swaggerui = require("swagger-ui-express")
const yamljs = require("yamljs")
const swaggerDocument = yamljs.load("./docs/swagger.yaml")
const { Sequelize } = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mariadb"
})
try {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.use(express.json())
app.use("/docs", swaggerui.serve, swaggerui.setup(swaggerDocument))

app.get("/games", (req, res) => {
    res.send(games.getAll())
})

app.get("/games/:id", (req, res) => {
    const foundGame = games.getById(req.params.id)
    if (foundGame === undefined) {
        return res.status(404).send({ error: `Game not found` })
    }
    res.send(foundGame)
})
app.get("/players", (req, res) => {
    res.send(players.getAll())
})

app.get("/players/:id", (req, res) => {
    const foundPlayer = players.getById(req.params.id)
    if (foundPlayer === undefined) {
        return res.status(404).send({ error: `Player not found` })
    }
    res.send(foundPlayer)
})

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})