import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import ChildComp from './ChildComp.js'
const app = createApp({
    components: {
        ChildComp
    },
    data() {
        return {
            gameInModal: { id: null, name: null, price: null },
            games: [],
            childMsg: 'No child msg yet'
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