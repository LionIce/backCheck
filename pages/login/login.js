
const network = require('../../utils/network.js')
import { $wuxToptips } from '../../components/wux'
import WxValidate from '../../assets/plugins/WxValidate'
var that = ""
Page({
  data: {
    tel: '',
    password: '',
  },
  onLoad(){
    this.initValidate();
    that = this;
  }, 
  quickLogin(e){
      wx.navigateTo({
        url: '../quicklogin/quicklogin',
      })
  },
  register:()=>{　
    wx.navigateTo({
      url: '../register/register',
    })
  },
  forgetpwd: () => {
    wx.navigateTo({
      url: '../forgetpwd/forgetpwd',
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
    var param = new Object();
    param.acctNo = params.tel
    param.loginPass = params.password
    param.loginType = "N"
    network.requestLoading("passport/login", param, "正在登录",function (res) {
      wx.setStorage({
        key: "token",
        data: res.token
      })
      wx.switchTab({
        url: '../my/my',
        success: () => {    
          var page = getCurrentPages().pop();
          console.log("page",page)
          if (page == undefined || page == null) return;
          page.onLoad();
        } 
      })
    }, function (error) {
      that.showToptips(error)
    })
  }, showToptips(error) {
      const hideToptips = $wuxToptips.show({
      timer: 3000,
      text: error.msg || '请填写正确的字段',
      success: () => console.log('toptips', error)
    })

    // setTimeout(hideToptips, 1500)
  },
  initValidate() {
    this.WxValidate = new WxValidate({
      tel: {
        required: true,
        tel: true,
      }, 
      password:{
        required: true,
        password: true, 
      }
    }, {
        tel: {
          required: '请输入手机号',
          tel: '请输入正确的手机号',
        },
        password: {
          required: '请输入登录密码',
        }
      })
    this.WxValidate.addMethod('password', (value, param) => {
      return this.WxValidate.optional(value) || value.length >= 6
    }, '请输入大于6位数以上的密码')
  }
})
