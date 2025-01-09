import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia';

import App from './App.vue'
import router from './router';

import i18n from './i18n';
import axios from 'axios';
axios.defaults.baseURL = `${import.meta.env.VITE_APP_API_URL}`

import dayjs from './plugins/dayjs';

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(i18n)
app.use(dayjs)
app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js';

