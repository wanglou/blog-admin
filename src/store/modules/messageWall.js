import service from '../../api/index'

const server = service.messageWall

const actions = {
  async messageList ({commit}, data) {
    let res = await server.messageList(data)
    commit
    return res.data
  },
  async delMessage ({commit}, data) {
    let res = await server.delMessage(data)
    commit
    return res.data
  }
}

export default ({
  actions
})
