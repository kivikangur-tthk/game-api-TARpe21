export default {
    /*html*/
    template: `
    <table id="gamesTable" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="game in games">
                <td @click="getGame(game.id)">{{ game.name }}</td>
                <td>{{ game.price }}</td>
            </tr>
        </tbody>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            games: []
        }
    },
    async created() {
        this.games = await (await fetch("http://localhost:8080/games")).json()
    },
    // async beforeUpdate() {
    //     this.games = await (await fetch("http://localhost:8080/games")).json()
    // },
    methods: {
        getGame: async function (id) {
            const gameInModal = await (await fetch(this.API_URL + "/games/" + id)).json()
            this.$emit("showModal", gameInModal)
        }
    }
}