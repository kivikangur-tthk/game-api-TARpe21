const games = require("../games/data")
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = (req, res) => {
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
}
// READ
exports.getAll = (req, res) => {
    res.send(games.getAll())
}
exports.getById = (req, res) => {
    const foundGame = games.getById(req.params.id)
    if (foundGame === undefined) {
        return res.status(404).send({ error: `Game not found` })
    }
    res.send(foundGame)
}
// UPDATE
exports.editById = (req, res) => {

}
// DELETE
exports.deleteById = (req, res) => {
    if (games.delete(req.params.id) === undefined) {
        return res.status(404).send({ error: "Game not found" })
    }
    res.status(204).send()
}