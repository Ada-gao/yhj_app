export function transformText (source, k) {
  if (!source && typeof source !== 'object') {
    return '无'
    // throw new Error('error arguments', 'shallowClone')
  }
  let obj = {}
  source.forEach((val) => {
    let key = val.value || val.positionId || val.productTypeId
    obj[key] = val.label || val.positionName || val.name
  })
  k = obj[k]
  return k
}

export function parseTime (time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

let queryObj = {
  callResult: [
    {label: '占线', value: '1'},
    {label: '未外呼', value: '2'},
    {label: '无人接听', value: '3'},
    {label: '无意向拒绝', value: '4'},
    {label: '有意向进一步跟进', value: '5'}
  ],
  gender: [
    {label: '男', value: 'GENTLEMAN'},
    {label: '女', value: 'FEMALE'}
  ]
}
export { queryObj }
