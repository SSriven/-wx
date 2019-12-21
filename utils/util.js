const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
export { formatTime }

export function wxToast(title,icon,duration){
  wx.showToast({
    title,
    icon,
    duration
  })
}

export const storage = {
  get(key){
    return wx.getStorageSync(key);
    // wx.getStorage({
    //   key,
    //   success: function(res) {
    //     if(callBack)
    //       callBack(res);
    //   },
    //   fail:function(err){
    //     if (callBack)
    //       callBack({data:null});
    //   }
    // })
  },
  set(key,data){
    wx.setStorage({
      key,
      data,
    })
  },
  clear(){
    wx.clearStorage();
  }
}
