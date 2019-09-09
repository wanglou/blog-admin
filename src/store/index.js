import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import article from './modules/article'
import comment from './modules/comment'
import messageWall from './modules/messageWall'
import friendChain from './modules/friendChain'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    article,
    comment,
    messageWall,
    friendChain
  }
})
