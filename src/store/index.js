import { createStore } from 'vuex'

import article from './modules/article'
import user from './modules/user'

export const router = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    article,
    user
  }
})

export default router
