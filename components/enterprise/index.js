// components/enterprise/index.js
import request from '../../utils/http.js'
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
    windowH: app.globalData.windowH,
    windowW: app.globalData.windowW,
    
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {

      let that = this;
      that.setData({
        spinShow:true
      })
      request.post("/getTree/" + app.globalData.userInfo.pid, {})
        .then(res => {
          that.setData({
            enterpriseArr:res.data,
            spinShow:false
          })
        })
      
      // wx.request({
      //   url: "http://localhost:8080/sftschl/Enterprise/getEnterpriseByEid?_dc=1577359994867&eid=E754AB08C37E84948848BFA6850EA27D1&page=1&start=0&limit=25",
      //   method:"GET",
      //   success(res) {
      //     console.log(res);
      //   },
      //   fail(err){
      //     console.log(err)
      //   }
      // })
    },
    ready: function () {
      this.treeMenu_check = this.selectComponent("#treeMenu_check");
      // this.treeMenu_check.loadTreeMenu();
    },
    moved: function () { },
    detached: function () { },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
