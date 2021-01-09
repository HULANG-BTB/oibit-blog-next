import App from './App.vue'
import { createApp } from 'vue'
import mountApp from './main'

const app = createApp(App)
mountApp(app)
app.mount('#app')

export default app
