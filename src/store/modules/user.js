import service from '../../api/index'

const server = service.user
const state = {
  user: ''
}
const getters = {
  user(state) {
    return state.user
  }
}
const mutations = {
  user (state, data) {
    state.user = data.data.result
  }
}
const actions = {
  async fiveCount ({commit}, data) {
    let res = await server.fiveCount(data)
    commit
    return res.data
  },
  async getCount ({commit}, data) {
    let res = await server.getCount(data)
    commit
    return res.data
  },
  async getIndexArticle ({commit}, data) {
    let res = await server.getIndexArticle(data)
    commit
    return res.data
  },
  async initPage ({commit}, data) {
    let res = await server.initPage(data)
    commit('user', res)
  },
  async getUser ({commit}, data) {
    let res = await server.getUser(data)
    commit
    return res.data
  },
  async addUser ({commit}, data) {
    let res = await server.addUser(data)
    commit
    return res.data
  },
  async delUser ({commit}, data) {
    let res = await server.delUser(data)
    commit
    return res.data
  },
  async updateUser ({commit}, data) {
    let res = await server.updateUser(data)
    commit
    return res.data
  },
  async login ({commit}, data) {
    let res = await server.login(data)
    commit
    return res.data
  },
  async logout ({commit}, data) {
    let res = await server.logout(data)
    commit
    return res.data
  },
  async getWeather ({commit}, data) {
    let res = await server.getWeather(data)
    commit
    return res.data
  },
  async getIp ({commit}, data) {
    let res = await server.getIp(data)
    commit
    return res.data
  }
}

export default ({
  state,
  getters,
  actions,
  mutations
})
