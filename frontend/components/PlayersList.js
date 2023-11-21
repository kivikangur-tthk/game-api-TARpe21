export default {
    /*html*/
    template: `
    <table id="playersTable" class="table table-striped table-bordered">
        <tr>
            <th>Name</th>
        </tr>
        <tr v-for="player in players">
            <td @click="getPlayer(player.id)">{{ player.name }}</td>
        </tr>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            players: []
        }
    },
    async created() {
        this.players = await (await fetch("http://localhost:8080/players")).json()
    },
    methods: {
        getPlayer: async function (id) {
            const playerInModal = await (await fetch(this.API_URL + "/players/" + id)).json()
            this.$emit("showModal", playerInModal)
        }
    }
}