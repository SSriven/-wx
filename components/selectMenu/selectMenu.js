// components/selectMenu/selectMenu.js
import request from '../../utils/http.js'
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showRight:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    windowH: app.globalData.windowH,
    windowW: app.globalData.windowW,
    name: 'name1',
    name1: 'name11',
    current:'tab1'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadTreeMenu(){
      request.post("/getTree/"+app.globalData.userInfo.pid,{})
      .then(res=>{
        console.log(res);
        let obj1 = {}
        var cssbArr = res.data.reduce((cur, next) => {
          obj1[next.cssbname] ? "" : obj1[next.cssbname] = true && cur.push(next);
          return cur;
        }, [])
        console.log(cssbArr)
        let obj2 = {};
        var townArr = res.data.reduce((cur, next) => {
          obj2[next.townname] ? "" : obj2[next.townname] = true && cur.push(next);
          return cur;
        }, [])
        console.log(townname)
      })
    },
    _toggleTreeMenu(){
      this.triggerEvent("toggleTreeMenu")
    },
    _handleChange({ detail }) {
      this.setData({
        current: detail.key
      });
    },
    _confirm(){
      this.triggerEvent("toggleTreeMenu")
    }
  }
})
