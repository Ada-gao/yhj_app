import axios from 'axios'

axios.defaults.baseURL = process.env.BASE_API
axios.defaults.timeout = 15000

axios.interceptors.request.use(config => {
  config.headers['Authorization'] = localStorage.getItem('token')
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // console.log(response.config.url)
  return response
}, error => {
  // console.log(error.response.config.url)
  // console.log(error.response)
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token')
    this.$toast.text('你的身份信息已失效，请重新输入密码登录。')
    this.$router.replace({
      path: '/login',
      query: {redirect: this.$router.currentRoute.fullPath}
    })
  } else {
    this.$toast.fail({
      duration: 1000,
      message: error.response
    })
  }
  return Promise.reject(error.response)
})

// 登陆验证
export const requestLogin = params => axios.post('/auth/login', params)
// 提交申请体验
export const postTrial = params => axios.post('/trial', params)
// 发送验证码
export const postVerification = (mobilePhone) => axios.post('/sms/send?phoneNum=' + mobilePhone)
// 检验验证码
export const postVerify = (phoneNum, verifyCode) => axios.post('/sms/verify?phoneNum=' + phoneNum + '&verifyCode=' + verifyCode)
// 获取行业分类
export const getIndustry = () => axios.get('/industry/auth/getAllTypes')
// 获取公司规模
export const getOrg = () => axios.get('/dict/TypeorgSize')
// 获取用户信息
export const getUser = () => axios.get('/app/me')
// 个人任务完成统计
export const getTaskStatistics = () => axios.get('/app/taskStatistics')
// 获取任务列表
export const getTaskList = (type, params) => axios.get('/app/tasks/' + type, { params: params })
// 开始外呼
export const getCall = (id) => axios.post('/app/call/' + id)
// 获取外呼时间
export const getCallStatus = (callSid) => axios.get('/app/callStatusResult/' + callSid)

// export const getTaskStatistics = () => axios.get('/app/taskStatistics')
// 获取用户所属公司
export const getCompany = () => axios.get('/app/getLogoAndName')
export const getHand = (fileUuid) => axios.get('/file/' + fileUuid)
// 获取用户个人任务统计
export const getSales = (userId) => axios.get('/task/statisBySales?userId=' + userId)
// export const postFeedback = (img) => axios.post('/app')
// 获取随机外呼
export const getRandom = () => axios.get('/app/nextTask')
// 获取外呼记录
export const getTaskHistory = (params) => axios.post('/app/tasks/history', params)
// 更新外呼客户信息
export const updateOutboundName = (id, params) => axios.put('/app/outboundName/' + id, params)
// 获取排名数据
export const getRank = (userId) => axios.get('/task/statisBySales?userId=' + userId)
// 获取排名数据
export const getTaskStatisticsDaily = () => axios.get('/task/statisBySalesDaily')
// 问题反馈-文字及上传图片
export const postFeedback = (imgData, content) => axios.post('/app/feedback?uuids=' + imgData + '&content=' + content)
// 问题反馈-单张图片上传
export const postUpload = (obj) => axios(
  {
    url: '/app/upload',
    method: 'post',
    data: obj,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
// 首页任务组统计
export const getStatisGroup = () => axios.get('/task/statisGroup')
// 获取任务完成状态
export const getCompleteStatus = (userId) => axios.get('/task/saleDailyCompleteStatus?userId=' + userId)
