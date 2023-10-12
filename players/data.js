let data = [
    { id: 1, name: "Kristjan", playTime: 29.99 },
    { id: 2, name: "Tiit", playTime: 59.99 },
    { id: 3, name: "Teet", playTime: 26.99 },
    { id: 4, name: "Tiia", playTime: 0 },
    { id: 5, name: "Tabatha", playTime: 0 }
]

exports.getAll = () => {
    return data.map(g => { return { "id": g.id, "name": g.name } })
}
exports.getById = (id) => {
    return data.find((thing) => thing.id == parseInt(id))
}
exports.create = (newPlayer) => {
    const newId = Math.max(...data.map((thing) => thing.id)) + 1
    newPlayer.id = newId
    data.push(newPlayer)
    return newPlayer
}
exports.edit = (modifiedPlayer) => {
    var toBeUpdated = this.getById(modifiedPlayer.id)
    if (toBeUpdated === undefined) {
        return
    }
    updatedPlayer = { ...toBeUpdated, ...modifiedPlayer }
    return updatedPlayer
}

exports.delete = (id) => {
    var toBeDeleted = this.getById(id)
    if (toBeDeleted === undefined) {
        return
    }
    data = data.filter((e) => toBeDeleted.id != e.id)
    return toBeDeleted
}