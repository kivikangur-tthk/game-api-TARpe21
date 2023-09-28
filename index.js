const app = require("express")()
const port = 8080
const swaggerui = require("swagger-ui-express")
const yamljs = require("yamljs")
const swaggerDocument = yamljs.load("./docs/swagger.yaml")
const games = require("./games/data")

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

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})