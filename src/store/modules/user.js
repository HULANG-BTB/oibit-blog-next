// import request from '@/utils/request'

const state = {
  isAuth: false,
  info: {}
}

const getters = {
  isAuth: state => state.isAuth,
  info: state => state.info
}

const actions = {
  // getArticleList: async ({ commit, state }) => {
  //   const data = await request({
  //     method: 'post',
  //     url: '/data/api/Article/getArticleListByPaginator',
  //     data: {
  //       page: state.page,
  //       limit: state.limit
  //     }
  //   })
  //   commit('SET_LIST', data.data.data)
  // },
  // loadMoreArticle: async ({ commit, state }) => {
  //   const data = await request({
  //     method: 'post',
  //     url: '/data/api/Article/getArticleListByPaginator',
  //     data: {
  //       page: ++state.page,
  //       limit: state.limit
  //     }
  //   })
  //   commit('APPEND_LIST', data.data.data)
  // }
}

const mutations = {
  SET_AUTH: (state, isAuth) => {
    state.isAuth = isAuth
  },
  SET_INFO: (state, info) => {
    state.info = info
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
