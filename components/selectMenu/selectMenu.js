// components/selectMenu/selectMenu.js
import request from '../../utils/http.js'
import {
  printLog
} from '../../utils/util.js'
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showRight: {
      type: Boolean,
      value: false
    },
    subtp: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    windowH: app.globalData.windowH,
    windowW: app.globalData.windowW,
    current: 'select',
    curSubtpClass: [],
    curSubtp: null,
    subLevel: ['低隐患', '一般隐患', '较大隐患', '严重隐患'],
    curLevelClass: ['', '', '', ''],
    curLevel: null,
    spinShow: true
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {},
    ready: function() {},
    moved: function() {},
    detached: function() {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 加载树形菜单
     */
    loadTreeMenu() {
      this.getScrtp();
      this.getEnterprise();
      this.spinShow();
    },

    /**
     * 获取隐患类别
     */
    getScrtp() {
      let that = this;
      request.post("/selectScrtp", {})
        .then(res => {
          that.setData({
            scrtp: res.data
          })
        })
    },
    /**
     * 显示加载
     */
    spinShow() {
      this.setData({
        spinShow: true
      })
    },
    /**
     * 隐藏加载
     */
    spinHide() {
      this.setData({
        spinShow: false
      })
    },
    /**
     * 获取所有企业
     */
    getEnterprise() {
      let that = this;
      request.post("/getTree/" + app.globalData.userInfo.pid, {})
        .then(res => {
          console.log(res);
          that.getEnterpriseTree(res.data);
          that.spinHide();
        })
    },
    /**
     * 将获取到的企业数组转换为树形菜单
     */
    getEnterpriseTree(data) {
      let treeArr = [];
      /**
       * 获取所有县
       */
      let cssbArr = this.getArr(data, "cssbname");
      /**
       * 获取所有区
       */
      let townArr = this.getArr(data, "townname");
      /**
       * 获取所有社区
       */
      let zoneArr = this.getArr(data, "zonename");
      /**
       * 获取所有企业
       */
      let enmArr = this.getArr(data, "enm");

      let index1 = 0;
      cssbArr.forEach(cssbItem => {
        treeArr.push({
          label: cssbItem,
          children: []
        });

        let index2 = 0;
        townArr.forEach(townItem => {
          if (cssbItem.cssbname != townItem.cssbname)
            return false;
          treeArr[index1].children.push({
            label: townItem,
            children: []
          })

          let index3 = 0;
          zoneArr.forEach(zoneItem => {
            if (zoneItem.townname != townItem.townname)
              return false;
            treeArr[index1].children[index2].children.push({
              label: zoneItem,
              children: []
            })

            let index4 = 0;
            enmArr.forEach(enmItem => {
              if (enmItem.zonename != zoneItem.zonename)
                return false;
              treeArr[index1].children[index2].children[index3]
                .children.push({
                  label: enmItem,
                  children: []
                })
              index4++;
            })
            index3++;
          })
          index2++;
        })
        index1++;
      })
      console.log(treeArr);
      this.setData({
        treeArr
      })
    },
    /**
     * 点击某个企业的某项类型的隐患(例如点击某企业的职业健康类型)
     */
    selectScrtp(e) {
      console.log(e);
      let eid = e.target.dataset.eid;
      let prjid = e.target.dataset.prjid;
      let obj = {
        eid, prjid
      }
      this.triggerEvent("selectScrtp",obj);
    },
    /**
     * 关闭筛选面板
     */
    _toggleTreeMenu() {
      this.triggerEvent("toggleTreeMenu")
    },
    /**
     * 切换选项卡
     */
    _handleChange({
      detail
    }) {
      this.setData({
        current: detail.key
      });
    },
    /**
     * 确认
     */
    _confirm() {
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
    reset() {
      let curSubtpClass = this.data.curSubtpClass;
      let curLevelClass = this.data.curLevelClass;
      curSubtpClass = [];
      curLevelClass = [];
      this.setData({
        curSubtpClass,
        curLevelClass,
        curSubtp: null,
        curLevel: null
      })
    },
    /**
     * 选择隐患类型
     */
    selectSubtp(e) {
      let index = e.currentTarget.dataset.index;
      let curSubtp = e.currentTarget.dataset.value;
      let curSubtpClass = this.data.curSubtpClass;
      let subtpArr = Object.values(this.data.subtp);
      subtpArr.forEach((item, i) => {
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
    selectLevel(e) {
      let index = e.currentTarget.dataset.index;
      let curLevel = e.currentTarget.dataset.value;
      let curLevelClass = this.data.curLevelClass;
      curLevelClass.forEach((item, i) => {
        curLevelClass[i] = '';
      })
      curLevelClass[index] = 'curSubtpClass';
      this.setData({
        curLevelClass,
        curLevel
      })
    },

    getArr(data, key) {
      let obj1 = {}
      return data.reduce((cur, next) => {
        obj1[next[key]] ? "" : obj1[next[key]] = true && cur.push(next);
        return cur;
      }, [])
    }
  }
})