import gamesList from "../components/GamesList.js"
import gameInfoModal from "../components/GameInfoModal.js"
export default {
    /*html*/
    template: `
    <games-list :key="update" @showModal="openModal"></games-list>
    <game-info-modal @gameUpdated="updateView" :gameInModal="gameInModal"></game-info-modal>
    `,
    components: {
        gamesList,
        gameInfoModal
    },
    data() {
        return {
            update: 0,
            gameInModal: { id: "", name: "", price: "" }
        }
    },
    methods: {
        openModal(game) {
            this.gameInModal = game
            let gameInfoModal = new bootstrap.Modal(document.getElementById("gameInfoModal"))
            gameInfoModal.show()
        },
        updateView(game) {
            this.update++
            this.gameInModal = game
        }
    }
}