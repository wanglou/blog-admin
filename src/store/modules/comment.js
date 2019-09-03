import service from '../../api/index'

const server = service.comment

const actions = {
  async articleComment ({commit}, data) {
    let res = await server.articleComment(data)
    commit
    return res.data
  },
  async commentDetail ({commit}, data) {
    let res = await server.commentDetail(data)
    commit
    return res.data
  },
  async addComment ({commit}, data) {
    let res = await server.addComment(data)
    commit
    return res.data
  },
  async delComment ({commit}, data) {
    let res = await server.delComment(data)
    commit
    return res.data
  }
}

export default ({
  actions
})
