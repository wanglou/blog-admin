import axios from './axios'

export function getFriendChain (data) {
  return axios.get('/friendChain', {params: data}).then((res) => res)
}
export function addFriendChain (data) {
  return axios.post('/friendChain', data).then((res) => res)
}
export function delFriendChain (data) {
  return axios.delete('/friendChain', {params: data}).then((res) => res)
}
export function getWebsocketTest (data) {
  return axios.get('/websocketTest', {params: data}).then((res) => res)
}