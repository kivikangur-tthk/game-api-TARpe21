require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT
const swaggerui = require("swagger-ui-express")
const yamljs = require("yamljs")
const swaggerDocument = yamljs.load("./docs/swagger.yaml")

app.use("/client", express.static("frontend"))

app.use(cors())
app.use(express.json())
app.use("/docs", swaggerui.serve, swaggerui.setup(swaggerDocument))

require("./routes/gameRoutes")(app)
require("./routes/playerRoutes")(app)
require("./routes/gamePlayRoutes")(app)

app.listen(port, async () => {
    require("./db").sync()
        .then(() => {
            console.log("Sync succeeded!")
            console.log(`API up at: http://localhost:${port}/docs`)
            console.log(`API up at: http://localhost:${port}/client`)
        })
        .catch((error) => console.log("Sync failed:\n", error))
})