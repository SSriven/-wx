// components/rectification/index.js
import examineData from '../../data/examine_A_1.js'
import {wxToast} from "../../utils/util.js"
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
    addr: '江西省南昌市新建县 中心镇-社区A',
    enterprise: '企业A',
    windowH: app.globalData.windowH,
    windowW: app.globalData.windowW,
    showRight: false,
    examineNum: 0,
    headerTitle: '隐患整改',
    headerSearch: false,
    headerRightBottom: false,
    visible1: false,
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      console.log("组件初始化");
      this.setData({
        examineDataArr: examineData.data,
        examineNum: examineData.data.filter(item => item.stat == '2').length
      })
      // console.log(check_A_1_data.check_A_1);
      this.rejectDialog = this.selectComponent("#rejectDialog");
    },
    moved: function () { },
    detached: function () { },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reload() {
      console.log("examine reload");
    },
    /**
     * 打开筛选菜单栏
     */
    toggleRight() {
      this.setData({
        showRight: !this.data.showRight
      })
    },
    seeDetail(e) {
      let scid = e.currentTarget.dataset.scid;
      // console.log(eid,e);
      wx.navigateTo({
        url: '../../pages/examineDetailPage/index?scid=' + scid,
      })
    },
    reject(e) {
      let stat = e.target.dataset.stat;
      let index = e.target.dataset.index;
      let that = this;
      if (stat == '2') {
        wxToast('隐患整改中，无法驳回','none',1500);
        return;
      }
      this.rejectDialog.showDialog();
      this.currentIndex = index;
    },

    //取消事件
    onCancelReject() {
      this.rejectDialog.hideDialog();
    },
    //确认事件
    onCertainReject() {
      let that = this;
      let value = this.rejectDialog.data.value;
      console.log(value)
      if (app.globalData.pat.test(value) || value == null) {
        wxToast('输入非法', 'none', 1500);
        return false;
      }
      this.rejectDialog.hideDialog();
      let arr = this.data.examineDataArr;
      arr.splice(this.currentIndex, 1);
      this.setData({
        examineDataArr: arr,
        examineNum: examineData.data.filter(item => item.stat == '2').length
      })
      wxToast('驳回成功', 'none', 1500);
    },
    onExamine(e) {
      let index = e.target.dataset.index;
      let arr = this.data.examineDataArr;
      var that = this;
      if (arr[index].stat == '2') {

        wx.showModal({
          title: '取消整改',
          content: '是否确认取消整改?',
          success(res) {
            if (res.confirm) {
              arr[index].stat = '1';
            } else if (res.cancel) {
              arr[index].stat = '2';
            }
            that.setData({
              examineDataArr: arr,
              examineNum: arr.filter(item => item.stat == '2').length
            })
          }
        })
      } else {
        arr[index].stat = '2';
        this.setData({
          examineDataArr: arr,
          examineNum: arr.filter(item => item.stat == '2').length
        })
      }
    }
  }
})
