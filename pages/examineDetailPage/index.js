// pages/checkDetailPage/index.js
import examineData from '../../data/examine_A_1.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [
      "https://i.loli.net/2017/08/21/599a521472424.jpg",
      "https://pic.ibaotu.com/01/17/78/46Y888piCJxz.jpg-1.jpg!ww700",
      "https://pic.ibaotu.com/01/14/58/62e888piChSp.jpg-0.jpg!ww700",
      "https://pic.ibaotu.com/01/10/04/09Y888piCqs7.jpg-0.jpg!ww700",
      "https://pic.ibaotu.com/01/26/34/147888piCMZt.jpg-0.jpg!ww700"
    ],
    currentImgIndex: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      item: examineData.data.filter(item => item.scid == options.scid)[0]
    })
  },

  //预览图片，放大预览
  preview(event) {
    if (this.endTime - this.startTime >= 300) {
      return;
    }
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.imgs // 需要预览的图片http链接列表
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