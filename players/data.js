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