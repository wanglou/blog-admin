import axios from './axios'
// 获取留言
export function messageList(data) {
  return axios.get('/messageList', {params: data}).then((res) => res)
}
// 删除留言
export function delMessage(data) {
  return axios.delete('/messageList', {params: data}).then((res) => res)
}
