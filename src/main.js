import { createApp } from "vue";
import App from "./App.vue";
import {router} from './router';
import axios from 'axios';

// import "bootstrap/dist/css/bootstrap.min.css";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

axios.defaults.withCredentials = true;
// axios.defaults.baseURL

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')