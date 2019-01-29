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
    tempFilePathsZheng: '',
    tempFilePathsFan: '',
    zheng: true,
    fan: true,
    certification : "0",
  },
  a: function (e) {
    this.setData({
      flag: false
    })
  },
  b: function (e) {
    this.setData({ flag: true })
  },
  onLoad: function (option) {
    that = this;
    this.initValidate("0")
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
          zheng: false,
        })
      }
    })
  },
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
    if (that.data.tempFilePathsZheng == "" || that.data.tempFilePathsZheng == null) {
      error.msg = "请上传营业执照"
      this.showToptips(error)
      return
    }
    wx.showLoading({
      title: "正在上传",
    })
    if (that.data.certification = "0"){
      var FilePathsParam = {}
      FilePathsParam.certType = "3";//上传正面照
      network.uploadFile("profile/upload_image", that.data.tempFilePathsZheng[0], "imgFile", FilePathsParam, function (res) {
        params.authType = "2";
        params.orgAuthWay = "2";
        network.requestLoading("profile/save_auth_info", params, "", function (res) {
          wx.navigateTo({
            url: '../successcer/successcer',
          })
          wx.hideToast();  //隐藏Toast
        }, function () {

        })
      }, function () {
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      })
    } else if (that.data.certification = "1"){
      var FilePathsParam = {}
      FilePathsParam.certType = "3";//上传正面照
      network.uploadFile("profile/upload_image", that.data.tempFilePathsZheng[0], "imgFile", FilePathsParam, function (res) {
        params.authType = "2";
        params.orgAuthWay = "1";
        network.requestLoading("profile/save_auth_info", params, "", function (res) {
          wx.navigateTo({
            url: '../successcer/successcer',
          })
          wx.hideToast();  //隐藏Toast
        }, function () {

        })
      }, function () {
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      })
    } else if (that.data.certification = "2") {
      var FilePathsParam = {}
      FilePathsParam.certType = "3";//上传正面照
      network.uploadFile("profile/upload_image", that.data.tempFilePathsZheng[0], "imgFile", FilePathsParam, function (res) {
        params.authType = "2";
        params.orgAuthWay = "3";
        network.requestLoading("profile/save_auth_info", params, "", function (res) {
          wx.navigateTo({
            url: '../successcer/successcer',
          })
          wx.hideToast();  //隐藏Toast
        }, function () {

        })
      }, function () {
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      })
    }
  
  },
  certification:(e)=>{
    that.initValidate(e.currentTarget.dataset.id)
    that.setData({
      certification : e.currentTarget.dataset.id
    })
  },
  showToptips(error) {
    const hideToptips = $wuxToptips.show({
      timer: 3000,
      text: error.msg || '请填写正确的字段',
      success: () => console.log('toptips', error)
    })
  },
  initValidate(e) {
    if (e == "0"){
      this.WxValidate = new WxValidate({
        orgName: {
          required: true,
        },
        orgCode: {
          required: true,
        },
        orgBusiLic: {
          required: true,
        },
        orgLinkman: {
          required: true,
        },
        orgBusiAddr: {
          required: true,
        },

      }, {
          orgName: {
            required: '请填写企业名称',
          },
          orgLinkman: {
            required: '请填写您的企业联系人姓名',
          },
          orgBusiAddr: {
            required: '请填写企业地址',
          },
          orgBusiLic: {
            required: '请填写营业执照注册号',
          },
          orgCode: {
            required: '请填写组织机构代码',
          },
        })
    }else if(e == "1"){
      this.WxValidate = new WxValidate({
        orgName: {
          required: true,
        },
        socialCreditCode: {
          required: true,
        },
        orgLinkman: {
          required: true,
        },
        orgBusiAddr: {
          required: true,
        },

      }, {
          orgName: {
            required: '请填写企业名称',
          },
          orgLinkman: {
            required: '请填写您的企业联系人姓名',
          },
          orgBusiAddr: {
            required: '请填写企业地址',
          },
          socialCreditCode: {
            required: '请填写企业信用代码',
          },
        })
    }else if(e == "2"){
      this.WxValidate = new WxValidate({
        orgName: {
          required: true,
        },
        orgCode: {
          required: true,
        },
        orgBusiLic: {
          required: true,
        },
        orgLinkman: {
          required: true,
        },
        orgBusiAddr: {
          required: true,
        },

      }, {
          orgName: {
            required: '请填写企业名称',
          },
          orgLinkman: {
            required: '请填写您的企业联系人姓名',
          },
          orgBusiAddr: {
            required: '请填写企业地址',
          },
          orgBusiLic: {
            required: '请填写营业执照注册号',
          },
          orgCode: {
            required: '请填写组织机构代码',
          },
        })
    }
    
  }
})

