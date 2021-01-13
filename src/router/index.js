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

router.beforeEach(async (to, from, next) => {
  throttle(() => {
    NProgress.start()
  })()
  const needAuth = to.meta?.needAuth
  if (needAuth) {
    const isAuth = store.getters['user/isAuth']
    if (isAuth) {
      next()
    } else {
      const profile = await store.dispatch('user/profile')
      if (profile.id) {
        next()
      } else {
        next({ name: 'Login', query: { redirect: to.fullPath } })
      }
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
