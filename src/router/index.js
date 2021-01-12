import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { throttle, debounce } from '@/utils'

import routes from './routes'

import store from '@/store'

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
  console.log(to)
  const needAuth = to.meta?.needAuth
  if (needAuth) {
    const isAuth = store.getters['user/isAuth']
    if (isAuth) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  debounce(() => {
    NProgress.done()
  })()
  NProgress.done()
})

export default router
