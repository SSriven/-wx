// components/aboutMe/index.js
import {storage} from '../../utils/util.js'
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    acct:'',
    name:'',
    userType:''
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      let userInfo = app.globalData.userInfo;
      let acct = userInfo.acct;
      let name = userInfo.name;
      let userType = userInfo.pid[0] === "T" ? "排查员" : "审核员";
      this.setData({
        acct,name,userType
      })
    },
    ready: function () {
    },
    moved: function () { },
    detached: function () { },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeUser(){
      storage.clear();
      wx.redirectTo({
        url: '../../pages/index/index',
      })
    }
  }
})
