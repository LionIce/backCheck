var that = "";    //在请求数据时setData使用
const network = require('../../utils/network.js')
import { $wuxToptips } from '../../components/wux'
import WxValidate from '../../assets/plugins/WxValidate'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    url: "",
    tempFilePathsZheng: '' ,
    tempFilePathsFan:'',
    zheng :true,
    fan : true,
  },
  a: function (e) {
    var urls= ""
    if (e.currentTarget.dataset.zheng == 1){
      urls = network.url+"zheng.png"
    }else{
      urls = network.url + "fan.png"
    }
    this.setData({ 
      flag: false ,
      url: urls
      })
  },
  b: function (e) {
    this.setData({ flag: true })
  },
  onLoad: function (option) {
    that = this;
    this.initValidate()
  },
  chooseimagezheng: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  

        _this.setData({
          tempFilePathsZheng: res.tempFilePaths,
          zheng:false,
        })
      }
    })
  } ,
  chooseimagefan: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  

        _this.setData({
          tempFilePathsFan: res.tempFilePaths,
          fan: false,
        })
      }
    })
  }, initData() {
    var param = new Object();
    network.request("account/least_recharge_money", param, function (res) {
      
    }, function () {

    })
  },
  submitForm(e) {
    const params = e.detail.value
    console.log(params)
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      this.showToptips(error)
      return false
    }

    var error = {}
    if (that.data.tempFilePathsZheng == "" || that.data.tempFilePathsZheng == null){
      error.msg= "请上传身份证正面照"
      this.showToptips(error)
      return 
    }
    if (that.data.tempFilePathsFan == "" || that.data.tempFilePathsFan == null){
      error.msg = "请上传身份证反面照"
      this.showToptips(error)
      return
    }
    wx.showLoading({
      title: "正在上传",
    })
    var FilePathsParam = {}
    FilePathsParam.certType = "1";//上传正面照
    network.uploadFile("profile/upload_image", that.data.tempFilePathsZheng[0], "imgFile", FilePathsParam, function (res) {
          console.log("开始上传反面",res)
          FilePathsParam.certType = "2";//上传反面照
          network.uploadFile("profile/upload_image", that.data.tempFilePathsFan[0], "imgFile", FilePathsParam, function (res) {
                  //提交认证信息
                  var param = {}
                  param.realName = params.name;
                  param.authType = "1";
                  param.idNo = params.idcard;
                  network.requestLoading("profile/save_auth_info", param, "", function (res) {
                          wx.navigateTo({
                            url: '../successcer/successcer',
                          })   
                          wx.hideToast();  //隐藏Toast
                  }, function () {

                  })
          }, function () {

          })
    }, function () {
      wx.showModal({
        title: '提示',
        content: '上传失败',
        showCancel: false
      })
    })
    
   
  }, 
  showToptips(error) {
    const hideToptips = $wuxToptips.show({
      timer: 3000,
      text: error.msg || '请填写正确的字段',
      success: () => console.log('toptips', error)
    })
  },
  initValidate() {
    this.WxValidate = new WxValidate({
      name: {
        required: true,
      },
      idcard: {
        required: true,
        idcard: true,
      },
    }, {
        idcard: {
          required: '请输入身份证号',
        },
        name: {
          required: "请输入您的姓名",
        }
      })
  }
})

