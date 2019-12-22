// components/check/check.js
import check_A_1_data from '../../data/check_A_1.js'
import request from '../../utils/http.js'
import {printLog} from "../../utils/util.js"
import {wxToast} from "../../utils/util.js"
const app = getApp();
/**
 * 上传图片
 */
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
    showRight:false,//控制右侧筛选的菜单显示与隐藏
    checkDataArr:[],//隐患排查项目
    seleceDataArr:[],
    checkedNum:0,//已排查的数量
    headerTitle:'职业健康',
    headerSearch:false,//显示筛选
    headerRightBottom:false,//显示已排查
    spinShow:true,//显示加载
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { 
      let that = this;
      request.post("/selectScrthrtByStid/255C86119272439dBD06D259A9E3D209E98FEDA21489A4564851B8F6407C4EB63",{})
      .then(res=>{
        printLog(res.data,"components check_check.js","line:42");
        that.setData({
          checkDataArr: res.data,
          seleceDataArr:res.data,
          checkedNum: res.data.filter(item => item.flag == '1' || item.flag == '2').length,
          spinShow:false
        })
        that.getSubtype(res.data);
        // printLog(subtpArr, "components check_check.js", "line:56");
        // printLog(obj1, "components check_check.js", "line:57");
      })
      // this.setData({
      //   checkDataArr:check_A_1_data.check_A_1,
      //   checkedNum:check_A_1_data.check_A_1.filter(item => item.flag == '1').length
      // })
      // console.log(check_A_1_data.check_A_1);
    },
    ready:function(){
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

    reload(){
      console.log("check reload");
    },
    /**
     * 打开筛选菜单栏
     */
    toggleTreeMenu(){
        this.setData({
          showRight:!this.data.showRight
        })
    },
    selectConfirm(e){
      this.setData({
        spinShow:true
      })
      let seleceDataArr;
      let {curSubtp, curLevel} = e.detail;
      console.log(curSubtp, curLevel);
      if (!curSubtp && !curLevel){
        seleceDataArr = this.data.checkDataArr;
      }else{
        seleceDataArr = this.data.checkDataArr.filter(item => item.subtp === curSubtp || item.level === curLevel);
      }
      console.log(seleceDataArr)
      this.setData({
        seleceDataArr,
        checkedNum: seleceDataArr.filter(item => item.flag == '1' || item.flag == '2').length,
        spinShow: false
      })
      this.toggleTreeMenu();
    },

    getSubtype(arr){
      let obj1 = {}
      
      let subtpArr = arr.reduce((cur, next) => {
        obj1[next.subtp] ? "" : obj1[next.subtp] = 1 && cur.push(next);
        return cur;
      }, [])
      
      obj1 = {};
      let i = 0;
      subtpArr.forEach(item => {
        obj1[i++] = item.subtp;
      })
      console.log(obj1)
      this.setData({
        subtp:obj1
      })
    },

/**
 * 排查
 */
    onCheck(e){
      let index = e.target.dataset.index;
      let flag = e.target.dataset.flag;
      if(flag == '2'){
        wxToast("该项目正在整改中,不能取消排查!","none",1500);
        return;
      }
      let arr = this.data.seleceDataArr;
      var that = this;
      if (arr[index].flag == '1' || arr[index].flag == '3'){
        
        wx.showModal({
          title: '取消排查',
          content: '是否确认取消排查?',
          success(res) {
            if (res.confirm) {
              arr[index].flag = '0';
              that.setData({
                seleceDataArr: arr,
                checkedNum: arr.filter(item => item.flag == '1').length
              })
            }
          }
        })
      }else{
        arr[index].flag = '1';
        this.setData({
          seleceDataArr: arr,
          checkedNum: arr.filter(item => item.flag == '1').length
        })
      }
    },

    seeDetail(e){
      let sid = e.currentTarget.dataset.sid;
      // console.log(eid,e);
      wx.navigateTo({
        url: '../../pages/checkDetailPage/index?sid='+sid,
      })
    },
    /**
     * 上传照片
     */
    uploadImg(){
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths)
        }
      })
    }
  }
})

