import gamesList from "../components/GamesList.js"
import gameInfoModal from "../components/GameInfoModal.js"
import newObjectModal from "../components/NewObjectModal.js"
import gameForm from "../components/game/GameForm.js"
export default {
    /*html*/
    template: `
    <button class="btn btn-secondary" @click="newGame">New Game</button>
    <games-list :key="update" @showModal="openModal"></games-list>
    <game-info-modal @gameUpdated="updateView" :gameInModal="gameInModal"></game-info-modal>
    <new-object-modal id="newGameModal" @save="saveNewGame">
        <game-form v-model:name="gameInModal.name" v-model:price="gameInModal.price"></game-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    `,
    components: {
        gamesList,
        gameInfoModal,
        newObjectModal,
        gameForm
    },
    data() {
        return {
            update: 0,
            gameInModal: { id: "", name: "", price: "" },
            newGameModal: {},
            error: ""
        }
    },
    methods: {
        openModal(game) {
            this.gameInModal = game
            let gameInfoModal = new bootstrap.Modal(document.getElementById("gameInfoModal"))
            gameInfoModal.show()
        },
        newGame() {
            this.error = ""
            this.gameInModal = {}
            this.newGameModal = new bootstrap.Modal(document.getElementById("newGameModal"))
            this.newGameModal.show()
        },
        updateView(game) {
            this.update++
            this.gameInModal = game
        },
        async saveNewGame() {
            console.log("Saving:", this.gameInModal)
            const rawResponse = await fetch(this.API_URL + "/games/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.gameInModal)
            });
            if (rawResponse.ok) {
                this.newGameModal.hide()
                this.update++
            }
            else {
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }
        }
    }
}