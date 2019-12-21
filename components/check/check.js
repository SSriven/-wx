// components/check/check.js
import check_A_1_data from '../../data/check_A_1.js'
import request from '../../utils/http.js'
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
    showRight:false,
    name:'name1',
    name1:'name11',
    checkDataArr:[],
    checkedNum:0,
    headerTitle:'职业健康',
    headerSearch:false,
    headerRightBottom:false,
    spinShow:true
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { 
      let that = this;
      request.post("/selectScrthrtByStid/255C86119272439dBD06D259A9E3D209E98FEDA21489A4564851B8F6407C4EB63",{})
      .then(res=>{
        console.log(res.data);
        that.setData({
          checkDataArr: res.data,
          checkedNum: res.data.filter(item => item.flag == '1').length,
          spinShow:false
        })
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

/**
 * 排查
 */
    onCheck(e){
      let index = e.target.dataset.index;
      let flag = e.target.dataset.flag;
      if(flag == '2'){
        wx.showToast({
          title: '该项目正在整改中,不能取消排查!',
          icon:'none'
        })
        return;
      }
      let arr = this.data.checkDataArr;
      var that = this;
      if (arr[index].flag == '1' || arr[index].flag == '3'){
        
        wx.showModal({
          title: '取消排查',
          content: '是否确认取消排查?',
          success(res) {
            if (res.confirm) {
              arr[index].flag = '0';
              that.setData({
                checkDataArr: arr,
                checkedNum: arr.filter(item => item.flag == '1').length
              })
            }
           
          }
        })
      }else{
        arr[index].flag = '1';
        this.setData({
          checkDataArr: arr,
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

