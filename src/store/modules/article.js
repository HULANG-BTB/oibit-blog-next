import request from '@/utils/request'

const state = {
  list: [],
  page: 1,
  limit: 10
}

const getters = {
  articles: state => {
    return state['list']
  }
}

const actions = {
  getArticleList: async ({ commit, state }) => {
    const data = await request({
      method: 'post',
      url: '/data/api/Article/getArticleListByPaginator',
      data: {
        page: state.page,
        limit: state.limit
      }
    })
    commit('SET_LIST', data.data.data)
  },
  loadMoreArticle: async ({ commit, state }) => {
    const data = await request({
      method: 'post',
      url: '/data/api/Article/getArticleListByPaginator',
      data: {
        page: ++state.page,
        limit: state.limit
      }
    })
    commit('APPEND_LIST', data.data.data)
  }
}

const mutations = {
  SET_LIST: (state, list) => {
    state.list = list
  },
  APPEND_LIST: (state, list) => {
    state.list.push(...list)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
