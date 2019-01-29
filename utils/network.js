var API_URL = 'https://m.zmbeidiao.com/'  

//不显示对话框的请求
function request(url, params, success, fail) {
  this.requestLoading(url, params, null, success, fail)
}
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
function requestLoading(url, params, message, success, fail) {
  wx.showNavigationBarLoading()
 
  if (message == "") {
    wx.showLoading({
      title: "加载中",
    })
  } else if (message == null){
   
  }else{
    wx.showLoading({
      title: message,
    })
  }
  //判断是否已近登录
  var token = "";
  try {
     token = wx.getStorageSync('token')
  } catch (e) {

  }
  console.log("url:", API_URL + url);
  params.terType = '4'
  params.chnlId = '2'
  params.token = token
  wx.request({
    url: API_URL + url,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
    success: function (res) {
      console.log(res.statusCode)
      console.log(res.header)
      wx.hideNavigationBarLoading()
      if (message != null) {
        wx.hideLoading()
      }
      if (res.data.code == 200) {
        console.log(res.data.data)
        success(res.data.data)
      } else if (res.data.code == 500) {
        wx.showToast({
          image: "../../assets/images/jg_hud_error_3x.png",
          title: res.data.errorMsg != null ? res.data.errorMsg : "服务器异常，请稍后！",
          success: () => console.log(res.data.errorMsg != null ? res.data.errorMsg : "服务器异常，请稍后！")
        })
        res.data.msg = res.data.errorMsg
        fail(res.data);
      } else if (res.data.code == 401){
        wx.redirectTo({
          url: '../login/login'
        })
      } else if (res.data.code == 400){
        wx.showToast({
          image: "../../assets/images/jg_hud_error_3x.png",
          title: "请求参数有误！",
          success: () => console.log('请求参数有误！')
        })
      }
  
    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != null) {
        wx.hideLoading()
      } 
      wx.showToast({
        icon: "forbidden",
        title: '加载数据失败',
      })
      fail()
    },
    complete: function (res) {

    },
  })
}
//上传文件
function uploadFile(url, filePath, name, formData, success, fail) {
  console.log(API_URL + url)
  //判断是否已近登录
  var token = "";
  try {
    token = wx.getStorageSync('token')
  } catch (e) {

  }
  formData.token = token
  formData.terType = '4'
  formData.chnlId = '2'
  wx.uploadFile({
    url: API_URL + url,
    filePath: filePath,
    name: name,
    header: {
      'content-type': 'multipart/form-data',
      'SHTC-TOKEN': token
    }, // 设置请求的 header
    formData: formData, // HTTP 请求中其他额外的 form data
    success: function (res) {
      var response = JSON.parse(res.data)
     
      if (response.code == 200) {
        console.log(response.data)
        success(response.data)
      } else if (response.code == 500) {
        wx.showToast({
          image: "../../assets/images/jg_hud_error_3x.png",
          title: response.errorMsg != null ? response.errorMsg : "服务器异常，请稍后！",
          success: () => console.log(response.errorMsg != null ? response.errorMsg : "服务器异常，请稍后！")
        })
        response.msg = response.errorMsg
        fail(response.data);
      } else if (response.code == 401) {
        wx.showToast({
          image: "../../assets/images/jg_hud_error_3x.png",
          title: "会话超时",
          success: () => console.log('会话超时')
        })
        wx.redirectTo({
          url: '../login/login'
        })
      } else if (response.code == 400) {
        wx.showToast({
          image: "../../assets/images/jg_hud_error_3x.png",
          title: "请求参数有误！",
          success: () => console.log('请求参数有误！')
        })
      }



      // if (res.statusCode == 200 && !res.data.result_code) {
      //   typeof success == "function" && success(res.data);
      // } else {
      //   typeof fail == "function" && fail(res);
      // }
      // if (res.statusCode != 200) {
      //   wx.showModal({
      //     title: '提示',
      //     content: '上传失败',
      //     showCancel: false
      //   })
      //   return;
      // }
    },
    fail: function (res) {
      console.log(res);
      typeof fail == "function" && fail(res);
    },
    complete: function () {
     
    }
  })
}

module.exports = {
  uploadFile: uploadFile,
  request: request,
  url: "https://m.zmbeidiao.com/img/wxapplet/",
  requestLoading: requestLoading
}

