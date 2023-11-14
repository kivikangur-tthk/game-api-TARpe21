export default {
    /*html*/
    template: `
    <table id="gamesTable" class="table table-striped table-bordered">
        <tr>
            <th>Name</th>
            <th>Price</th>
        </tr>
        <tr v-for="game in games">
            <td @click="getGame(game.id)">{{ game.name }}</td>
            <td>{{ game.price }}</td>
        </tr>
    </table>
    `,
    emits: {
        showModal: (game) => {
            console.log("Validation", game)
            return game.id && game.name && game.price
        }
    },
    data() {
        return {
            games: []
        }
    },
    async created() {
        this.games = await (await fetch("http://localhost:8080/games")).json()
    },
    methods: {
        getGame: async function (id) {
            const gameInModal = await (await fetch("http://localhost:8080/games/" + id)).json()
            console.log("GamesList: ", gameInModal)
            this.$emit("showModal", gameInModal)
        }
    }
}