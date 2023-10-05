const players = require("../players/data")
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Required parameter 'name' is missing" })
    }
    const createdPlayer = players.create({
        name: req.body.name
    })
    res.status(201)
        .location(`${getBaseurl(req)}/players/${createdPlayer.id}`)
        .send(createdPlayer)
}
// READ
exports.getAll = (req, res) => {
    res.send(players.getAll())
}
exports.getById = (req, res) => {
    const foundPlayer = players.getById(req.params.id)
    if (foundPlayer === undefined) {
        return res.status(404).send({ error: `Player not found` })
    }
    res.send(foundPlayer)
}
// UPDATE
exports.editById = (req, res) => {

}
// DELETE
exports.deleteById = (req, res) => {
    if (players.delete(req.params.id) === undefined) {
        return res.status(404).send({ error: "Game not found" })
    }
    res.status(204).send()
}