const app = require("express")()
const port = 8080
const swaggerui = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json")

app.use("/docs", swaggerui.serve, swaggerui.setup(swaggerDocument))

app.get("/games", (req, res) => {
    res.send([
        { id: 1, name: "Witcher 3" },
        { id: 2, name: "Cyberpunk 2077" }
    ])
})

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})