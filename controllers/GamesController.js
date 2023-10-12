const { db } = require("../db")
const games = db.games
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const createdGame = await games.create(req.body, {
        fields: ["name", "price"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/games/${createdGame.id}`)
        .json(createdGame)
}
// READ
exports.getAll = async (req, res) => {
    const result = await games.findAll({ attributes: ["id", "name"] })
    res.send(JSON.stringify(result))
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