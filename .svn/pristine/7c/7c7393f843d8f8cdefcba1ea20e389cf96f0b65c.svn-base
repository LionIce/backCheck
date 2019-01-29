
const network = require('../../utils/network.js')
import { $wuxToptips } from '../../components/wux'
import WxValidate from '../../assets/plugins/WxValidate'
import { $wuxCountDown } from '../../components/wux'
var checkbox = true;

Page({
  data: {
      tel: '',
  },
  onLoad(){
    this.initValidate();
  }, showToptips(error) {
    const hideToptips = $wuxToptips.show({
      timer: 3000,
      text: error.msg || '请填写正确的字段',
      success: () => console.log('toptips', error)
    })
  },
  userNameTel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  agreement:()=>{
      wx.navigateTo({
        url: '../agreement/agreement',
      })
  },
  submitForm(e) {
    const form = e.detail.value
    console.log(form)
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      this.showToptips(error)
      return false
    }
    if (!checkbox){
      var error = {}
      error.msg = "请阅读并同意《芝麻背调服务协议》"
      this.showToptips(error)
      return
    }
    var param = new Object();
    param.mobile = form.tel
    param.smsVeriCode = form.code
    param.loginPass = form.password
    if (form.inviteCode != null && form.inviteCode!= ''){
      param.inviteCode = form.inviteCode
    }
    //注册
    network.request("passport/register", param, function (res) {
        //注册成功后登陆
        var loginParam = new Object();
        loginParam.acctNo = form.tel
        loginParam.smsVeriCode = form.password
        loginParam.loginType = "F"
        network.requestLoading("passport/login", param, "",function (res) {
          wx.setStorage({
            key: "token",
            data: res.token
          })
          wx.switchTab({
            url: '../find/find',
            success: () => {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
          }, function () {

          })
    }, function () {

    })
  },
  vcode() {
    var error = {};
    var that = this;
    if (this.data.tel==''){
      error.msg = '请输入手机号码'
      this.showToptips(error)
      return
    } else if (this.data.tel.length < 11){
      error.msg = '请输入正确的手机号'
      this.showToptips(error)
      return
    }
    var param = new Object();
    param.mobile = this.data.tel
    //校验手机号码
    network.request("passport/check_mobile", param, function (res) {
      //发送短信
      console.log("发送短信")
      network.requestLoading("passport/send_verify_code", param, "加载中", function (res) {
        if (that.c2 && that.c2.interval) return !1
        that.c2 = new $wuxCountDown({
          date: +(new Date) + 60000,
          onEnd() {
            this.setData({
              c2: '重新获取验证码',
            })
          },
          render(date) {
            const sec = this.leadingZeros(date.sec, 2) + ' 秒 '
            date.sec !== 0 && that.setData({
              c2: sec,
            })
          },
        })
      }, function () {
        error.msg = '获取验证码失败'
        that.showToptips(error)
      })
    }, function () {
      error.msg = '手机号码已注册'
      that.showToptips(error)
    })
  },
  initValidate() {
    //字段校验
    this.WxValidate = new WxValidate({
      tel: {
        required: true,
        tel: true,
      },
      password: {
        required: true,
        password: true,
      },
      code: {
        required: true,
        code: true,
      },
      inviteCode : {
        inviteCode: true,
      }
    }, {
        tel: {
          required: '请输入手机号',
          tel: '请输入正确的手机号',
        },password:{
          required: '请输入登录密码',
        },
        code: {
          required: '请输入验证码',
        },
        inviteCode: {
          
        },
      })
    this.WxValidate.addMethod('code', (value, param) => {
      return this.WxValidate.optional(value) || value.length == 6
    }, '请输入6位数的验证码')
    this.WxValidate.addMethod('inviteCode', (value, param) => {
      return this.WxValidate.optional(value) || value.length == 5
    }, '请输入5位数的邀请码')
    this.WxValidate.addMethod('password', (value, param) => {1
      return this.WxValidate.optional(value) || value.length >= 6
    }, '请输入大于6位数以上的密码')
  },
  checkboxChange: (e)=>{
    if (e.detail.value[0] == "true"){
       checkbox = true
    }else{
      checkbox = false
    }
  },
})
