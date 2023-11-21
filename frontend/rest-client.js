import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.js'

import GamesView from './views/GamesView.js'
import PlayersView from './views/PlayersView.js'

const routes = [
    { path: "/games", component: GamesView },
    { path: "/players", component: PlayersView }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)

app.use(router)

app.config.globalProperties.API_URL = 'http://localhost:8080'
app.mount('#app')