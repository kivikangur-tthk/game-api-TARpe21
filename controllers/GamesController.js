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
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundGame = await games.findByPk(req.params.id)
    if (foundGame === null) {
        return res.status(404).send({ error: `Game not found` })
    }
    res.json(foundGame)
}
// UPDATE
exports.editById = async (req, res) => {
    console.log("Update:", req.params, req.body);
    const updateResult = await games.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["name", "price"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ "error": "game not found" })
    }
    res.status(204)
        .location(`${getBaseurl(req)}/games/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await games.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Game not found" })
    }
    res.status(204).send()
}