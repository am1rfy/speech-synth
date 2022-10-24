import { createApp } from 'vue'
import App from './App.vue'

import router from './routes/router.js'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app
    .use(ElementPlus)
    .use(pinia)
    .use(router)
    .mount('#app')
