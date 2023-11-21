export default {
    /*html*/
    template: `
<div id="playerInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{playerInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input v-model="modifiedPlayer.name"></td>
                        <td v-else>{{playerInModal.name}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <template v-if="isEditing">
                    <button type="button" class="btn btn-success" @click="saveModifiedPlayer">Save</button>
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
    emits: ["playerUpdated"],
    props: {
        playerInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedPlayer: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedPlayer = { ...this.playerInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedPlayer() {
            console.log("Saving:", this.modifiedPlayer)
            const rawResponse = await fetch(this.API_URL + "/players/" + this.modifiedPlayer.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedPlayer)
            });
            console.log(rawResponse);
            this.$emit("playerUpdated", this.modifiedPlayer)
            this.isEditing = false
        }
    }
}