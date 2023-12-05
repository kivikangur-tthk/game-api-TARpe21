export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td><input :value="name" @input="$emit('update:name',$event.target.value)"></td>

    </tr>
    <tr>
        <th>Price</th>
        <td><input :value="price" @input="$emit('update:price',$event.target.value)"></td>
    </tr>
</table>`,
    props: ["id", "name", "price"],
    emits: ["update:name", "update:price"]
}