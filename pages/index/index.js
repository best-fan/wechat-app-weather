//index.js
//获取应用实例
const app = getApp()
const config = require('../../utils/config.js');
var getinfor = require('../../utils/weatherutils.js');
Page({
  data: {
    //地理位置
    desc:'',
    //经纬度
    location:'',
    //天气信息
    someresult:'',
    //全部天气信息
    allresult:'',
    //滚动文字展示天气 湿度 等
    msgList:'',
    //时间
    times:'',
    //风力
    winds:'',
    
    // 日期
    dates:'',
    //天气
    weathers:'',
    nowtime:'',
  },
  onLoad: function () {
    ////console.log("aaaa"+app.globalData.location)
    // 获取传参
    if (app.globalData.location.length == 0) {
      this.getlocation();
      //console.log('options为空')
    } else {
      this.setData({
        desc: app.globalData.location,
        location: app.globalData.jwd
      })
      wx.startPullDownRefresh();
     
    }
   

  },
  //设置标题栏颜色
  settitlecolor:function(res){
    //console.log('设置背景颜色')
    var color='';
    switch (res){
      case "CLEAR_DAY":
        color ="#396fe7";
        break;
      case "CLEAR_NIGHT":
        color = "#fe8b1d";
        break;
      case "PARTLY_CLOUDY_DAY":
        color = "#3976e7";
        break;
      case "PARTLY_CLOUDY_NIGHT":
        color = "#415fd0";
        break;
      case "CLOUDY":
        color = "#2ab3a4";
        break;
      case "RAIN":
        color = "#1db1e0";
        break;
      case "SNOW":
        color = "#1b74d8";
        break;  
      case "WIND":
        color = "#d5d398";
        break;  
      case "FOG":
        color = "#24bd7d";
        break;     
      case "HAZE":
        color = "#aec3c9";
        break;      
    }
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: color,
    })
  },
  showSettingPage:function(){
    wx.navigateTo({
      url: '../switchcity/switchcity',
    })
  },
  //获取位置信息
  getlocation:function(){
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        let latitude = res.latitude
        let longitude = res.longitude
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${config.key}`,
          success: res => {
            //console.log(res)
                   //成功回调
        app.globalData.location =res.data.result.address;
        app.globalData.wjd = res.data.result.ad_info.location.lat + ',' + res.data.result.ad_info.location.lng;
        that.setData({
          desc: res.data.result.address,
          location: res.data.result.ad_info.location.lng + ',' + res.data.result.ad_info.location.lat ,
         })

             that.getmoreweather();
             that.getweather();
           
          }
        })
      }
    })

  },
  //查看今天详细信息  页面跳转
  showDetailPage:function(){
    wx.navigateTo({
      url: '../detail/detail'
    })

  },
  //获取基本天气信息
  getweather:function(){
    var that=this;
    const requestTask = wx.request({
      url: 'https://api.caiyunapp.com/v2/key/' + that.data.location+'/realtime.json', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data)
       // //console.log(res.data.result.humidity)
        that.setData({
          someresult: res.data.result,
          msgList: [{ title: getinfor.getweather(res.data.result.skycon) + ',' + getinfor.getwind(res.data.result.wind.direction) + ',' + getinfor.getwindpower(res.data.result.wind.speed)},
            { title: '湿度:' + getinfor.gethumidity(res.data.result.humidity)+ ' PM2.5:' +res.data.result.pm25}],
          nowtime: getinfor.formatDateTime(res.data.server_time)

        })
      }
    })
  },
  //获取详细天气信息
  getmoreweather:function(){
    var that = this;
    const requestTask = wx.request({
      url: 'https://api.caiyunapp.com/v2/key/' + that.data.location + '/forecast.json', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
       //console.log(res.data.result)
       app.globalData.allweather = res.data.result;
        that.setData({
          allresult: res.data.result,
          times: getinfor.gettime(res.data.result.hourly.wind),
          winds: getinfor.getwinds(res.data.result.hourly.wind),
          dates: getinfor.getdatas(res.data.result.daily.skycon),
          weathers: getinfor.getweathers(res.data.result.daily.skycon),
        })
        that.settitlecolor(res.data.result.hourly.skycon["0"].value);
        //停止刷新
        wx.stopPullDownRefresh();
        wx.showToast({
          title: '天气更新成功',
          icon: 'none',
          duration: 1500
        })  
      }
    })
   
    
  },
  //下拉刷新函数
  onPullDownRefresh:function(){
    this.getmoreweather();
    this.getweather();
  }

})
