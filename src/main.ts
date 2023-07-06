import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'normalize.css/normalize.css'
import 'tdesign-vue-next/es/style/index.css'
import 'animate.css'
import '@/assets/styles/common.scss'
import './permission'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
