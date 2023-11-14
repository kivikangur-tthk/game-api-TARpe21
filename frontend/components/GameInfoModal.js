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
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{gameInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input v-model="modifiedGame.name"></td>
                        <td v-else>{{gameInModal.name}}</td>
                    </tr>
                    <tr>
                        <th>Price</th>
                        <td v-if="isEditing"><input v-model="modifiedGame.price"></td>
                        <td v-else>{{gameInModal.price}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <template v-if="isEditing">
                    <button type="button" class="btn btn-success" @click="saveModifiedGame">Save</button>
                    <button type="button" class="btn btn-secondary" @click="cancelEditing">Cancel</button>
                </template>
                <template v-else>
                    <button type="button" class="btn btn-warning" @click="startEditing">Edit</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </template>
            </div>
        </div>
    </div>
</div>
    `,
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
        }
    }
}