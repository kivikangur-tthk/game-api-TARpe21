let data = [
    { id: 1, name: "Witcher 3", price: 29.99 },
    { id: 2, name: "Cyberpunk 2077", price: 59.99 },
    { id: 3, name: "Minecraft", price: 26.99 },
    { id: 4, name: "Counter-Strike: Global Offencive", price: 0 },
    { id: 5, name: "Roblox", price: 0 }
]

exports.getAll = () => {
    return data
}
exports.getById = (id) => {
    return data
}