const express = require("express")
const app = express()
const port = 8080
const swaggerui = require("swagger-ui-express")
const yamljs = require("yamljs")
const swaggerDocument = yamljs.load("./docs/swagger.yaml")

app.use(express.json())
app.use("/docs", swaggerui.serve, swaggerui.setup(swaggerDocument))

require("./routes/gameRoutes")(app)
require("./routes/playerRoutes")(app)

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})