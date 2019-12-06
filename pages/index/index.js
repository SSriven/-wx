//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    current: 'homepage',
    windowH:app.globalData.windowH,
    windowW:app.globalData.windowW,
    
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  onLoad: function () {
    
  },
  
})
