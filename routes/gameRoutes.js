const gamesController = require("../controllers/GamesController.js")
module.exports = (app) => {
    app.route("/games")
        .get(gamesController.getAll)
        .post(gamesController.createNew)      // Create
    app.route("/games/:id")
        .get(gamesController.getById)         // Read
        .put(gamesController.editById)        // Update
        .delete(gamesController.deleteById)   // Delete
}