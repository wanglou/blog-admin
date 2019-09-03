import service from '../../api/index'

const server = service.article

const actions = {
  async getArticleList ({commit}, data) {
    let res = await server.getArticleList(data)
    commit
    return res.data
  },
  async addArticle ({commit}, data) {
    let res = await server.addArticle(data)
    commit
    return res.data
  },
  async delArticle ({commit}, data) {
    let res = await server.delArticle(data)
    commit
    return res.data
  },
  async updateArticle ({commit}, data) {
    let res = await server.updateArticle(data)
    commit
    return res.data
  },
  async articleDetail ({commit}, data) {
    let res = await server.articleDetail(data)
    commit
    return res.data
  },
  async articleCategory ({commit}, data) {
    let res = await server.articleCategory(data)
    commit
    return res.data
  },
  async addArticleCategory ({commit}, data) {
    let res = await server.addArticleCategory(data)
    commit
    return res.data
  },
  async delArticleCategory ({commit}, data) {
    let res = await server.delArticleCategory(data)
    commit
    return res.data
  },
  async categoryHasArticle ({commit}, data) {
    let res = await server.categoryHasArticle(data)
    commit
    return res.data
  }
}

export default ({
  actions
})
