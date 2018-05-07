# 万福天气小程序
本项目为天气类小程序，可以实现基于当前位置的天气预报，未来两小时的天气预警，数据来源彩云天气，极速数据。
### 技术关键：
   *    使用腾讯地图API实现逆地址解析
   *	使用多种数据来源对数据实现混合排序加载
   *	通过不同的天气状态显示不同的天气图片
## 项目截图：
### 登录界面
![界面](https://github.com/best-fan/wechat-app-weather/blob/master/sree/Screenshot_2018-05-07-20-24-29-732_com.tencent.mm.png)
### 主界面
![主界面](https://github.com/best-fan/wechat-app-weather/blob/master/sree/Screenshot_2018-05-07-20-24-38-901_com.tencent.mm.png)
### 用户管理
![用户管理](https://github.com/best-fan/wechat-app-weather/blob/master/sree/Screenshot_2018-05-07-20-24-53-882_com.tencent.mm.png)

## 扫码体验：
搜索 万福天气
## 使用说明：

替换pages文件夹index.js中网络请求中key的值(向彩云天气申请)
替换pages文件夹detail.js中网络请求中key的值(向极速数据全国天气申请)
替换utils文件夹config.js中网络请求中key的值(向腾讯地图申请key)     
设置小程序合法服务器域名
