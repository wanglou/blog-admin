import axios from 'axios'
import querystring from 'querystring'
import router from '../router'
const service = axios.create({
  baseURL: ''
})

// 拦截器
service.interceptors.request.use(config => {
  if (
    config.method === 'post' ||
    config.method === 'put' ||
    config.method === 'delete'
  ) {
    config.data = querystring.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  if (response.data.code === -2) {
    router.push('/login')
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default service
