const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const week = date.getDay();  
  var str='';
  if (week == 0) {
    str = " 周日";
  } else if (week == 1) {
    str = " 周一";
  } else if (week == 2) {
    str = " 周二";
  } else if (week == 3) {
    str = " 周三";
  } else if (week == 4) {
    str = " 周四";
  } else if (week == 5) {
    str = " 周五";
  } else if (week == 6) {
    str = " 周六";
  }

  return [year, month, day].map(formatNumber).join('-') + str
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}  


module.exports = {
  formatTime: formatTime
}
