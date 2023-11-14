import gamesList from "./GamesList.js"
import gameInfoModal from "./GameInfoModal.js"
export default {
    /*html*/
    template: `
    <games-list @showModal="openModal"></games-list>
    <game-info-modal :gameInModal="gameInModal"></game-info-modal>
    `,
    components: {
        gamesList,
        gameInfoModal
    },
    data() {
        return {
            msg: 'Hello world!',
            gameInModal: { id: "", name: "", price: "" }
        }
    },
    methods: {
        openModal(game) {
            this.gameInModal = game
            let gameInfoModal = new bootstrap.Modal(document.getElementById("gameInfoModal"))
            gameInfoModal.show()
        }
    }
}