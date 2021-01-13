import request from '@/utils/request'
import Cookies from 'js-cookie'

const state = {
  isAuth: false,
  profile: {},
  accessToken: Cookies.get('accessToken') || ''
}

const getters = {
  isAuth: state => state.isAuth,
  profile: state => state.profile,
  token: state => state.accessToken
}

const actions = {
  login: async ({ commit }, { username, password }) => {
    const data = await request({
      method: 'post',
      url: '/api/user/login',
      data: { username, password }
    })
    if (data.token) {
      commit('SET_PROFILE', data)
      commit('SET_ACCESSTOKEN', data.token)
      commit('SET_AUTH', true)
    } else {
      commit('SET_AUTH', false)
    }
    return data
  },
  profile: async ({ commit }) => {
    const data = await request({
      method: 'get',
      url: '/api/user/profile'
    })
    if (data.id) {
      commit('SET_PROFILE', data)
      commit('SET_AUTH', true)
    } else {
      commit('SET_AUTH', false)
    }
    return data
  },
  logout: async ({ commit }) => {
    const data = await request({
      method: 'get',
      url: '/api/user/logout'
    })
    commit('SET_AUTH', false)
    commit('SET_PROFILE', {})
    commit('SET_ACCESSTOKEN', '')
    return data
  }
}

const mutations = {
  SET_AUTH: (state, isAuth) => {
    state.isAuth = isAuth
  },
  SET_PROFILE: (state, profile) => {
    state.profile = profile
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
