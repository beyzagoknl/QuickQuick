import { createApp } from "vue";
import App from "./App.vue";
import {router} from './router';
import axios from 'axios';
import 'chart.js';

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

axios.defaults.withCredentials = true;

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')