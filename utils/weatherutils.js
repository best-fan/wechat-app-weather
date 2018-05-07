//获取天气状态
function getweather(wea) {
  var status = wea+'';
  //console.log(status)
  switch (status) {
    case "CLEAR_DAY":
    case 'CLEAR_NIGHT':
      status = '晴'
      return status;
      break;
    case 'PARTLY_CLOUDY_DAY':
    case 'PARTLY_CLOUDY_NIGHT':
      status = '多云'
      return status;
      break;
    case 'CLOUDY':
      status = '阴'
      return status;
      break;
    case 'RAIN':
      status = '雨'
      return status;
      break;
    case 'SNOW':
      status = '雪'
      return status;
      break;
    case 'WIND':
      status = '风'
      return status;
      break;
    case 'FOG':
      status = '雾'
      return status;
      break;
    case 'HAZE':
      status = '霾'
      return status;
      break;
    default:
    status='未知天气'
    return status;
    break;
  }
}
//获取风向
function getwind(db) {
  var db = db * 1;
  var wind;
  if (db < 45) {
    if (db == 0) {
      wind = "北风";
    } else {
      wind = "东北风";
    }
  } else if (db >= 45 && db <= 90) {
    if (db == 90) {
      wind = "东风";
    } else {
      wind = "东北风";

    }

  } else if ((db > 90 && db <= 180)) {
    if (db == 180) {
      wind = "南风";
    } else {
      wind = "东南风";
    }
  } else if ((db > 180 && db <= 270)) {
    if (db == 270) {
      wind = "西风";
    } else {
      wind = "西南风";
    }
  }
  else {
    wind = "西北风";
  }
  return wind;
}
//获取风力
function getwindpower(doub){
  var doub = Number(doub);
  if (doub < 1) {
    return "无风";
  } else if (doub >= 1 && doub < 6) {
    return "软风";

  } else if (doub >= 6 && doub < 12) {
    return "轻风";

  } else if (doub >= 12 && doub < 20) {
    return "微风";

  } else if (doub >= 20 && doub < 38) {
    return "和风";

  } else if (doub >= 38 && doub < 61) {
    return "强风";

  } else if (doub >= 61 && doub < 88) {
    return "大风";

  } else if (doub >= 89 && doub < 117) {
    return "暴风";

  } else {
    return "台风";
  }
}
//获取湿度
function gethumidity(str){
  var st = str.toString();
    st= st.split('.');
  // console.log(st[1])
  return st[1]+'%'
}
//获取时间
function gettime(res){
  var ress = res;
  var arr = new Array()
  for(var i=0;i<10;i++){
  var res = ress[i].datetime;
  res = res.split(' ')
  arr.push(res[1]);
  }
  // console.log(wind)

  // console.log(arr)
return arr;
}
//获取风力
function getwinds(res){
  var ress = res;
  var wind = new Array()
  for (var i = 0; i < 10; i++) {
    wind.push(getwindpower(ress[i].speed))
  }
  return wind;
}
//获取日期
function getdatas(res){
  var ress = res;
  var data = new Array()
  for (var i = 0; i < 5; i++) {
    var res = ress[i].date;
      res = res.split('-')
      data.push(res[1]+'/'+res[2])
  }
  return data;
  //console.log(data)
}
//获取天气数组
function getweathers(res){
  var ress = res;
  var weathers = new Array()
  for (var i = 0; i < 5; i++) {
    weathers.push(getweather(ress[i].value))
  }
  return weathers;
}
//时间戳转换
function formatDateTime(inputTime) {
  var date = new Date();
  date.setTime(inputTime * 1000);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;     
}; 
//将方法暴露出来
module.exports = {
  getweather: getweather,
  getwind: getwind,
  getwindpower: getwindpower,
  gethumidity: gethumidity,
  gettime: gettime,
  getwinds:getwinds,
  getdatas: getdatas,
  getweathers: getweathers,
  formatDateTime: formatDateTime,
}