import axios from './axios'

export function getArticleList (data) {
  return axios.get('/article', {params: data}).then((res) => res)
}
export function addArticle (data) {
  return axios.post('/article', data).then((res) => res)
}
export function delArticle (data) {
  return axios.delete('/article', {params: data}).then((res) => res)
}
export function updateArticle (data) {
  return axios.put('/article', data).then((res) => res)
}
export function articleDetail (data) {
  return axios.get('/article/detail', {params: data}).then((res) => res)
}
export function articleCategory (data) {
  return axios.get('/article/category', {params: data}).then((res) => res)
}
export function addArticleCategory (data) {
  return axios.post('/article/category', data).then((res) => res)
}
export function delArticleCategory (data) {
  return axios.delete('/article/category', {params: data}).then((res) => res)
}
export function categoryHasArticle (data) {
  return axios.get('/category/has/article', {params: data}).then((res) => res)
}
