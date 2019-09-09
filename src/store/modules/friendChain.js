import service from '../../api/index'

const server = service.friendChain

const actions = {
  async getFriendChain ({commit}, data) {
    let res = await server.getFriendChain(data)
    commit
    return res.data
  },
  async addFriendChain ({commit}, data) {
    let res = await server.addFriendChain(data)
    commit
    return res.data
  },
  async delFriendChain ({commit}, data) {
    let res = await server.delFriendChain(data)
    commit
    return res.data
  }
}

export default ({
  actions
})
