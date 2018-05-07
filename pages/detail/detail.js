// pages/detail/detail.js
const app = getApp();
var util =require('../../utils/util.js');
var getinfor = require('../../utils/weatherutils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //位置
 locating:'',
 //所有信息
 allinfor:'',
 //时间
  datetime:'',
  //风向
  windwhite:'',
  windblack:'',
  //生活指数等
  otherinfor:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      datetime: util.formatTime(new Date()),
      locating: app.globalData.location,
      allinfor: app.globalData.allweather,
      //location: data[0].longitude + ',' + data[0].latitude,
    })
    //console.log(this.data.allinfor) 
    this.getweater();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  getweater: function () {
    var that = this;
    //天气请求
    wx.request({
      url: 'https://api.jisuapi.com/weather/query', //仅为示例，并非真实的接口地址
      data: {
        appkey: 'appkey',
        location: app.globalData.wjd
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data.result)
        that.setData({
          otherinfor: res.data.result,
          windwhite: res.data.result.daily["0"].day.winddirect + ' ' + res.data.result.daily["0"].day.windpower,
          windblack: res.data.result.daily["0"].night.winddirect + ' ' + res.data.result.daily["0"].night.windpower
        })
        //停止刷新
        wx.stopPullDownRefresh();
        wx.showToast({
          title: '天气更新成功',
          icon: 'none',
          duration: 2000
        })  
      }
    })
  },
    //下拉刷新函数
  onPullDownRefresh: function () {
    this.getweater();
  }


})