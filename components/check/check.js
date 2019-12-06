// components/check/check.js
import check_A_1_data from '../../data/check_A_1.js'
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
    addr:'江西省南昌市新建县 中心镇-社区A',
    enterprise:'企业A',
    windowH:app.globalData.windowH,
    windowW:app.globalData.windowW,
    showRight:false,
    name:'name1',
    name1:'name11',
    checkDataArr:[],
    checkedNum:0
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { 
      console.log("组件初始化");
      this.setData({
        checkDataArr:check_A_1_data.check_A_1,
        checkedNum:check_A_1_data.check_A_1.filter(item => item.flag == '1').length
      })
      console.log(check_A_1_data.check_A_1);
    },
    moved: function () { },
    detached: function () { },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 打开筛选菜单栏
     */
    toggleRight(){
        this.setData({
          showRight:!this.data.showRight
        })
    }
  }
})
