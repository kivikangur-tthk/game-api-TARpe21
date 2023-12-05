export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{gameInModal.id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td>{{gameInModal.name}}</td>
    </tr>
    <tr>
        <th>Price</th>
        <td>{{gameInModal.price}}</td>
    </tr>
</table>`,
    props: ["gameInModal"]
}