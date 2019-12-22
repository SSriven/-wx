// pages/checkUser/index.js
import {storage} from '../../utils/util.js'
import { printLog } from "../../utils/util.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spinShow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let res = storage.get("userInfo");
    printLog(res,"checkUser_index.js","line:19");
    if(res){
      app.globalData.userInfo = res;
      wx.redirectTo({
        url: '../main/index',
      })
    }else{
      wx.redirectTo({
        url: '../login/index',
      })
    }
  },



  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      spinShow:false
    })
  },
})