// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:'',
    psw:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  login(){
    if (app.globalData.pat.test(this.data.account) || this.data.account == '') {
      wx.showToast({
        title: '请输入合法账号',
        icon: "none"
      })
      return false;
    }
    if (this.data.psw == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: "none"
      })
      return false;
    }
    wx.redirectTo({
      url: '../main/index',
    })
  },

  onblur(e){
    console.log(e);
    this.setData({
      account:e.detail.value
    })
  },

  onPassBlur(e){
    console.log(e)
    this.setData({
      psw: e.detail.value
    })
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})