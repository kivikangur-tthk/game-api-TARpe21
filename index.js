const app = require("express")()
const port = 8080
const swaggerui = require("swagger-ui-express")
const yamljs = require("yamljs")
const swaggerDocument = yamljs.load("./docs/swagger.yaml")

app.use("/docs", swaggerui.serve, swaggerui.setup(swaggerDocument))

app.get("/games", (req, res) => {
    console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.cookies))
    res.send([
        { id: 1, name: "Witcher 3" },
        { id: 2, name: "Cyberpunk 2077" }
    ])
})

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})