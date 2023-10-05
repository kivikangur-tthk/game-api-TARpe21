const playersController = require("../controllers/PlayersController.js")
module.exports = (app) => {
    app.route("/players")
        .get(playersController.getAll)
        .post(playersController.createNew)      // Create
    app.route("/players/:id")
        .get(playersController.getById)         // Read
        .put(playersController.editById)        // Update
        .delete(playersController.deleteById)   // Delete
}