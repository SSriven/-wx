//index.js
//获取应用实例
const app = getApp()
import {storage} from "../../utils/util.js"
Page({
  data: {
    current: 'checkpage',
    windowH:app.globalData.windowH,
    windowW:app.globalData.windowW,
    
  },
  handleChange({ detail }) {
    switch(detail.key){
      case 'checkpage':
        this.check_page.reload();break;
      case 'examinepage':
        this.examine_page.reload(); break;
    }
    this.setData({
      current: detail.key
    });
  },
  onLoad: function () {
    let userInfo = storage.get("userInfo");
    let userType = userInfo.pid[0];
    this.setData({
      userType
    })
  },
  onReady:function(){
    this.check_page = this.selectComponent("#check_page");
    this.examine_page = this.selectComponent("#examine_page");
  }
  
})
