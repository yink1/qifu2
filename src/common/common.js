
// 时间格式化方法
export function timeFormat (time) {
  var timeFormat = new Date(time)
  return timeFormat.getFullYear() + '-' + (timeFormat.getMonth() + 1) + '-' + timeFormat.getDate()
}
