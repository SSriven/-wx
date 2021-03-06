class Request{
  constructor(parms){
    this.withBaseURL = parms.withBaseURL;
    this.baseURL = parms.baseURL;
    this.requestTask = null;
  }
  get(url,data){
    return this.request("GET",url,data);
  }

  post(url, data) {
    return this.request("POST", url, data);
  }

  put(url, data) {
    return this.request("PUT", url, data);
  }

  request(method,url,data){
    const vm = this;
    return new Promise((resolve,reject) => {
      vm.requestTask = wx.request({
        url: vm.withBaseURL ? vm.baseURL + url : url,
        data,
        method,
        success(res){
          resolve(res);
        },
        fail(err){
          reject({
            msg: '请求失败',
            url: vm.withBaseURL ? vm.baseURL + url : url,
            method,
            data
          });
        }
      })
    })
  }

  abort() {
    if (this.requestTask) {
      this.requestTask.abort();
    }
  }
}

const request = new Request({
  baseURL: 'http://123.207.70.177:6060/mini',
  withBaseURL: true
});

module.exports = request;