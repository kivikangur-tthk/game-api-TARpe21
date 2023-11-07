const app = Vue.createApp({
    data() {
        return {
            gameInModal: { id: null, name: null, price: null },
            games: []
        }
    },
    async created() {
        this.games = await (await fetch("http://localhost:8080/games")).json()
    },
    methods: {
        getGame: async function (id) {
            this.gameInModal = await (await fetch("http://localhost:8080/games/" + id)).json()
            let gameInfoModal = new bootstrap.Modal(document.getElementById("gameInfoModal"))
            gameInfoModal.show()
        }
    }
})

app.mount('#app')