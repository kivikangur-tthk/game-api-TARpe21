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


app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})