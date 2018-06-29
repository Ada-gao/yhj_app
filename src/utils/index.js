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
