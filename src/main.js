import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store';
import App from './App.vue'
import VocabDisplay from './components/VocabDisplay.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
    {
        path: '/',
        name: 'Home',
        component: VocabDisplay
    }
]
})

createApp(App).use(store).use(router).mount('#app')
