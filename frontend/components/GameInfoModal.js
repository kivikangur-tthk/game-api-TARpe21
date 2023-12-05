import confirmationModal from "./ConfirmationModal.js"
import gameForm from "./game/GameForm.js"
import gameDetails from "./game/GameDetails.js"
export default {
    /*html*/
    template: `
<div id="gameInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <game-form v-if="isEditing" v-model:id="modifiedGame.id" v-model:name="modifiedGame.name" v-model:price="modifiedGame.price" ></game-form>
                <game-details v-else :gameInModal="gameInModal"></game-details>
            </div>
            <div class="modal-footer">
                <div class="container">
                    <div class="row">
                        <template v-if="isEditing">
                            <div class="col me-auto">
                                <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                            </div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-success mx-2" @click="saveModifiedGame">Save</button>
                                <button type="button" class="btn btn-secondary" @click="cancelEditing">Cancel</button>
                            </div>
                        </template>
                        <template v-else>
                            <div class="col me-auto"></div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-warning mx-2" @click="startEditing">Edit</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<confirmation-modal :target="'#gameInfoModal'" @confirmed="deleteGame"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        gameForm,
        gameDetails
    },
    emits: ["gameUpdated"],
    props: {
        gameInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedGame: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedGame = { ...this.gameInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedGame() {
            console.log("Saving:", this.modifiedGame)
            const rawResponse = await fetch(this.API_URL + "/games/" + this.modifiedGame.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedGame)
            });
            console.log(rawResponse);
            this.$emit("gameUpdated", this.modifiedGame)
            this.isEditing = false
        },
        deleteGame() {
            console.log("DELETE confirmed");
        }
    }
}