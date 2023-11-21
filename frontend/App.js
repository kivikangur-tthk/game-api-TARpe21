export default {
    /*html*/
    template: `
    <h1>Hello App!</h1>
    <p>
      <router-link to="/games">Go to Games List</router-link>
      <router-link to="/players">Go to Players List</router-link>
    </p>
    <router-view></router-view>
    `
}