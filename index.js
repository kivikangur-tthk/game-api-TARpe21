const express = require("express")
const app = express()
const port = 8080
const swaggerui = require("swagger-ui-express")
const yamljs = require("yamljs")
const swaggerDocument = yamljs.load("./docs/swagger.yaml")
const games = require("./games/data")
const players = require("./players/data")

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

app.post("/games", (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const createdGame = games.create({
        name: req.body.name,
        price: req.body.price
    })
    res.status(201)
        .location(`${getBaseurl(req)}/games/${createdGame.id}`)
        .send(createdGame)
})

function getBaseurl(request) {
    return (request.connection && request.connection.encrypted ? "https" : "http")
        + "://" + request.headers.host
}

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