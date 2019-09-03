import axios from './axios'
// 获取天气
export function getWeather (data) {
  return axios.get('/getWeather', {params: data}).then((res) => res)
}
// 获取ip
export function getIp (data) {
  return axios.get('/getIp', {params: data}).then((res) => res)
}
// 初始化信息
// 获取用户列表
export function getUser (data) {
  return axios.get('/user', {params: data}).then((res) => res)
}
// 初始化信息
export function initPage () {
  return axios.get('/initPage').then((res) => res)
}
// 添加用户
export function addUser (data) {
  return axios.post('/user', data).then((res) => res)
}
// 删除用户
export function delUser (data) {
  return axios.delete('/user', {params: data}).then((res) => res)
}
// 编辑用户
export function updateUser (data) {
  return axios.put('/user', data).then((res) => res)
}
// 登录
export function login (data) {
  return axios.post('/login', data).then((res) => res)
}
// 退出
export function logout () {
  return axios.get('/logout').then((res) => res)
}
