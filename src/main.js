import router from './router'
import store from './store'

import 'normalize.css/normalize.css'
import '@/styles/app.scss'
import 'nprogress/nprogress.css'

import lazyLoad from '@/directive/lazy-load'
import SvgIcon from '@/components/svg-icon'

export default app => {
  app.use(store)
  app.use(router)
  app.use(lazyLoad)
  app.use(SvgIcon)
}
