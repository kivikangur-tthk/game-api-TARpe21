const { db } = require("../db")
const players = db.players
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Required parameter 'name' is missing" })
    }
    const createdPlayer = await players.create({ ...req.body }, {
        fields: ["name", "playTime"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/players/${createdPlayer.id}`)
        .send(createdPlayer)
}
// READ
exports.getAll = async (req, res) => {
    const result = await players.findAll({ attributes: ["id", "name"] })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundPlayer = await players.findByPk(req.params.id)
    if (foundPlayer === null) {
        return res.status(404).send({ error: `Player not found` })
    }
    res.json(foundPlayer)
}
// UPDATE
exports.editById = async (req, res) => {
    const updateResult = await players.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["name", "playTime"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Player not found" })
    }
    res.status(202)
        .location(`${getBaseurl(req)}/players/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await players.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Player not found" })
    }
    res.status(204).send()
}