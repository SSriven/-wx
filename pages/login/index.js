// pages/index/index.js
import request from '../../utils/http.js'
import { wxToast,storage } from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:'',
    psw:'',
    spinShow:false
  },

/**
 * 控制加载的显示与隐藏
 */
  spinControl:{
    /**
     * 显示加载
     */
    show(that) {
      that.setData({
        spinShow: true
      })
    },
    /**
     * 隐藏加载
     */
    hide(that) {
      that.setData({
        spinShow: false
      })
    },
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

/**
 * 登录
 */
  login(){
    let that = this;
    if(!that.loginObj.checkInput(that)){//输入不合法
      return false;
    }
    let data = {
      "acct": this.data.account,
      "pwd": this.data.psw
    }
    that.spinControl.show(that);//显示加载
    request.post("/checkUser/" + data.acct + "/" + data.pwd,data)
    .then((res)=>{
      console.log(res,"login_index.js","line:62");
      that.loginObj.resolve(res,that);
    })
    .catch(err=>{
      that.spinControl.hide(that);
      wxToast('登陆超时', "none", 1500);
    })
    
   
  },

  onblur(e){
    console.log(e);
    this.setData({
      account:e.detail.value
    })
  },
  oninput(e){
    this.setData({
      account: e.detail.value
    })
  },

  onPassBlur(e){
    console.log(e)
    this.setData({
      psw: e.detail.value
    })
  },
  onPassInput(e) {
    console.log(e)
    this.setData({
      psw: e.detail.value
    })
  },

  loginObj:{
    /**
     * 验证输入是否合法
     */
    checkInput:function(that){
      if (app.globalData.pat.test(that.data.account) || that.data.account == '') {
        wxToast('请输入合法账号',"none",1500);
        return false;
      }
      if (that.data.psw == '') {
        wxToast('密码不能为空', "none", 1500);
        return false;
      }
      return true;
    },
    /**
     * resolve
     */
    resolve(res,that){
      that.spinControl.hide(that);//隐藏加载
      if (res.data) {
        storage.set("userInfo",res.data);
        app.globalData.userInfo = res.data;
        wx.redirectTo({
          url: '../main/index',
        })
      } else {
        wxToast('账号或密码错误', "none", 1500);
      }
    }
  }
})