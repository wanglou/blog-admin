import axios from './axios'

export function articleComment (data) {
  return axios.get('/article/comment', {params: data}).then((res) => res)
}
export function commentDetail (data) {
  return axios.get('/comment/detail', {params: data}).then((res) => res)
}
export function addComment (data) {
  return axios.post('/addComment', data).then((res) => res)
}
export function delComment (data) {
  return axios.delete('/delComment', {params: data}).then((res) => res)
}