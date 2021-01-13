import request from '@/utils/request'
import Cookies from 'js-cookie'

const state = {
  isAuth: false,
  info: {},
  accessToken: Cookies.get('accessToken') || ''
}

const getters = {
  isAuth: state => state.isAuth,
  info: state => state.info
}

const actions = {
  login: async ({ commit }, { username, password }) => {
    const data = await request({
      method: 'post',
      url: '/api/user/login',
      data: { username, password }
    })
    if (data.token) {
      commit('SET_INFO', data)
      commit('SET_ACCESSTOKEN', data.token)
      commit('SET_AUTH', true)
    }
    return data
  },
  profile: async ({ commit }) => {
    const data = await request({
      method: 'get',
      url: '/api/user/profile'
    })
    if (data.id) {
      commit('SET_INFO', data)
      commit('SET_AUTH', true)
    }
    return data
  }
}

const mutations = {
  SET_AUTH: (state, isAuth) => {
    state.isAuth = isAuth
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  SET_ACCESSTOKEN: (state, token) => {
    Cookies.set('accessToken', token)
    state.accessToken = token
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
