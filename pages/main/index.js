//index.js
//获取应用实例
const app = getApp()
import {storage} from "../../utils/util.js"
import {printLog} from "../../utils/util.js"
Page({
  data: {
    current: '',
    windowH:app.globalData.windowH,
    windowW:app.globalData.windowW,
    
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  onLoad: function () {
    let userInfo = storage.get("userInfo");
    printLog("2113=>main_index.js line:26");
    let userType = userInfo.pid[0];
    this.setData({
      userType
    })
  },
  onReady:function(){
    this.check_page = this.selectComponent("#check_page");
    this.examine_page = this.selectComponent("#examine_page");
    switch (this.data.userType) {
      case 'T': this.setData({ current: 'checkpage' });this.check_page.reload();  break;
    }
  },
  onPullDownRefresh:function(){
    switch (this.data.current) {
      case 'checkpage': this.check_page.reload(); wx.stopPullDownRefresh();break;
    }
  }
  
})
