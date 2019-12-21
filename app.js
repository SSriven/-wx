//app.js
import { storage } from "utils/util.js"
import request from 'utils/http.js'
const screen = wx.getSystemInfoSync();

App({
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: null,
    windowW: screen.screenWidth,
    windowH: screen.windowHeight,
    pat: new RegExp("[^a-zA-Z0-9\_\u4e00-\u9fa5]", "i"),
  }
})