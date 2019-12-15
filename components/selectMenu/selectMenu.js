// components/selectMenu/selectMenu.js
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
    _toggleRight(){
      this.triggerEvent("toggleRight")
    },
    _handleChange({ detail }) {
      this.setData({
        current: detail.key
      });
    },
    _confirm(){
      this.triggerEvent("toggleRight")
    }
  }
})
