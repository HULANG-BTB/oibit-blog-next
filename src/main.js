import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'
import '@/styles/app.scss'
import 'nprogress/nprogress.css'

import lazyLoad from '@/directive/lazy-load'
import SvgIcon from '@/components/svg-icon'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(lazyLoad)
app.use(SvgIcon)
app.mount('#app')
