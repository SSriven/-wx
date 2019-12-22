// components/selectMenu/selectMenu.js
import request from '../../utils/http.js'
import {printLog} from '../../utils/util.js'
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showRight:{
      type:Boolean,
      value:false
    },
    subtp:{
      type:Object,
      value:{}
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
    current:'tab1',
    curSubtpClass:[],
    curSubtp:null,
    subLevel: ['低隐患','一般隐患','较大隐患','严重隐患'],
    curLevelClass:['','','',''],
    curLevel:null
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      let that = this;
      
      // request.post("/selectScrtp/", {})
      //   .then(res => {
      //     printLog(res.data, "components components_selectMenu.js", "line:32");
      //     that.setData({
            
      //     })
      //   })
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
    /**
     * 加载树形菜单
     */
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
    /**
     * 确认
     */
    _confirm(){
      let curSubtp = this.data.curSubtp;
      let curLevel = this.data.curLevel;
      let selectObj = {
        curSubtp,
        curLevel
      }
      this.triggerEvent("selectConfirm", selectObj);
      
    },
    /**
     * 重置
     */
    reset(){
      let curSubtpClass = this.data.curSubtpClass;
      let curLevelClass = this.data.curLevelClass;
      curSubtpClass = [];
      curLevelClass = [];
      this.setData({
        curSubtpClass,
        curLevelClass,
        curSubtp:null,
        curLevel:null
      })
    },
    /**
     * 选择隐患类型
     */
    selectSubtp(e){
      let index = e.currentTarget.dataset.index;
      let curSubtp = e.currentTarget.dataset.value;
      let curSubtpClass = this.data.curSubtpClass;
      let subtpArr = Object.values(this.data.subtp);
      subtpArr.forEach((item,i)=>{
        curSubtpClass[i] = '';
      })
      curSubtpClass[index] = 'curSubtpClass';
      this.setData({
        curSubtpClass,
        curSubtp
      })
    },
    /**
     * 选择隐患等级
     */
    selectLevel(e){
      let index = e.currentTarget.dataset.index;
      let curLevel = e.currentTarget.dataset.value;
      let curLevelClass = this.data.curLevelClass;
      curLevelClass.forEach((item,i)=>{
        curLevelClass[i] = '';
      })
      curLevelClass[index] = 'curSubtpClass';
      this.setData({
        curLevelClass,
        curLevel
      })
    }
  }
})
