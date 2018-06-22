import axios from 'axios'

axios.defaults.baseURL = process.env.BASE_API
axios.defaults.timeout = 15000

axios.interceptors.request.use(config => {
  config.headers['Authorization'] = localStorage.getItem('token')
  return config
}, error => {
  return Promise.reject(error)
})

export const requestLogin = params => axios.post('/auth/login', params)
export const getUser = () => axios.get('/auth/user')
export const postTrial = params => axios.post('/api/trial',params)
export const postVerification = params => axios.post('/api/sms/send',params)
