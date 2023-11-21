import playersList from "../components/PlayersList.js"
import playerInfoModal from "../components/PlayerInfoModal.js"
export default {
    /*html*/
    template: `
    <players-list :key="update" @showModal="openModal"></players-list>
    <player-info-modal @playerUpdated="updateView" :playerInModal="playerInModal"></player-info-modal>
    `,
    components: {
        playersList,
        playerInfoModal
    },
    data() {
        return {
            update: 0,
            playerInModal: { id: "", name: "" }
        }
    },
    methods: {
        openModal(player) {
            this.playerInModal = player
            let playerInfoModal = new bootstrap.Modal(document.getElementById("playerInfoModal"))
            playerInfoModal.show()
        },
        updateView(player) {
            this.update++
            this.playerInModal = player
        }
    }
}