import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(VueAxios, axios, Request)
    .mount('#app')
