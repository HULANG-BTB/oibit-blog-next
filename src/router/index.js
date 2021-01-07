import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { throttle, debounce } from '@/utils'

import routes from './routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  throttle(() => {
    NProgress.start()
  })()
  next()
})

router.afterEach(() => {
  debounce(() => {
    NProgress.done()
  })()
  NProgress.done()
})

export default router
