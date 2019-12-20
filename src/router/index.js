import Vue from 'vue'
import Router from 'vue-router'

import login from '@/pages/login'
import home from '@/pages/home'
import noFind from '@/pages/noFind'
import index from '@/pages/modules/index'
// 用户
import user from '@/pages/user/user'
// 文章
import articlePage from '@/pages/article/articlePage'
import addArticle from '@/pages/article/addArticle'
import readArticle from '@/pages/article/readArticle'
// 评论
import commentPage from '@/pages/comment/commentPage'
import commentDetail from '@/pages/comment/commentDetail'
// 留言墙
import messageWall from '@/pages/messageWall/messageWall'
// 友链
import friendChain from '@/pages/friendChain/friendChain'
// 聊天室
import chatRoom from '@/pages/chatRoom/chatRoom'
// 小游戏
import game from '@/pages/game/game'

Vue.use(Router)
var routes = [
  {
    path: '/home',
    name: 'home',
    component: home,
    redirect: '/index',
    children: [
      { path: '/index', meta: {defaultActive: '/index', name: '首页'}, component: index },
      { path: '/user', meta: {defaultActive: '/user', name: '用户'}, component: user },
      { path: '/articlePage', meta: {defaultActive: '/articlePage', name: '文章'}, component: articlePage },
      { path: '/addArticle', meta: {defaultActive: '/articlePage', name: '文章'}, component: addArticle },
      { path: '/readArticle', meta: {defaultActive: '/articlePage', name: '文章'}, component: readArticle },
      { path: '/comment', meta: {defaultActive: '/comment', name: '评论'}, component: commentPage },
      { path: '/commentDetail', meta: {defaultActive: '/comment', name: '评论'}, component: commentDetail },
      { path: '/messageWall', meta: {defaultActive: '/messageWall', name: '留言墙'}, component: messageWall },
      { path: '/friendChain', meta: {defaultActive: '/friendChain', name: '友链'}, component: friendChain },
      { path: '/chatRoom', meta: {defaultActive: '/chatRoom', name: '聊天室'}, component: chatRoom },
      { path: '/game', meta: {defaultActive: '/game', name: '小游戏'}, component: game }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '*',
    name: 'noFind',
    component: noFind
  }
]
export default new Router({
  routes: routes
})
