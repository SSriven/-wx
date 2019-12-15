// components/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    headerTitle:String,
    headerAddr:String,
    headerEnterprise:String,
    headerCheckNum:String,
    headerCheckedNum:String,
    headerFlag:String,
    headerSearch:Boolean,
    headerRightBottom:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    showRight2:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _toggleRight() {
      this.triggerEvent("toggleRight")
    }
  }
})
