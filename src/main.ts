import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

const pinia = createPinia()
const app = createApp(App)

//@ts-ignore
app.use(Buefy)
app.use(pinia)
app.mount('#app')
